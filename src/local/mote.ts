import { Particle } from "../core/particle";
import Vector2 from "../core/vector2";
import Sign from "../util/sign";

export class Mote implements Particle {
  public position: Vector2;
  public direction: Vector2;

  constructor(position: Vector2 = new Vector2()) {
    this.position = position;
    this.direction = new Vector2(Sign.random(), Sign.random());
  }

  update = (bounds: Vector2) => {
    if (this.position.x < 0) this.direction.x = 1;
    if (this.position.y < 0) this.direction.y = 1;
    if (this.position.x > bounds.x) this.direction.x = -1;
    if (this.position.y > bounds.y) this.direction.y = -1;

    this.position.x += this.direction.x * 2;
    this.position.y += this.direction.y * 2;
  };

  render = (context: CanvasRenderingContext2D) => {
    context.save();
    context.fillStyle = "#FFFFFF";
    context.globalAlpha = 1;
    context.beginPath();
    context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.restore();
  };
}
