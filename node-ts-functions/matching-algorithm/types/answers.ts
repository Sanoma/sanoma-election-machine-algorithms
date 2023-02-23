interface AnswerBase {
  questionId: number;
}

export interface Answer extends AnswerBase {
  answer: number;
}

// It's possible for candidates to answer "I don't want to answer" (though
// they are adviced not to do it, since it makes finding proper matches
// harder). Citizen answers that have not been answered are just missing
// from the citizen answer arrays.
interface EmptyAnswer extends AnswerBase {
  emptyAnswer: true;
}

export type FullAnswer = Answer | EmptyAnswer;

export const isEmptyAnswer = (answer: FullAnswer): answer is EmptyAnswer =>
  'emptyAnswer' in answer;
