import { Answer } from '../../types/answers';
import { Candidate } from '../../types/candidate';
import { FactorPoints } from '../../types/factor-points';
import { createAllSameAnswersSecondAnswerer } from './answerer-mocks';

export const allOnesFactorPoints: FactorPoints = {
  'Vasemmisto-Oikeisto': 1,
  'Liberaalivihreä-Kansalliskonservatiivi': 1
};

export const allHalfsFactorPoints: FactorPoints = {
  'Vasemmisto-Oikeisto': 0.5,
  'Liberaalivihreä-Kansalliskonservatiivi': 0.5
};

export const allNegativeOnesFactorPoints: FactorPoints = {
  'Vasemmisto-Oikeisto': -1,
  'Liberaalivihreä-Kansalliskonservatiivi': -1
};

export const allOnesCandidate: Candidate = {
  ...createAllSameAnswersSecondAnswerer('allOnes', 1),
  factorPoints: allOnesFactorPoints
};

export const allTwosCandidate: Candidate = {
  ...createAllSameAnswersSecondAnswerer('allTwos', 2),
  factorPoints: allHalfsFactorPoints
};

export const allThreesCandidate: Candidate = {
  ...createAllSameAnswersSecondAnswerer('allThrees', 3),
  factorPoints: allNegativeOnesFactorPoints
};

export const allFoursCandidate: Candidate = {
  ...createAllSameAnswersSecondAnswerer('allFours', 4),
  factorPoints: allNegativeOnesFactorPoints
};

export const allFivesCandidate: Candidate = {
  ...createAllSameAnswersSecondAnswerer('allFives', 5),
  factorPoints: allNegativeOnesFactorPoints
};

export const allAnswersMissingCanddiate: Candidate = {
  id: 'allAnswersMissing',
  answers: [],
  factorPoints: {}
};

export const allAnswersHalfFactorPointsMissingCanddiate: Candidate = {
  id: 'allAnswersHalfFactorPointsMissing',
  answers: [],
  factorPoints: {
    'Vasemmisto-Oikeisto': 1
  }
};

export const exampleCitizenAnswers: Answer[] = [
  { questionId: 1, answer: 5 },
  { questionId: 2, answer: 4 },
  { questionId: 3, answer: 2 },
  { questionId: 4, answer: 5 },
  { questionId: 5, answer: 4 },
  { questionId: 6, answer: 5 },
  { questionId: 7, answer: 4 },
  { questionId: 8, answer: 4 },
  { questionId: 9, answer: 5 },
  { questionId: 10, answer: 5 },
  { questionId: 11, answer: 1 },
  { questionId: 12, answer: 4 },
  { questionId: 13, answer: 2 },
  { questionId: 14, answer: 4 },
  { questionId: 15, answer: 2 },
  { questionId: 16, answer: 1 },
  { questionId: 17, answer: 5 },
  { questionId: 18, answer: 1 },
  { questionId: 19, answer: 2 },
  { questionId: 20, answer: 5 },
  { questionId: 21, answer: 3 },
  { questionId: 22, answer: 3 },
  { questionId: 23, answer: 4 },
  { questionId: 24, answer: 2 },
  { questionId: 25, answer: 4 },
  { questionId: 26, answer: 5 },
  { questionId: 27, answer: 2 },
  { questionId: 28, answer: 4 },
  { questionId: 29, answer: 1 },
  { questionId: 30, answer: 4 }
];

export const exampleCitizenFactorPoints: FactorPoints = {
  'Liberaalivihreä-Kansalliskonservatiivi': 0.20705397213767573,
  'Vasemmisto-Oikeisto': 0.6489504621599762
};

export const cfaManhattanexampleCandidates: Candidate[] = [
  {
    answers: exampleCitizenAnswers, // one candidate with exactly same answers,
    factorPoints: exampleCitizenFactorPoints,
    id: 'exactMatchCandidate'
  },
  {
    answers: exampleCitizenAnswers.map((answer) => ({
      ...answer,
      // Otherwise same answers as citizen, but first 3 are 1
      answer: answer.questionId < 4 ? 1 : answer.answer
    })),
    factorPoints: allOnesFactorPoints,
    id: 'allOneFactorPointsCandidate'
  },
  {
    answers: exampleCitizenAnswers.map((answer) => ({
      ...answer,
      // Otherwise same answers as citizen, but first is 1
      answer: answer.questionId === 1 ? 4 : answer.answer
    })),
    factorPoints: exampleCitizenFactorPoints,
    id: 'onlyDifferenceIsFirstQuestion'
  },
  allAnswersMissingCanddiate,
  allAnswersHalfFactorPointsMissingCanddiate,
  allFivesCandidate
];

export const manhattanexampleCandidates: Candidate[] = [
  {
    answers: exampleCitizenAnswers, // one candidate with exactly same answers,
    factorPoints: exampleCitizenFactorPoints,
    id: 'exactMatchCandidate'
  },
  {
    answers: exampleCitizenAnswers.map((answer) => ({
      ...answer,
      // Otherwise same answers as citizen, but first 3 are 1
      answer: answer.questionId < 4 ? 1 : answer.answer
    })),
    factorPoints: allOnesFactorPoints,
    id: 'firstThreeOnesCandidate'
  },
  {
    answers: exampleCitizenAnswers.map((answer) => ({
      ...answer,
      // Otherwise same answers as citizen, but first is 1
      answer: answer.questionId === 1 ? 4 : answer.answer
    })),
    factorPoints: exampleCitizenFactorPoints,
    id: 'onlyDifferenceIsFirstQuestion'
  },
  allAnswersMissingCanddiate,
  allFivesCandidate
];
