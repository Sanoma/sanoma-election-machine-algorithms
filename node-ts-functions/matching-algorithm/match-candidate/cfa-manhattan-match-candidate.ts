import { doCfaMatch, maxCfaDistance } from '../matchers/cfa-matcher';
import {
  distanceToPercentage,
  doManhattanMatch
} from '../matchers/manhattan-matcher';
import { Answer } from '../types/answers';
import { Candidate } from '../types/candidate';
import { FactorPoints } from '../types/factor-points';
import { Match } from '../types/matchers';
import { scale } from '../utils/scale';

/**
 *
 * Function to match candidates with a citizen. This uses precomupted
 * factor points (for candidates this has been done beforehand, and for
 * the citizen when the answers are submitted). In this repo the connection
 * for reading the factor points from the model is not implemented, but
 * see the other folder about confirmatory factorial analysis for how
 * those are computed.
 *
 * @param citizenAnswers answers from the citizen, can have missing values
 * @param citizenFactorPoints the factor points of citizen - consider these
 * as parameters in the value dimensions, such as left-right or GAL-TAN
 * @param candidates candidates with their answers and factor points
 * @param manhattanIds ids of questions that should be considered as
 * "fact questions" and measured with manhattan distance
 * @returns The matches, sorted by distance
 */
export const matchCandidates = (
  citizenAnswers: Answer[],
  citizenFactorPoints: FactorPoints,
  candidates: Candidate[],
  // Note: there was an unfortunate bug related to this array in the election
  // machine of 2023 (https://www.hs.fi/politiikka/art-2000009405575.html). One
  // of the ids was incorrectly set, and this caused that question to weigh in
  // on both the factor analysis and manhattan distance, causing some extra
  // weight to be put on it. This was fixed immediately on discovery.
  manhattanIds: number[]
): Match[] => {
  const cfaMatches = candidates.map((candidate) =>
    doCfaMatch(citizenFactorPoints, candidate)
  );
  const citizenManhattanAnswers = citizenAnswers.filter((answer) =>
    manhattanIds.includes(answer.questionId)
  );
  const manhattanMatches = candidates.map((candidate) =>
    doManhattanMatch({ answers: citizenManhattanAnswers }, candidate)
  );
  const manhattanMatchMap: Record<string, Match> = manhattanMatches.reduce(
    (prev, curr) => {
      prev[curr.secondAnswererId] = curr;
      return prev;
    },
    {} as Record<string, Match>
  );
  // Since not all answers measure the value dimensions, we need to combine
  // the value dimensions with the fact questions.
  // Do this by projecting the manhattan distance to the same scale as the
  // factor points, and weigh by the amount of questions used for for each

  const combinedMatches: Match[] = cfaMatches.map((cfaMatch) => {
    const correspondingManhattanMatch =
      manhattanMatchMap[cfaMatch.secondAnswererId];
    const projectedManhattanDistance =
      correspondingManhattanMatch.distance === 0
        ? 0
        : scale(
            correspondingManhattanMatch.distance,
            0,
            citizenManhattanAnswers.length * 4,
            0,
            maxCfaDistance
          );
    const cfaWeight =
      (citizenAnswers.length - citizenManhattanAnswers.length) /
      citizenAnswers.length;
    const manhattanWeight =
      citizenManhattanAnswers.length / citizenAnswers.length;
    const newDistance =
      cfaWeight * cfaMatch.distance +
      manhattanWeight * projectedManhattanDistance;
    return {
      distance: newDistance,
      percentage: distanceToPercentage(newDistance, maxCfaDistance),
      secondAnswererId: cfaMatch.secondAnswererId
    };
  });
  combinedMatches.sort((a, b) => a.distance - b.distance);
  return combinedMatches;
};
