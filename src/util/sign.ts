let polyfill = (n: number): number => {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
};

export default abstract class Sign {
  public static of = Math.sign || polyfill;
  public static random = (): number => {
    return Math.round(Math.random()) === 1 ? 1 : -1;
  };
}
