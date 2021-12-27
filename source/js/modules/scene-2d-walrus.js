import {gsap} from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {getMotionPathSettings} from "../utils";
import {tweenPaths} from "svg-tween";

gsap.registerPlugin(MotionPathPlugin);

export default () => {
  const scene = document.querySelector(`.scene.scene--walrus`);

  const handleResize = () => {
    const size = Math.min(window.innerWidth, window.innerHeight);

    scene.style.width = `${size}px`;
    scene.style.height = `${size}px`;
  };

  window.addEventListener(`resize`, handleResize);

  handleResize();

  const images = Array.from(
      document.querySelectorAll(`.scene.scene--walrus .scene__image`)
  );

  const airplane = images.filter((image) =>
    image.classList.contains(`scene__image--airplane`)
  );

  const trees = images.filter((image) =>
    image.classList.contains(`scene__image--tree`)
  );

  const backs = images.filter((image) =>
    image.classList.contains(`scene__image--back`)
  );

  const snowflakes = images.filter((image) =>
    image.classList.contains(`scene__image--snowflake`)
  );

  const walrus = images.filter((image) =>
    image.classList.contains(`scene__image--walrus`)
  );

  const walrusAnimation = () => {
    const timeline = gsap.timeline({
      defaults: {
        scale: 1.05,
        autoAlpha: 1,
        rotate: 15,
      },
    });

    timeline
      .fromTo(walrus, {yPercent: 200}, {yPercent: 0, duration: 0.25})
      .to(walrus, {
        rotate: 0,
        duration: 3,
        ease: `elastic.out(1.2, 0.2)`,
      });

    return timeline;
  };

  const treeAnimation = () => {
    const timeline = gsap.timeline({
      defaults: {transformOrigin: `bottom center`, yPercent: 45},
    });

    const [smallTree, bigTree] = trees;

    timeline
      .to(
          smallTree,
          {
            scale: 1.2,
            autoAlpha: 1,
            xPercent: 25,
            duration: 0,
            ease: `power2.out`,
          },
          `<`
      )
      .fromTo(
          bigTree,
          {scale: 1, autoAlpha: 1},
          {scale: 1.7, duration: 0.75, ease: `slow(0.7, 0.7, false)`},
          `<`
      );

    return timeline;
  };

  const snowflakeAnimation = () => {
    const timeline = gsap.timeline();

    const State = {
      FROM: -5,
      TO: 5,
    };

    const repeat = (
        element,
        {from, to, duration, delay} = {
          from: State.FROM,
          to: State.TO,
          duration: 1,
          delay: 0,
        }
    ) => {
      const tl = gsap.timeline();

      tl.fromTo(
          element,
          {
            yPercent: from,
          },
          {
            yPercent: to,
            duration,
            delay,
            ease: `power1.inOut`,
            immediateRender: false,
            repeat: -1,
            yoyo: true,
          }
      );

      return tl;
    };

    const [first, last] = snowflakes;

    timeline
      .add(
          gsap
          .timeline()
          .to(snowflakes, {scale: 1, autoAlpha: 1, duration: 0.5})
      )
      .add(
          gsap.timeline().to(first, {
            yPercent: State.FROM,
            duration: 0.5,
            onComplete: () =>
              repeat(first, {
                from: State.FROM,
                to: State.TO,
                duration: 2,
                delay: 0,
              }),
          })
      )
      .add(
          gsap.timeline().to(last, {
            yPercent: State.TO,
            duration: 1,
            onComplete: () =>
              repeat(last, {
                from: State.TO,
                to: State.FROM,
                duration: 2,
                delay: 0,
              }),
          }),
          `<`
      );

    return timeline;
  };

  const airplaneAnimation = () => {
    const timeline = gsap.timeline();

    timeline.to(airplane, {
      ...getMotionPathSettings(`airplane`, {autoRotate: 45}),
      scale: 1,
      autoAlpha: 1,
      duration: 0.75,
      ease: `power4.out`,
      onStart: () => {
        const [from, to] = backs.map((p) => p.getAttribute(`d`));

        const path = document.createElementNS(
            `http://www.w3.org/2000/svg`,
            `path`
        );

        path.setAttribute(`d`, from);
        path.setAttribute(`fill`, `#9EAFD8`);
        path.classList.add(`scene__image`, `scene__image--back`);

        document
          .querySelector(`.scene.scene--walrus .scene__content .scene__images`)
          .prepend(path);

        tweenPaths({
          duration: 300,
          from,
          to,
          next: (d) => path.setAttribute(`d`, d),
        });
      },
    });
  };

  gsap.set(images, {
    autoAlpha: 0,
    transformOrigin: `50% 50%`,
    scale: 0,
  });

  const timeline = gsap.timeline();

  timeline.pause();

  timeline
    .add(walrusAnimation)
    .add(airplaneAnimation, `<0.25`)
    .add(treeAnimation, `<0.25`)
    .add(snowflakeAnimation, `<`);

  return timeline;
};
