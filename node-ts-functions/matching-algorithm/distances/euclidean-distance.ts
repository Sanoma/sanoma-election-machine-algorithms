import type { Vector } from '../types/vector';
import { squaredDifference } from '../utils/squaredDifference';
import { sum } from '../utils/sum';
import { mapOverVectors } from '../utils/vector-map';

/**
 * Compute the euclidean distance of two vectors in D dimensions.
 *
 * The vectors are considered to be cartesian coorindates.
 *
 * See https://en.wikipedia.org/wiki/Euclidean_distance for reference
 *
 * @param vectors Two vectors in D dimenstions
 * @returns euclidean distance between the vectors
 */
export const computeEuclideanDistance = <D extends number>(
  vectors: Vector<Vector<number, D>, 2>
) => {
  if (vectors.length !== 2) {
    throw Error('Need two vectors for euclidean distance calculation');
  }
  if (vectors[0].length !== vectors[1].length) {
    throw Error('Vectors are of different length for euclidean distance');
  }
  const differences = mapOverVectors<number, D, 2>(vectors, (crossSection) =>
    Math.abs(squaredDifference(crossSection))
  );
  const sumOfDifferences = sum(differences);
  const squareRootOfSumOfDifferences = Math.sqrt(sumOfDifferences);
  return squareRootOfSumOfDifferences;
};
