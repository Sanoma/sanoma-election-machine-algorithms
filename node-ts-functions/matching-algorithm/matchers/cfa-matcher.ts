import { computeEuclideanDistance } from '../distances/euclidean-distance';
import { FactorPoints } from '../types/factor-points';
import { Match } from '../types/matchers';
import { createVector } from '../types/vector';
import { distanceToPercentage } from './manhattan-matcher';

// In this demo example we use a these as the min and max for our
// factor value space. These values would actually be computed
// during the creation of the model (see the folder in the repo)
const valuesMinMax: Record<string, { min: number; max: number }> = {
  'Vasemmisto-Oikeisto': { min: -1, max: 1 },
  'Liberaalivihreä-Kansalliskonservatiivi': { min: -1, max: 1 }
};

// As mentioned above, this would be calculated using the
// r code in the repo.
export const maxCfaDistance = computeEuclideanDistance(
  createVector(createVector(-1, -1), createVector(1, 1))
);

export const doCfaMatch = (
  firstAnswererFactorPoints: FactorPoints,
  secondAnswerer: { id: string; factorPoints: FactorPoints }
): Match => {
  // These are the dimensions in the 2023 parliamentary elections, could
  // be something else in the future
  const electionDimensions = [
    'Vasemmisto-Oikeisto',
    'Liberaalivihreä-Kansalliskonservatiivi'
  ];
  // Create the vectors for comparison
  const firstAnswersArray = electionDimensions.map((dimension) =>
    typeof firstAnswererFactorPoints[dimension] === 'number'
      ? firstAnswererFactorPoints[dimension]
      : 'noAnswers'
  );
  const secondAnswersArray = electionDimensions.map((dimension) =>
    typeof secondAnswerer.factorPoints[dimension] === 'number'
      ? secondAnswerer.factorPoints[dimension]
      : 'noAnswers'
  );

  const noAnswersRemovedFirstAnswererDimenstions: number[] = [];
  const noAnswersRemovedSecondAnswererDimensions: number[] = [];
  let secondAnswererNumberOfNoAnswer = 0;

  firstAnswersArray.forEach((value, index) => {
    if (
      typeof value === 'number' &&
      typeof secondAnswersArray[index] === 'number'
    ) {
      noAnswersRemovedFirstAnswererDimenstions.push(value);
      noAnswersRemovedSecondAnswererDimensions.push(
        secondAnswersArray[index] as number
      );
    } else if (
      typeof value === 'number' &&
      secondAnswersArray[index] === 'noAnswers'
    ) {
      // Add penalty candidate with no answers at all (rare case
      // since the factor points can be calculated off very little).
      secondAnswererNumberOfNoAnswer += maxCfaDistance;
    }
  });

  const maxDistance = maxCfaDistance;
  const distance =
    computeEuclideanDistance(
      createVector(
        createVector(...noAnswersRemovedFirstAnswererDimenstions),
        createVector(...noAnswersRemovedSecondAnswererDimensions)
      )
    ) + secondAnswererNumberOfNoAnswer;
  return {
    secondAnswererId: secondAnswerer.id,
    distance,
    percentage: distanceToPercentage(distance, maxDistance)
  };
};
