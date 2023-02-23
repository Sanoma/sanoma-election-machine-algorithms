import { computeManhattanDistance } from '../distances/manhattan-distance';
import { createVector } from '../types/vector';

describe('null hypothesis', () => {
  test('test with empty vectors', () => {
    const emptyVector = createVector(...[]);
    const zeroDistance = computeManhattanDistance(
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
      computeManhattanDistance(createVector(oneLengthVector, twoLengthVector));
    }).toThrow();
  });

  test('wrong amounts of vectors', () => {
    const oneLengthVector = createVector(1);
    expect(() => {
      computeManhattanDistance(
        createVector(oneLengthVector, oneLengthVector, oneLengthVector)
      );
    }).toThrow();
    expect(() => {
      computeManhattanDistance(createVector(oneLengthVector));
    }).toThrow();
  });
});

describe('small vectors', () => {
  test('zero distance on same vectors', () => {
    const simpleVector = createVector(1, 1, 1);
    const distance = computeManhattanDistance(
      createVector(simpleVector, simpleVector)
    );
    expect(distance).toBe(0);
  });
  test('distance of one on length one vectors', () => {
    const simpleVectorOne = createVector(1);
    const simpleVectorTwo = createVector(2);
    const distance = computeManhattanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(1);
  });
  test('distance of one on length one three vectors with one difference', () => {
    const simpleVectorOne = createVector(1, 2, 3);
    const simpleVectorTwo = createVector(1, 2, 4);
    const distance = computeManhattanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(1);
  });
  test('negative values', () => {
    const simpleVectorOne = createVector(-1, -1, -1);
    const simpleVectorTwo = createVector(1, 1, 1);
    const distance = computeManhattanDistance(
      createVector(simpleVectorOne, simpleVectorTwo)
    );
    expect(distance).toBe(6);
  });
});

const LARGE_NUMBER = 10000;

describe('large vectors', () => {
  test('large vectors of zeros', () => {
    const largeZeroVector = createVector(...Array(LARGE_NUMBER).fill(0));
    const distance = computeManhattanDistance(
      createVector(largeZeroVector, largeZeroVector)
    );
    expect(distance).toBe(0);
  });
  test('large vectors of zeros and ones', () => {
    const largeZeroVector = createVector(...Array(LARGE_NUMBER).fill(0));
    const largeOneVector = createVector(...Array(LARGE_NUMBER).fill(1));
    const distance = computeManhattanDistance(
      createVector(largeZeroVector, largeOneVector)
    );
    expect(distance).toBe(LARGE_NUMBER);
  });
});

describe('election answer proxies', () => {
  test('30 answer same vectors', () => {
    const answerVector = createVector(
      1,
      2,
      4,
      1,
      4,
      5,
      2,
      3,
      5,
      3,
      5,
      1,
      4,
      5,
      1,
      2,
      3,
      1,
      5,
      3,
      1,
      3,
      5,
      2,
      1,
      3,
      4,
      2,
      1,
      5
    );
    const distance = computeManhattanDistance(
      createVector(answerVector, answerVector)
    );
    expect(distance).toBe(0);
  });
  test('30 different answers', () => {
    const firstAnswerVector = createVector(
      1,
      2,
      4,
      1,
      4,
      5,
      2,
      3,
      5,
      3,
      5,
      1,
      4,
      5,
      1,
      2,
      3,
      1,
      5,
      3,
      1,
      3,
      5,
      2,
      1,
      3,
      4,
      2,
      1,
      5
    );
    const secondAnswerVector = createVector(
      3,
      1,
      4,
      1,
      5,
      2,
      2,
      4,
      5,
      3,
      5,
      4,
      4,
      1,
      1,
      4,
      3,
      1,
      3,
      3,
      1,
      3,
      5,
      2,
      1,
      3,
      4,
      3,
      2,
      2
    );
    const distance = computeManhattanDistance(
      createVector(firstAnswerVector, secondAnswerVector)
    );
    expect(distance).toBe(24);
  });
});
