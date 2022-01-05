import {AccentTypographyBuild, getRandomNumber} from "../utils";

export default () => {
  const animationPrizesTitle = new AccentTypographyBuild({
    elementSelector: `.prizes__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  setTimeout(() => {
    animationPrizesTitle.runAnimation();
  }, 100);

  const animateItems = (coll) => {
    coll.forEach((value, idx) => {
      const svg = value.querySelector(`svg`);
      const clone = svg.cloneNode(true);
      svg.remove();
      value.prepend(clone);

      if (idx === 0) {
        clone.querySelector(`#entryPoint`).beginElement();
      }
    });
  };

  document.addEventListener(`screenChanged`, ({detail: {screenName}}) => {
    if (screenName === `prizes`) {
      animateItems(document.querySelectorAll(`.js-prizes-icon`));

      const NOW = Date.now();
      const FPS = 12;
      const SECOND = 1000;
      const FPS_INTERVAL = SECOND / FPS;
      const THRESHOLD = 7;
      const DELAY1 = 6500;
      const DELAY2 = 10500;

      const sequenceMapping = {
        // eslint-disable-next-line no-unused-vars
        cases: (finiteValue) =>
          Array.from({length: Number(THRESHOLD)}, (x, i) => i + 1),
        codes: (finiteValue) =>
          Array.from({length: Number(THRESHOLD)}, (_) =>
            getRandomNumber(finiteValue)
          )
            .slice(1, -1)
            .sort()
            .map((item, index, array) => {
              if (index === 0) {
                return [11, item];
              } else if (index === array.length - 1) {
                return [item, finiteValue];
              }

              return item;
            })
            .flat(),
      };

      const values = Array.from(
          document.querySelectorAll(`.js-prizes-desc > *:first-child`)
      )
        .slice(1)
        // eslint-disable-next-line consistent-return
        .map((item) => {
          const parent = item.closest(`.js-prizes-item`);

          if (parent) {
            const [, modifier] = Object.values(parent.classList)
              .filter((cls) => cls.includes(`--`))
              .map((value) => value.split(`--`))
              .flat();

            const sequence = sequenceMapping[modifier](
                Number(item.textContent.trim())
            );

            return {label: item, labelSequence: sequence};
          }
        });

      values.forEach((value, index) => {
        const {label, labelSequence} = value;
        const delay = index === 0 ? DELAY1 : DELAY2;

        let counter = 0;

        const outerTimer = setTimeout(() => {
          const innerTimer = setInterval(() => {
            counter += 1;
            if (counter === THRESHOLD) {
              clearInterval(innerTimer);
            }
          }, FPS_INTERVAL);

          if (NOW >= delay) {
            clearTimeout(outerTimer);
          }
        }, delay);

        const draw = (val, el) => {
          if (labelSequence[counter]) {
            el.textContent = labelSequence[counter];
          }

          if (counter < THRESHOLD) {
            requestAnimationFrame(() => draw(val, el));
          }
        };
        requestAnimationFrame(() => draw(labelSequence[counter], label));
      });
    }
  });
};
