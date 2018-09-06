import Vector2 from "./vector2";

export interface Particle {
  position: Vector2;
  update: (bounds: Vector2) => void;
  render: (context: CanvasRenderingContext2D) => void;
}

export interface ParticleFactory {
  make: () => Particle;
  frequency: number;
}
