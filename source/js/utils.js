export const ColorPalette = {
  PRIMARY: [263, 66, 70],
  SLIDE_1: [262, 31, 35],
  SLIDE_2: [236, 61, 43],
  SLIDE_3: [214, 49, 54],
  SLIDE_4: [252, 22, 21],
};

export const Category = {
  PRIMARY: `PRIMARY`,
  SECONDARY: `SECONDARY`,
};

export const Easing = {
  EASE_LINEAR(x) {
    return x;
  },
  EASE_IN_SINE(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  },
  EASE_OUT_SINE(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  EASE_IN_OUT_SINE(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  },
  EASE_IN_QUAD(x) {
    return x * x;
  },
  EASE_OUT_QUAD(x) {
    return 1 - (1 - x) * (1 - x);
  },
  EASE_IN_OUT_QUAD(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  EASE_IN_CUBIC(x) {
    return x * x * x;
  },
  EASE_OUT_CUBIC(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  EASE_IN_OUT_CUBIC(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },
  EASE_IN_QUART(x) {
    return x * x * x * x;
  },
  EASE_OUT_QUART(x) {
    return 1 - Math.pow(1 - x, 4);
  },
  EASE_IN_OUT_QUART(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  },
  EASE_IN_QUINT(x) {
    return x * x * x * x * x;
  },
  EASE_OUT_QUINT(x) {
    return 1 - Math.pow(1 - x, 5);
  },
  EASE_IN_OUT_QUINT(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  },
  EASE_IN_EXPO(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  },
  EASE_OUT_EXPO(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  EASE_IN_CIRC(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  },
  EASE_OUT_CIRC(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  EASE_IN_OUT_CIRC(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  },
  EASE_IN_BACK(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * x * x * x - c1 * x * x;
  },
  EASE_OUT_BACK(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },
  EASE_IN_ELASTIC(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    }

    return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  },
  EASE_OUT_ELASTIC(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    }

    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  },
  EASE_IN_OUT_ELASTIC(x) {
    const c5 = (2 * Math.PI) / 4.5;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else if (x < 0.5) {
      return -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2;
    }
    return (
      (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1
    );
  },
  EASE_OUT_BOUNCE(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  },
  EASE_IN_BOUNCE(x) {
    // eslint-disable-next-line new-cap
    return 1 - this.EASE_OUT_BOUNCE(1 - x);
  },
  EASE_IN_OUT_BOUNCE(x) {
    return x < 0.5
      ? // eslint-disable-next-line new-cap
        (1 - this.EASE_OUT_BOUNCE(1 - 2 * x)) / 2
      : // eslint-disable-next-line new-cap
        (1 + this.EASE_OUT_BOUNCE(2 * x - 1)) / 2;
  },
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomNumber = (threshold) =>
  Math.floor(Math.random() * threshold + 1);

const calcTimeOffsetByCategory = (category, delay, offset) => {
  switch (category) {
    case Category.PRIMARY:
      return getRandomNumber(10) * delay;

    case Category.SECONDARY:
      return (offset += delay);

    default:
      throw new Error(`Unknown category: ${category}`);
  }
};

export const setActiveColor = (colorName, hue, saturation, lightness) => {
  const rootElement = document.documentElement;

  rootElement.style.setProperty(
    `--${colorName}`,
    `hsl(${hue}, ${saturation}%, ${lightness}%)`
  );
  rootElement.style.setProperty(`--${colorName}-h`, hue);
  rootElement.style.setProperty(`--${colorName}-s`, `${saturation}%`);
  rootElement.style.setProperty(`--${colorName}-l`, `${lightness}%`);
};

export const pad = (value) => (`0` + Math.floor(value)).slice(-2);

export const getPercentage = (partialValue, totalValue) =>
  (100 * partialValue) / totalValue;
export const getPx = (partialValue, totalValue) =>
  totalValue * (partialValue / 100);

export class Animation {
  constructor(options) {
    this.options = options;

    if (!this.options.easing) {
      this.options.easing = Easing.EASE_LINEAR;
    }

    if (!this.options.duration) {
      this.options.duration = 1000;
    }

    if (!this.options.delay) {
      this.options.delay = 0;
    }

    if (!this.options.fps) {
      this.options.fps = 60;
    }

    this.timeoutId = null;
    this.requestId = null;
  }

  start(options) {
    this.stop();

    this.timeoutId = setTimeout(() => {
      this.startTime = performance.now();
      this.interval = 1000 / this.options.fps;
      this.lastFrameTime = this.startTime;
      this.isFinished = false;

      let animateFrame;

      if (this.options.duration === `infinite`) {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            this.options.func(1, {
              startTime: this.startTime,
              currentTime,
              isFinished: false,
              options,
            });

            this.lastFrameTime = currentTime - (delta % this.interval);
          }
        };
      } else {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            let timeFraction =
              (currentTime - this.startTime) / this.options.duration;

            if (timeFraction > 1) {
              timeFraction = 1;
              this.isFinished = true;
            }

            if (timeFraction <= 1) {
              const progress = this.options.easing(timeFraction);

              this.options.func(progress, {
                startTime: this.startTime,
                currentTime,
                isFinished: this.isFinished,
                options,
              });

              this.lastFrameTime = currentTime - (delta % this.interval);
            }

            if (this.isFinished) {
              this.stop();

              if (typeof this.options.callback === `function`) {
                this.options.callback();
              }
            }
          }
        };
      }

      this.requestId = requestAnimationFrame(animateFrame);
    }, this.options.delay);
  }

  restart() {
    this.start();
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}

export class Scene2D {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.size = 100;
    this.images = {};
    this.objects = {};
    this.objectsSettings = options.objects;
    this.locals = {};
    this.isLoaded = false;
    this.isWaitingForImages = false;
    this.isStarted = false;
    this.animations = [];
    this.afterInit = () => {};

    this.initObjects();

    this.initEventListeners();
    this.updateSize();
    this.loadImages(options.imagesUrls);
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initObjects() {
    for (const name in this.objectsSettings) {
      if (Object.prototype.hasOwnProperty.call(this.objectsSettings, name)) {
        const o = this.objectsSettings[name];

        this.objects[name] = {};
        this.objects[name].imageId = o.imageId;
        this.objects[name].before = o.before;
        this.objects[name].after = o.after;
        this.objects[name].x = o.x;
        this.objects[name].y = o.y;
        this.objects[name].size = o.size;
        this.objects[name].opacity = o.opacity;

        this.objects[name].transforms = {};
        this.objects[name].transforms.rotate = o.transforms.rotate;
        this.objects[name].transforms.translateX = o.transforms.translateX;
        this.objects[name].transforms.translateY = o.transforms.translateY;
        this.objects[name].transforms.scaleX = o.transforms.scaleX;
        this.objects[name].transforms.scaleY = o.transforms.scaleY;
      }
    }

    if (this.afterInit && typeof this.afterInit === `function`) {
      this.afterInit();
    }
  }

  initLocals() {}

  initAnimations() {}

  loadImages(imagesUrls) {
    let loadingCounter = 0;

    for (const name in imagesUrls) {
      if (Object.prototype.hasOwnProperty.call(imagesUrls, name)) {
        const image = new Image();

        image.addEventListener(`load`, () => {
          loadingCounter++;

          if (loadingCounter === Object.keys(imagesUrls).length) {
            this.isLoaded = true;

            if (this.isWaitingForImages) {
              this.start();
            } else {
              this.drawScene();
            }
          }
        });

        this.images[name] = image;

        image.src = imagesUrls[name];
      }
    }
  }

  start() {
    if (!this.isLoaded) {
      this.isWaitingForImages = true;

      return;
    }

    if (this.isStarted) {
      this.stop();
      this.initObjects();
    }

    if (this.animations.length === 0) {
      this.initAnimations();
    }

    this.animations.forEach((animation) => {
      animation.start();
    });

    this.isStarted = true;
  }

  stop() {
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }

  drawImage(image, object) {
    let x = object.x;
    let y = object.y;
    let size = object.size;
    let opacity = object.opacity;
    let transforms = object.transforms;

    if (opacity === 0) {
      return;
    }

    if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }

    let width = this.size * (size / 100);
    let height = (this.size * (size / 100) * image.height) / image.width;

    x = this.size * (x / 100) - width / 2;
    y = this.size * (y / 100) - height / 2;

    const isContextTransforming =
      opacity ||
      (transforms &&
        (transforms.rotate || transforms.scaleX || transforms.scaleY));

    if (isContextTransforming) {
      this.ctx.save();
    }

    if (transforms) {
      if (transforms.translateX) {
        x += this.size * (transforms.translateX / 100);
      }

      if (transforms.translateY) {
        y += this.size * (transforms.translateY / 100);
      }

      if (transforms.rotate) {
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate((transforms.rotate * Math.PI) / 180);
      }

      if (transforms.scaleX) {
        width *= transforms.scaleX;

        if (transforms.scaleX < 0) {
          this.ctx.scale(-1, 1);

          x = -x;
        }
      }

      if (transforms.scaleY) {
        height *= transforms.scaleY;

        if (transforms.scaleY < 0) {
          this.ctx.scale(1, -1);

          y = -y;
        }
      }

      if (transforms.rotate) {
        this.ctx.translate(-x - width / 2, -y - height / 2);
      }
    }

    if (opacity) {
      this.ctx.globalAlpha = opacity;
    }

    this.ctx.drawImage(image, x, y, width, height);

    if (isContextTransforming) {
      this.ctx.restore();
    }
  }

  clearScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScene() {
    this.clearScene();

    for (const name in this.objects) {
      if (Object.prototype.hasOwnProperty.call(this.objects, name)) {
        const object = this.objects[name];

        if (object.before && typeof object.before === `function`) {
          object.before();
        }

        this.drawImage(this.images[object.imageId], object);

        if (object.after && typeof object.after === `function`) {
          object.after();
        }
      }
    }
  }

  updateSize() {
    this.size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.height = this.size;
    this.canvas.width = this.size;
  }
}

export class AccentTypographyBuild {
  constructor(props) {
    const {
      elementSelector,
      timer,
      classForActivate,
      propertiesList,
      category = Category.PRIMARY,
      delay = 20,
    } = props;

    this._DELAY = delay;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._propertiesList = propertiesList;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;
    this._category = category;

    this.prePareText();
  }

  createElement(text) {
    const span = document.createElement(`span`);
    span.classList.add(`letter`, `word-wrapper__item`);
    span.textContent = text;
    span.style.transition = `all ${this._timer}ms ease ${this._timeOffset}ms`;
    span.style.transitionProperty = `${this._propertiesList.join()}`;
    this._timeOffset = calcTimeOffsetByCategory(
      this._category,
      this._DELAY,
      this._timeOffset
    );
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createElement(letter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`word-wrapper`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

export class Countdown {
  constructor() {
    this.TIME_SCALE = 60;
    this._SECOND = 1000;
    this._FPS = 60;
    this.fpsInterval = this._SECOND / this._FPS;
    this.duration = 0;
    this.elapsed = 0;
    this.isActive = false;
    this.lastFrameTime = Date.now();
    this.tick = () => {
      const currentFrameTime = Date.now();
      const deltaTime = currentFrameTime - this.lastFrameTime;
      this.lastFrameTime = currentFrameTime;

      if (this.isActive) {
        this.elapsed += deltaTime;

        if (deltaTime > this.fpsInterval) {
          this.onTick(this.getTimeLeft());
        }

        if (this.getTimeLeft() <= 0) {
          this.pause();
          this.onCompleted();
        }
      }

      window.requestAnimationFrame(this.tick);
    };

    this.onTick = () => {};
    this.onCompleted = () => {};

    this.tick();
  }

  getTimeLeft() {
    const t = this.duration - this.elapsed;

    return Math.max(0, t);
  }

  pause() {
    this.isActive = false;

    return this;
  }

  reset() {
    this.elapsed = 0;
  }

  start() {
    this.isActive = true;

    return this;
  }

  setDuration(minutes) {
    this.lastFrameTime = Date.now();
    this.duration = minutes * this.TIME_SCALE * this._SECOND + this._SECOND;

    return this;
  }

  format(milliseconds) {
    const seconds = Math.floor((milliseconds / this._SECOND) % this.TIME_SCALE);
    const minutes = Math.floor(milliseconds / this._SECOND / this.TIME_SCALE);

    return { seconds, minutes };
  }
}
