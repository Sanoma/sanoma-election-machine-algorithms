import { createVector, Vector } from '../types/vector';
import { mapOverVectors } from '../utils/vector-map';

describe('mapOverVectors edge cases', () => {
  test('mapOverVectors for empty vector', () => {
    const mappedVector = mapOverVectors(
      createVector() as Vector<Vector<number, number>, 2>,
      () => 1
    );
    expect(mappedVector.length).toBe(0);
  });
});
