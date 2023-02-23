import { doManhattanMatch } from '../matchers/manhattan-matcher';
import {
  createAllSameAnswersFirstAnswerer,
  createAllSameAnswersSecondAnswerer,
  createMockFirstAnswerer,
  createMockSecondAnswerer
} from './mock-data/answerer-mocks';

describe('null hypothesis', () => {
  test('match with empty answer arrays', () => {
    const firstAnswerer = createMockFirstAnswerer();
    const secondAnswerer = createMockSecondAnswerer('answerer');
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(NaN);
    expect(match.distance).toBe(0);
  });
});

describe('match with simple arrays exactly', () => {
  test('length one answers', () => {
    const firstAnswerer = createMockFirstAnswerer({ questionId: 1, answer: 1 });
    const secondAnswerer = createMockSecondAnswerer('answerer', {
      answer: 1,
      questionId: 1
    });
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1);
    expect(match.distance).toBe(0);
  });
  test('length two answers', () => {
    const firstAnswerer = createMockFirstAnswerer(
      { questionId: 1, answer: 1 },
      { questionId: 2, answer: 1 }
    );
    const secondAnswerer = createMockSecondAnswerer(
      'answerer',
      { questionId: 1, answer: 1 },
      { questionId: 2, answer: 1 }
    );
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1);
    expect(match.distance).toBe(0);
  });
});

describe('match with simple arrays with differences', () => {
  test('length one answers', () => {
    const firstAnswerer = createMockFirstAnswerer({ questionId: 1, answer: 2 });
    const secondAnswerer = createMockSecondAnswerer('answerer', {
      answer: 1,
      questionId: 1
    });
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(0.75);
    expect(match.distance).toBe(1);
  });
  test('length two answers', () => {
    const firstAnswerer = createMockFirstAnswerer(
      { questionId: 1, answer: 2 },
      { questionId: 2, answer: 3 }
    );
    const secondAnswerer = createMockSecondAnswerer(
      'answerer',
      { questionId: 1, answer: 1 },
      { questionId: 2, answer: 1 }
    );
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1 - 3 / 8);
    expect(match.distance).toBe(3);
  });
});

describe('missing answers', () => {
  test('length one answers', () => {
    const firstAnswerer = createMockFirstAnswerer({ questionId: 1, answer: 2 });
    const secondAnswerer = createMockSecondAnswerer('answerer');
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(-0.25);
    expect(match.distance).toBe(5);
  });
  test('length two answers', () => {
    const firstAnswerer = createMockFirstAnswerer(
      { questionId: 1, answer: 1 },
      { questionId: 2, answer: 2 }
    );
    const secondAnswerer = createMockSecondAnswerer('answerer', {
      questionId: 1,
      answer: 1
    });
    const match = doManhattanMatch(firstAnswerer, secondAnswerer);
    expect(match.percentage).toBe(1 - 5 / 8);
    expect(match.distance).toBe(5);
  });
});

describe('election answer proxies', () => {
  test('all same answers', () => {
    const allOnesFirstAnswerer = createAllSameAnswersFirstAnswerer(1);
    const allOnesSecondAnswerer = createAllSameAnswersSecondAnswerer('id', 1);
    const match = doManhattanMatch(allOnesFirstAnswerer, allOnesSecondAnswerer);
    expect(allOnesFirstAnswerer.answers.length).toBe(30);
    expect(allOnesSecondAnswerer.answers.length).toBe(30);
    expect(match.distance).toBe(0);
    expect(match.percentage).toBe(1);
  });
  test('all one different answers', () => {
    const allOnesFirstAnswerer = createAllSameAnswersFirstAnswerer(1);
    const allTwosSecondAnswerer = createAllSameAnswersSecondAnswerer('id', 2);
    const match = doManhattanMatch(allOnesFirstAnswerer, allTwosSecondAnswerer);
    expect(allOnesFirstAnswerer.answers.length).toBe(30);
    expect(allTwosSecondAnswerer.answers.length).toBe(30);
    expect(match.distance).toBe(30);
    expect(match.percentage).toBe(0.75);
  });
  test('max difference', () => {
    const allOnesFirstAnswerer = createAllSameAnswersFirstAnswerer(1);
    const allFivesSecondAnswerer = createAllSameAnswersSecondAnswerer('id', 5);
    const match = doManhattanMatch(
      allOnesFirstAnswerer,
      allFivesSecondAnswerer
    );
    expect(allOnesFirstAnswerer.answers.length).toBe(30);
    expect(allFivesSecondAnswerer.answers.length).toBe(30);
    expect(match.distance).toBe(120);
    expect(match.percentage).toBe(0);
  });
  test('all second answers missing', () => {
    const allOnesFirstAnswerer = createAllSameAnswersFirstAnswerer(1);
    const allSecondAnswersMissing = createMockSecondAnswerer('id');
    const match = doManhattanMatch(
      allOnesFirstAnswerer,
      allSecondAnswersMissing
    );
    expect(allOnesFirstAnswerer.answers.length).toBe(30);
    expect(allSecondAnswersMissing.answers.length).toBe(0);
    expect(match.distance).toBe(150);
    expect(match.percentage).toBe(-0.25);
  });
});
