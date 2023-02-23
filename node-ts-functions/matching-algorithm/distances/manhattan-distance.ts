import type { Vector } from '../types/vector';
import { difference } from '../utils/difference';
import { sum } from '../utils/sum';
import { mapOverVectors } from '../utils/vector-map';

/**
 * Compute the manhattan distance of two vectors in D dimensions.
 *
 * The vectors could be considered to be in cartesian coorindates,
 * but that doesn't really matter, since they are treated as just
 * a D dimensional vectors and matched point to point.
 *
 * See https://en.wikipedia.org/wiki/Taxicab_geometry for reference.
 *
 * @param vectors Two vectors in D dimensions
 * @returns manhattan distance of vectors
 */
export const computeManhattanDistance = <D extends number>(
  vectors: Vector<Vector<number, D>, 2>
) => {
  if (vectors.length !== 2) {
    throw Error('Need two vectors for manhattan distance calculation');
  }
  if (vectors[0].length !== vectors[1].length) {
    throw Error('Vectors are of different length for manhattan distance');
  }
  const differences = mapOverVectors<number, D, 2>(vectors, (crossSection) =>
    Math.abs(difference(crossSection))
  );
  const sumOfDifferences = sum(differences);
  return sumOfDifferences;
};
