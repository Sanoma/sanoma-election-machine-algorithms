import { FullAnswer } from './answers';
import { FactorPoints } from './factor-points';

export interface Candidate {
  id: string;
  answers: FullAnswer[];
  factorPoints: FactorPoints;
}
