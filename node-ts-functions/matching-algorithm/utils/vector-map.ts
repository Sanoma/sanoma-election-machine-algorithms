import type { Vector } from '../types/vector';
import { createVector } from '../types/vector';

/**
 * Picks a cross section of L vectors in D dimensions from based on given index.
 * Useful for picking elements across the vectors to run operations, such as
 * distance calculations on individual points.
 *
 * @param vectors L vectors in D dimensions
 * @param index which element from each vectors to add to the cross section
 * @returns the cross section of vectors with element index in them
 */
const pickFromVectors = <T, D extends number, L extends number>(
  vectors: Vector<Vector<T, D>, L>,
  index: number
) => {
  return vectors.map((vector) => vector[index]);
};

/**
 * Helper function to map functions over a vectors - useful when running
 * for example distance calculations that deal with corresponding coorindates
 * across the vectors.
 *
 * @param vectors L vectors in D dimenstions
 * @param callback a function to be run over the cross section of corresponding elements in vectors
 * @returns vector in D dimenstions with the corresponfing elements mapped over cross sections
 */
export const mapOverVectors = <T, D extends number, L extends number>(
  vectors: Vector<Vector<T, D>, L>,
  callback: (crossSection: Vector<T, L>) => T
): Vector<T, D> => {
  if (!vectors.length) {
    return createVector<T, D>();
  }
  return vectors[0].map((_, index) => {
    const currentCrossSection = pickFromVectors(vectors, index);
    return callback(currentCrossSection);
  });
};
