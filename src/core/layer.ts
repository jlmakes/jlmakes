import { Particle, ParticleFactory } from "./particle";
import Vector2 from "./vector2";

export interface LayerOptions {
  height: number;
  width: number;
  density: number;
  factories: Array<ParticleFactory>;
}

export class Layer {
  public readonly particles: Array<Particle> = [];
  public readonly context: CanvasRenderingContext2D;
  public readonly node: HTMLCanvasElement;

  constructor(options: LayerOptions) {
    if (!options.factories.length) {
      throw Error("No particle factories provided.");
    }
    this.node = document.createElement("canvas");
    this.context = this.node.getContext("2d");
    this.node.style.position = "absolute";
    this.node.width = options.width;
    this.node.height = options.height;

    let i: number = 0;
    while (this.particles.length < options.density) {
      let factory = options.factories[i % options.factories.length];
      if (factory.frequency > Math.random()) {
        let particle = factory.make();
        this.particles.push(particle);
      }
      i++;
    }
  }

  public update(): void {
    let bounds = new Vector2(this.node.width, this.node.height);
    this.particles.forEach(p => p.update(bounds));
  }

  public render(): void {
    this.context.fillStyle = "#000000";
    this.context.globalAlpha = 0.05;
    this.context.fillRect(0, 0, this.node.width, this.node.height);
    this.particles.forEach(p => p.render(this.context));
  }
}
