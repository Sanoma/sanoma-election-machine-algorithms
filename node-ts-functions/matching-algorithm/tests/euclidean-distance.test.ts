import { computeEuclideanDistance } from '../distances/euclidean-distance';
import { createVector } from '../types/vector';

describe('null hypothesis', () => {
  test('test with empty vectors', () => {
    const emptyVector = createVector(...[]);
    const zeroDistance = computeEuclideanDistance(
      createVector(emptyVector, emptyVector)
    );
    expect(zeroDistance).toBe(0);
  });
});

describe('error states', () => {
  test('test different length vectors', () => {
    const oneLengthVector = createVector(1);
    const twoLengthVector = createVector(1, 2);
    expect(() => {
      computeEuclideanDistance(createVector(oneLengthVector, twoLengthVector));
    }).toThrow();
  });

  test('wrong amounts of vectors', () => {
    const oneLengthVector = createVector(1);
    expect(() => {
      computeEuclideanDistance(
        createVector(oneLengthVector, oneLengthVector, oneLengthVector)
      );
    }).toThrow();
    expect(() => {
      computeEuclideanDistance(createVector(oneLengthVector));
    }).toThrow();
  });
});

describe('small vectors', () => {
  test('zero distance on same vectors', () => {
    const simpleVector = createVector(1, 1, 1);
    const distance = computeEuclideanDistance(
      createVector(simpleVector, simpleVector)
    );
    expect(distance).toBe(0);
  });
  test('distance of one on length one vectors', () => {
    const simpleVectorOne = createVector(1);
    const simpleVectorTwo = createVector(2);
    const distance = computeEuclideanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(1);
  });
  test('distance of one on length two vectors', () => {
    const simpleVectorOne = createVector(1, 1);
    const simpleVectorTwo = createVector(2, 1);
    const distance = computeEuclideanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(1);
  });
  test('distance of square root 2 on (1,1) and (2,2)', () => {
    const simpleVectorOne = createVector(1, 1);
    const simpleVectorTwo = createVector(2, 2);
    const distance = computeEuclideanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(Math.sqrt(2));
  });
  test('negative values', () => {
    const simpleVectorOne = createVector(-1, -1, -1);
    const simpleVectorTwo = createVector(1, 1, 1);
    const distance = computeEuclideanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(Math.sqrt(12));
  });
});

describe('bunch of tests', () => {
  test('(2,-1) and (-2,2)', () => {
    const vectorOne = createVector(2, -1);
    const vectorTwo = createVector(-2, 2);
    const distance = computeEuclideanDistance(
      createVector(vectorOne, vectorTwo)
    );
    expect(distance).toBe(5);
  });
  test('(1,2,3,4) and (5,6,7,8)', () => {
    const vectorOne = createVector(1, 2, 3, 4);
    const vectorTwo = createVector(5, 6, 7, 8);
    const distance = computeEuclideanDistance(
      createVector(vectorOne, vectorTwo)
    );
    expect(distance).toBe(8);
  });
});
