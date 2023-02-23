import { Answer, FullAnswer } from './answers';

export interface FirstAnswerer {
  answers: Answer[];
}

export interface SecondAnswerer {
  id: string;
  answers: FullAnswer[];
}

export interface Match {
  secondAnswererId: string;
  distance: number;
  percentage: number;
}
