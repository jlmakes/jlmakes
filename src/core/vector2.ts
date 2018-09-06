export default class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public static add(vector: Vector2, ...vectors: Vector2[]): Vector2 {
    let x: number = vector.x;
    let y: number = vector.y;
    vectors.forEach(vector => {
      x += vector.x;
      y += vector.y;
    });
    return new Vector2(x, y);
  }

  public static subtract(vector: Vector2, ...vectors: Vector2[]): Vector2 {
    let x: number = vector.x;
    let y: number = vector.y;
    vectors.forEach(vector => {
      x -= vector.x;
      y -= vector.y;
    });
    return new Vector2(x, y);
  }

  public static rotate(vector: Vector2, angle: number = 0): Vector2 {
    let x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    let y = vector.y * Math.cos(angle) - vector.x * Math.sin(angle);
    return new Vector2(x, y);
  }

  public static multiply(vector: Vector2, factor: number): Vector2 {
    return new Vector2(vector.x * factor, vector.y * factor);
  }

  public static divide(vector: Vector2, divisor: number): Vector2 {
    return Vector2.multiply(vector, 1 / divisor);
  }

  public static orbit(
    vector: Vector2,
    pivot: Vector2,
    angle: number = 0
  ): Vector2 {
    let offsetVector: Vector2 = Vector2.subtract(vector, pivot);
    let rotatedVector: Vector2 = Vector2.rotate(offsetVector, angle);
    return Vector2.add(rotatedVector, pivot);
  }

  public static squareMagnitude(vector: Vector2): number {
    return Math.pow(vector.x, 2) + Math.pow(vector.y, 2);
  }

  public static magnitude(vector: Vector2): number {
    return Math.sqrt(Vector2.squareMagnitude(vector));
  }

  public static normalize(vector: Vector2): Vector2 {
    return Vector2.divide(vector, Vector2.magnitude(vector));
  }
}
