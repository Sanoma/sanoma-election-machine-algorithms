import { doCfaMatch, maxCfaDistance } from '../matchers/cfa-matcher';
import {
  distanceToPercentage,
  doManhattanMatch
} from '../matchers/manhattan-matcher';
import { Answer } from '../types/answers';
import { Candidate } from '../types/candidate';
import { Match } from '../types/matchers';

/**
 *
 * Function to match candidates with a citizen. Uses the manhattan distance
 * metric to compute the distance between the citizen and the candidates.
 *
 * @param citizenAnswers answers from the citizen, can have missing values
 * @param candidates candidates with their answers
 * @returns The matches, sorted by distance
 */
export const matchCandidates = (
  citizenAnswers: Answer[],
  candidates: Candidate[]
): Match[] => {
  const manhattanMatches = candidates.map((candidate) =>
    doManhattanMatch({ answers: citizenAnswers }, candidate)
  );
  manhattanMatches.sort((a, b) => a.distance - b.distance);
  return manhattanMatches;
};
