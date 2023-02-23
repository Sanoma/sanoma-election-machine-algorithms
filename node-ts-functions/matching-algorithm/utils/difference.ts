import type { Vector } from '../types/vector';

export const difference = (vector: Vector<number, number>) =>
  vector.reduce((a, b) => a - b);
