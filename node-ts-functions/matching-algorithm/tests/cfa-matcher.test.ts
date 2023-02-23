import { doCfaMatch, maxCfaDistance } from '../matchers/cfa-matcher';
import {
  createMockFactorPoints,
  creteMockSecondAnsererFactorPoints as creteMockSecondAnswererFactorPoints
} from './mock-data/answerer-mocks';

describe('null hypothesis', () => {
  test('match with empty answer arrays', () => {
    const firstAnswerer = createMockFactorPoints({});
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {});
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1);
    expect(match.distance).toBe(0);
  });
});

describe('match with simple factor points exactly', () => {
  test('length one answers', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 1
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 1
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1);
    expect(match.distance).toBe(0);
  });
  test('length two answers', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 1
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 1
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1);
    expect(match.distance).toBe(0);
  });
});

describe('match with simple factor points almost', () => {
  test('length one answers', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 1
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 0
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.distance).toBe(1);
    expect(match.percentage).toBe(1 - 1 / maxCfaDistance);
  });
  test('length two answers, other at (0,0), other at (1,1))', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 0,
      'Liberaalivihreä-Kansalliskonservatiivi': 0
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 1
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1 - Math.sqrt(2) / maxCfaDistance);
    expect(match.distance).toBe(Math.sqrt(2));
  });
  test('length two answers, other at (-0.5,-0.5), other at (0.25,0.25))', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': -0.5,
      'Liberaalivihreä-Kansalliskonservatiivi': -0.5
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 0.25,
      'Liberaalivihreä-Kansalliskonservatiivi': 0.25
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBeCloseTo(1 - 1.06066 / maxCfaDistance);
    expect(match.distance).toBeCloseTo(1.06066);
  });
});

describe('missing values', () => {
  test('second missing value', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 0.25
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 0
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.distance).toBe(1 + maxCfaDistance);
    expect(match.percentage).toBe(1 - (1 + maxCfaDistance) / maxCfaDistance);
  });
  test('first one missing value', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 0
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 0.25
    });
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1 - 1 / maxCfaDistance);
    expect(match.distance).toBe(1);
  });
  test('second one missing all values', () => {
    const firstAnswerer = createMockFactorPoints({
      'Vasemmisto-Oikeisto': 1,
      'Liberaalivihreä-Kansalliskonservatiivi': 1
    });
    const secondAnswerer = creteMockSecondAnswererFactorPoints('answerer', {});
    const match = doCfaMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBeCloseTo(
      1 - (2 * maxCfaDistance) / maxCfaDistance
    );
    expect(match.distance).toBeCloseTo(2 * maxCfaDistance);
  });
});
