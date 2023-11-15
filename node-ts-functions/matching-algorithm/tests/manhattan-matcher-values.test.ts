import { doManhattanValues } from '../matchers/manhattan-matcher';
import { createAllSameAnswersFirstAnswerer } from './mock-data/answerer-mocks';
import { mockElectionConfig } from './mock-data/configuration';

describe('null hypothesis', () => {
  test('empty answers give noAnswer values', () => {
    const values = doManhattanValues([], mockElectionConfig);
    expect(values['Vasemmisto-Oikeisto']).toBe('noAnswers');
    expect(values['Arvokonservatiivi - Arvoliberaali']).toBe('noAnswers');
    expect(values['Vähemmän vihreä - Enemmän vihreä']).toBe('noAnswers');
    expect(values['Kansallismielinen - Kansainvälinen']).toBe('noAnswers');
    expect(values['Liberaalivihreä-Kansalliskonservatiivi']).toBe('noAnswers');
    expect(values['Maaseutu - Kaupunki']).toBe('noAnswers');
  });
});

describe('all same answers', () => {
  test('all middle answers', () => {
    const values = doManhattanValues(
      createAllSameAnswersFirstAnswerer(3, 1).answers,
      mockElectionConfig
    );
    expect(values['Vasemmisto-Oikeisto']).toBe(0);
    expect(values['Arvokonservatiivi - Arvoliberaali']).toBe(0);
    expect(values['Vähemmän vihreä - Enemmän vihreä']).toBe(0);
    expect(values['Kansallismielinen - Kansainvälinen']).toBe(0);
    expect(values['Liberaalivihreä-Kansalliskonservatiivi']).toBe(0);
    expect(values['Maaseutu - Kaupunki']).toBe(0);
  });
  test('all one answers', () => {
    const values = doManhattanValues(
      createAllSameAnswersFirstAnswerer(1, 1).answers,
      mockElectionConfig
    );
    expect(values['Vasemmisto-Oikeisto']).toBeCloseTo(-0.2);
    expect(values['Arvokonservatiivi - Arvoliberaali']).toBe(0);
    expect(values['Vähemmän vihreä - Enemmän vihreä']).toBe(-1);
    expect(values['Kansallismielinen - Kansainvälinen']).toBeCloseTo(0);
    expect(values['Liberaalivihreä-Kansalliskonservatiivi']).toBe(0);
    expect(values['Maaseutu - Kaupunki']).toBe(0);
  });
});

describe('all extreme answers', () => {
  test('first extreme test', () => {
    const values = doManhattanValues(
      [
        {
          questionId: 16,
          answer: 1
        },
        {
          questionId: 17,
          answer: 5
        },
        {
          questionId: 18,
          answer: 1
        },
        {
          questionId: 19,
          answer: 5
        },
        {
          questionId: 20,
          answer: 5
        },
        {
          questionId: 21,
          answer: 5
        },
        {
          questionId: 22,
          answer: 1
        },
        {
          questionId: 23,
          answer: 5
        },
        {
          questionId: 24,
          answer: 1
        },
        {
          questionId: 25,
          answer: 5
        },
        {
          questionId: 26,
          answer: 1
        },
        {
          questionId: 27,
          answer: 5
        },
        {
          questionId: 28,
          answer: 1
        },
        {
          questionId: 29,
          answer: 5
        },
        {
          questionId: 30,
          answer: 1
        }
      ],
      mockElectionConfig
    );
    expect(values['Vasemmisto-Oikeisto']).toBeCloseTo(1);
    expect(values['Arvokonservatiivi - Arvoliberaali']).toBe(1);
    expect(values['Vähemmän vihreä - Enemmän vihreä']).toBe(1);
    expect(values['Kansallismielinen - Kansainvälinen']).toBeCloseTo(1);
    expect(values['Liberaalivihreä-Kansalliskonservatiivi']).toBe(1);
    expect(values['Maaseutu - Kaupunki']).toBe(-1);
  });
  test('second extreme test', () => {
    const values = doManhattanValues(
      [
        {
          questionId: 16,
          answer: 5
        },
        {
          questionId: 17,
          answer: 1
        },
        {
          questionId: 18,
          answer: 5
        },
        {
          questionId: 19,
          answer: 1
        },
        {
          questionId: 20,
          answer: 1
        },
        {
          questionId: 21,
          answer: 1
        },
        {
          questionId: 22,
          answer: 5
        },
        {
          questionId: 23,
          answer: 1
        },
        {
          questionId: 24,
          answer: 5
        },
        {
          questionId: 25,
          answer: 1
        },
        {
          questionId: 26,
          answer: 5
        },
        {
          questionId: 27,
          answer: 1
        },
        {
          questionId: 28,
          answer: 5
        },
        {
          questionId: 29,
          answer: 1
        },
        {
          questionId: 30,
          answer: 5
        }
      ],
      mockElectionConfig
    );
    expect(values['Vasemmisto-Oikeisto']).toBeCloseTo(-1);
    expect(values['Arvokonservatiivi - Arvoliberaali']).toBe(-1);
    expect(values['Vähemmän vihreä - Enemmän vihreä']).toBe(-1);
    expect(values['Kansallismielinen - Kansainvälinen']).toBeCloseTo(-1);
    expect(values['Liberaalivihreä-Kansalliskonservatiivi']).toBe(-1);
    expect(values['Maaseutu - Kaupunki']).toBe(1);
  });
});
