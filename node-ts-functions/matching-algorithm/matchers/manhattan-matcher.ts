import { computeManhattanDistance } from '../distances/manhattan-distance';
import { FullAnswer, Answer, isEmptyAnswer } from '../types/answers';
import {
  ElectionConfig,
  Value,
  ValueQuestion,
  isValueQuestion
} from '../types/configuration';
import { FirstAnswerer, Match, SecondAnswerer } from '../types/matchers';
import { Values } from '../types/values';
import { createVector } from '../types/vector';
import mapValues from 'lodash.mapvalues';
import { scale } from '../utils/scale';

const fillInEmptyAnswer = (questionId: number): FullAnswer => ({
  questionId,
  emptyAnswer: true
});

/**
 * Only compare users given answers to candidates, and if candidate hasn't
 * answered, fill in the missing data.
 *
 * @param firstAnswers usually citizen's answers
 * @param secondAnswers usually candidate answers
 * @returns candiadte answers, augmented with missing answers if need be
 */
const filterSecondAnswersByFirstAnswers = (
  firstAnswers: Answer[],
  secondAnswers: FullAnswer[]
): FullAnswer[] => {
  const firstAnswerQuestionIds = firstAnswers.map(
    (answer) => answer.questionId
  );
  const filteredSecondAnswers = secondAnswers.filter((answer) =>
    firstAnswerQuestionIds.includes(answer.questionId)
  );
  if (filteredSecondAnswers.length !== firstAnswers.length) {
    const filteredSecondAnswerQuestionIds = filteredSecondAnswers.map(
      (answer) => answer.questionId
    );
    firstAnswers.forEach((firstAnswer) => {
      if (!filteredSecondAnswerQuestionIds.includes(firstAnswer.questionId)) {
        filteredSecondAnswers.push(fillInEmptyAnswer(firstAnswer.questionId));
      }
    });
  }
  return filteredSecondAnswers;
};

/**
 * If candidate hasn't answered, we can't know their position on the matter,
 * so we add penalty so that you can't get close matches by only answering
 * few questions.
 *
 * This assumes that there are same answers in both arrays, which can be
 * done by running the function above.
 *
 * @param firstAnswers citizen answers in most cases
 * @param secondAnswers candidate answers in most cases
 * @returns candidate answers, but with penalty added if answers are missing.
 */
const addMaxDistanceToSecondAnswers = (
  firstAnswers: Answer[],
  secondAnswers: FullAnswer[]
): Answer[] => {
  return secondAnswers.map((secondAnswer) => {
    const correspondingCitizenAnswer = firstAnswers.find(
      (firstAnswer) => firstAnswer.questionId === secondAnswer.questionId
    ) as Answer;
    return {
      ...secondAnswer,
      answer: isEmptyAnswer(secondAnswer)
        ? correspondingCitizenAnswer.answer + 5
        : secondAnswer.answer
    };
  });
};

export const distanceToPercentage = (distance: number, maxDistance: number) =>
  (maxDistance - distance) / maxDistance;

/**
 * Compute manhattan matches between two answerers.
 *
 * Treat the first answerer as the dominant one, using their answers
 * as the base on checking for missing answers on the second answerer.
 *
 * @param firstAnswerer
 * @param seconAnswerer
 */
export const doManhattanMatch = (
  firstAnswerer: FirstAnswerer,
  seconAnswerer: SecondAnswerer
): Match => {
  const firstAnswers = firstAnswerer.answers;
  const secondAnswers = seconAnswerer.answers;
  firstAnswers.sort((a, b) => a.questionId - b.questionId);
  secondAnswers.sort((a, b) => a.questionId - b.questionId);
  const firstAnswerVector = createVector(
    ...firstAnswerer.answers.map((answer) => answer.answer)
  );

  const maxDistance = computeManhattanDistance(
    createVector(
      createVector(...Array(firstAnswers.length).fill(1)),
      createVector(...Array(firstAnswers.length).fill(5))
    )
  );
  const sharedAnswers = filterSecondAnswersByFirstAnswers(
    firstAnswers,
    secondAnswers
  );
  const emptyAnswersFilledIn = addMaxDistanceToSecondAnswers(
    firstAnswers,
    sharedAnswers
  );
  const secondAnswerVector = createVector(
    ...emptyAnswersFilledIn.map((answer) => answer.answer)
  );
  const distance = computeManhattanDistance(
    createVector(firstAnswerVector, secondAnswerVector)
  );
  const percentage = distanceToPercentage(distance, maxDistance);
  return {
    secondAnswererId: seconAnswerer.id,
    distance,
    percentage
  };
};

/**
 * In the case of value calculations, sometimes we need to flip the answers
 * when they are against the agreed upon bound.
 */
const flipAnswer: { [key: number]: number } = {
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1
};

/**
 *
 * @param answers Array of answers we're going to compute values for
 * @param configuration Configuration that contains information about how the
 * values should be interpreted
 * @returns The values in the dimensions defined by the configuration
 */
export const doManhattanValues = (
  answers: Answer[],
  configuration: ElectionConfig
): Values => {
  // First, separate the value questions from the questions that
  // are not used for value calculations
  const valueQuestions = configuration.electionMachineQuestions.filter(
    (question) => isValueQuestion(question)
  ) as ValueQuestion[];

  // Cast to ValueQuestion should be fine, since we filter by the same id as we flatten later.
  // Questions can be mapped to multiple dimenstions, which is why we create the
  // dictionary for each value here.
  const questionsByValue: Record<string, ValueQuestion[]> =
    configuration.values.reduce((prev, curr) => {
      const questions = valueQuestions.filter((question) =>
        question.valueDetails
          .map((details) => details.valueId)
          .includes(curr.id)
      );
      const flattenedValueDetails = questions.map((question) => ({
        ...question,
        valueDetails: question.valueDetails.filter(
          (details) => details.valueId === curr.id
        )
      }));
      return { ...prev, [curr.name]: flattenedValueDetails };
    }, {});

  return mapValues(questionsByValue, (questions) => {
    const filteredQuestions = questions.filter((question) =>
      answers.map((answer) => answer.questionId).includes(question.id)
    );
    // Due to filtering above, find should always work
    const filteredAnswers = filteredQuestions.map((question) =>
      answers.find((answer) => answer.questionId === question.id)
    ) as Answer[];
    if (filteredAnswers.length === 0) {
      return 'noAnswers';
    }
    // Compute the sum variables
    const answerSum = filteredAnswers.reduce((prev, curr) => {
      const question = questions.find(
        (question) => question.id === curr.questionId
      ) as ValueQuestion;
      // The value details are flattened above
      const targetBound = question.valueDetails[0].targetBound;
      const value = configuration.values.find(
        (value) => value.id === question.valueDetails[0].valueId
      ) as Value;
      const targetBoundIndex = value.bounds.findIndex(
        (bound) => bound === targetBound
      );
      const answerToAggregate =
        targetBoundIndex === 1 ? curr.answer : flipAnswer[curr.answer];
      return prev + answerToAggregate;
    }, 0);
    const answerAverage = answerSum / filteredAnswers.length;
    const scaled = scale(answerAverage, 1, 5, -1, 1);
    return scaled;
  });
};
