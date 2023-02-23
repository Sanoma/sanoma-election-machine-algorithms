import type { Vector } from '../types/vector';

export const squaredDifference = (vector: Vector<number, number>) =>
  vector.reduce((a, b) => Math.pow(a - b, 2));
