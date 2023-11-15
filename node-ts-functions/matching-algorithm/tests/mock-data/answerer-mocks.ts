import { Answer, FullAnswer } from '../../types/answers';
import { FactorPoints } from '../../types/factor-points';
import { FirstAnswerer, SecondAnswerer } from '../../types/matchers';

export const createMockFirstAnswerer = (
  ...answers: Answer[]
): FirstAnswerer => {
  return {
    answers
  };
};

export const createMockSecondAnswerer = (
  id: string,
  ...answers: FullAnswer[]
): SecondAnswerer => {
  return {
    id,
    answers
  };
};

export const createAllSameAnswersFirstAnswerer = (
  value: number,
  startIndex = 0
) =>
  createMockFirstAnswerer(
    ...Array(30)
      .fill(value)
      .map((answer, index) => ({ questionId: index + startIndex, answer }))
  );

export const createAllSameAnswersSecondAnswerer = (id: string, value: number) =>
  createMockSecondAnswerer(
    id,
    ...Array(30)
      .fill(value)
      .map((answer, index) => ({ questionId: index, answer }))
  );

export const createMockFactorPoints = (points: FactorPoints) => points;

export const creteMockSecondAnsererFactorPoints = (
  id: string,
  factorPoints: FactorPoints
) => ({
  id,
  factorPoints
});
