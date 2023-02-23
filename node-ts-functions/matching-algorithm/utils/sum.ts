import type { Vector } from '../types/vector';

export const sum = (vector: Vector<number, number>) =>
  vector.reduce((a, b) => a + b, 0);
