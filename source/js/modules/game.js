import {AccentTypographyBuild, Countdown, pad} from "../utils";

export default () => {
  // Typography animation
  const animationRulesTitle = new AccentTypographyBuild({
    elementSelector: `.game__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  setTimeout(() => {
    animationRulesTitle.runAnimation();
  }, 100);

  // Setting the Timer
  const MINUTES_COUNT = 5;
  const countdown = new Countdown().setDuration(MINUTES_COUNT);

  countdown.onTick = (time) => {
    const {minutes, seconds} = countdown.format(time);

    label.firstElementChild.textContent = pad(minutes);
    label.lastElementChild.textContent = pad(seconds);
  };
  countdown.onCompleted = () => {};
  const label = document.querySelector(`.js-game-counter`);

  document.addEventListener(`screenChanged`, ({detail: {screenName}}) => {
    if (screenName === `game`) {
      countdown.start();
    } else {
      countdown.onCompleted();
      countdown.reset();
      countdown.pause();

      const {minutes, seconds} = countdown.format(
          Math.ceil(countdown.getTimeLeft())
      );
      label.firstElementChild.textContent = pad(minutes);
      label.lastElementChild.textContent = pad(seconds);
    }
  });
};
