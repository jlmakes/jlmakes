import tealight from "tealight";
import miniraf from "miniraf";

import Vector2 from "./vector2";
import { Mote } from "../local/mote";
import { Layer } from "./layer";

interface Options {
  root: string | HTMLElement;
  depth: number;
  density: number;
}

interface Config extends Options {
  root: HTMLElement;
  width: number;
  height: number;
}

export default class Constructor {
  public config: Config;
  public layers: Array<Layer> = [];

  constructor(options: Options) {
    let root: HTMLElement = tealight(options.root)[0];
    if (!root) {
      throw Error("Instantiation failed. No valid root element provided.");
    }

    this.config = Object.assign({}, options, {
      root,
      width: window.innerWidth,
      height: window.innerHeight
    });

    for (let i = 0; i < this.config.depth; i++) {
      let layer = new Layer({
        width: this.config.width,
        height: this.config.height,
        density: this.config.density / this.config.depth,
        factories: [
          {
            make: () => {
              let origin = new Vector2(
                this.config.width * Math.random(),
                this.config.height * Math.random()
              );
              return new Mote(origin);
            },
            frequency: 0.2
          }
        ]
      });
      this.layers.push(layer);
      root.appendChild(layer.node);
    }

    window.addEventListener("resize", () => {
      miniraf.call(window, () => {
        this.config.width = window.innerWidth;
        this.config.height = window.innerHeight;
        this.layers.forEach(layer => {
          layer.node.width = this.config.width;
          layer.node.height = this.config.height;
        });
      });
    });

    this.loop();
  }

  loop = () => {
    miniraf.call(window, () => {
      this.layers.forEach(layer => {
        layer.update();
        layer.render();
      });
      this.loop();
    });
  };
}
