import { computeManhattanDistance } from '../distances/manhattan-distance';
import { FullAnswer, Answer, isEmptyAnswer } from '../types/answers';
import { FirstAnswerer, Match, SecondAnswerer } from '../types/matchers';
import { createVector } from '../types/vector';

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
