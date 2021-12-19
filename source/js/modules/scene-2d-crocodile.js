import {gsap} from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default () => {
  const scene = document.querySelector(`.scene.scene--crocodile`);

  const handleResize = () => {
    const size = Math.min(window.innerWidth, window.innerHeight);

    scene.style.width = `${size}px`;
    scene.style.height = `${size}px`;
  };

  window.addEventListener(`resize`, handleResize);

  handleResize();

  const images = Array.from(
      document.querySelectorAll(`.scene.scene--crocodile .scene__image`)
  );

  const keyHole = images.filter((image) =>
    image.classList.contains(`scene__image--key`)
  );

  const crocodile = images.filter((image) =>
    image.classList.contains(`scene__image--crocodile`)
  );

  const drop = images.filter((image) =>
    image.classList.contains(`scene__image--drop`)
  );

  const flamingo = images.filter((image) =>
    image.classList.contains(`scene__image--flamingo`)
  );

  const leaf = images.filter((image) =>
    image.classList.contains(`scene__image--leaf`)
  );

  const saturn = images.filter((image) =>
    image.classList.contains(`scene__image--saturn`)
  );

  const snowflake = images.filter((image) =>
    image.classList.contains(`scene__image--snowflake`)
  );

  const watermelon = images.filter((image) =>
    image.classList.contains(`scene__image--watermelon`)
  );

  const keyHoleAnimation = () => {
    const timeline = gsap.timeline({
      defaults: {scale: 1, autoAlpha: 1, duration: 0.35},
    });

    timeline.to(keyHole, {});

    return timeline;
  };

  const satellitesAnimation = () => {
    const State = {
      FROM: {
        duration: 1,
        ease: `expo.out`,
      },
      TO: {
        scale: 1,
        autoAlpha: 1,
      },
    };

    const getMotionPathSettings = (
        id,
        options = {start: 0, end: 1, autoRotate: true}
    ) => ({
      motionPath: {
        path: `#${id}-path`,
        align: `#${id}-path`,
        start: options.start,
        end: options.end,
        autoRotate: options.autoRotate,
        alignOrigin: [0.5, 0.5],
      },
    });

    const timeline = gsap.timeline({
      defaults: State.FROM,
    });

    timeline
      .to(
          flamingo,
          {
            ...State.TO,
            ...getMotionPathSettings(`flamingo`, {autoRotate: false}),
          },
          `<`
      )
      .to(
          snowflake,
          {...State.TO, ...getMotionPathSettings(`snowflake`)},
          `<`
      )
      .to(
          saturn,
          {
            ...State.TO,
            rotate: 5,
            ...getMotionPathSettings(`saturn`, {autoRotate: false}),
          },
          `<`
      )
      .to(
          leaf,
          {
            ...State.TO,
            rotate: 5,
            ...getMotionPathSettings(`leaf`, {autoRotate: false}),
          },
          `<`
      )
      .to(
          watermelon,
          {...State.TO, ...getMotionPathSettings(`watermelon`)},
          `<`
      )
      .to(
          [flamingo, snowflake, saturn, leaf, watermelon],
          {yPercent: 200, ease: `power4.in`, duration: 1},
          `<0.35`
      )
      .fromTo(crocodile, {}, {...State.TO});

    return timeline;
  };

  const crocodileAnimation = () => {
    const timeline = gsap.timeline();

    timeline
      .to(crocodile, {scale: 1, autoAlpha: 1, duration: 0})
      .fromTo(
          crocodile,
          {xPercent: 90},
          {xPercent: 25, duration: 0.5, ease: `power1.inOut`}
      );

    return timeline;
  };

  const dropAnimation = () => {
    const timeline = gsap.timeline({
      repeat: -1,
    });

    timeline.timeScale(1.25);

    timeline
      .fromTo(
          drop,
          {
            xPercent: 25,
            yPercent: -35,
          },
          {
            transformOrigin: `top center`,
            xPercent: 25,
            yPercent: -55,
            autoAlpha: 1,
            scale: 0.5,
            duration: 0.5,
          }
      )
      .to(drop, {scale: 1, yPercent: -45, duration: 0.5})
      .to(drop, {yPercent: 45, duration: 0.75}, `<0.5`)
      .to(
          drop,
          {scale: 0, autoAlpha: 0, yPercent: 75, duration: 1},
          `-=0.35`
      );

    return timeline;
  };

  gsap.set(images, {
    autoAlpha: 0,
    transformOrigin: `50% 50%`,
    scale: 0,
  });

  const timeline = gsap.timeline();

  timeline.pause();

  timeline
    .add(keyHoleAnimation)
    .add(satellitesAnimation, `<`)
    .add(crocodileAnimation, `<0.75`)
    .add(dropAnimation, `<0.35`);

  return timeline;
};
