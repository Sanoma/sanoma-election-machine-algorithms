import { matchCandidates } from '../match-candidate/cfa-manhattan-match-candidate';
import { maxCfaDistance } from '../matchers/cfa-matcher';
import { scale } from '../utils/scale';
import { createAllSameAnswersFirstAnswerer } from './mock-data/answerer-mocks';
import {
  allAnswersHalfFactorPointsMissingCanddiate,
  allAnswersMissingCanddiate,
  allHalfsFactorPoints,
  allOnesCandidate,
  allOnesFactorPoints,
  allThreesCandidate,
  allTwosCandidate,
  cfaManhattanexampleCandidates,
  exampleCitizenAnswers,
  exampleCitizenFactorPoints
} from './mock-data/match-candidate-mocks';

describe('null hypothesis', () => {
  test('all empties', () => {
    const match = matchCandidates([], {}, [], []);
    expect(match.length).toBe(0);
  });
});

describe('match only one candidate', () => {
  test('just one candidate', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      allOnesFactorPoints,
      [allThreesCandidate],
      []
    );
    expect(match.length).toBe(1);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allThrees');
    expect(closest.distance).toBe(Math.sqrt(8));
    expect(closest.percentage).toBe(0);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBe(Math.sqrt(8));
    expect(furthest.percentage).toBe(0);
  });
});

describe('all same answers, all factor points', () => {
  test('30 same answers all ones is exact match, no manhattan expeptions', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      allOnesFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      []
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBe(Math.sqrt(8));
    expect(furthest.percentage).toBe(0);
  });
  test('30 same answers all twos is exact match, no manhattan expeptions', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(2).answers,
      allHalfsFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      []
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allTwos');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBeCloseTo(2.12132);
    expect(furthest.percentage).toBeCloseTo(1 - 2.12132 / maxCfaDistance);
  });
});

describe('all same answers, manhattan exceptions', () => {
  test('30 same answers all ones is exact match, one manhattan question', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      allOnesFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      [1]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance =
      Math.sqrt(8) * (29 / 30) + scale(2, 0, 4, 0, maxCfaDistance) * (1 / 30);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
  });
  test('30 same answers all twos is exact match, five manhattan questions', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(2).answers,
      allHalfsFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      [1, 2, 3, 4, 5]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allTwos');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance =
      2.12132 * (25 / 30) + scale(5, 0, 20, 0, maxCfaDistance) * (5 / 30);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
  });
});

describe('missing answers', () => {
  test('candidate is missing all answers, one manhattan exception', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      allOnesFactorPoints,
      [
        allOnesCandidate,
        allTwosCandidate,
        allThreesCandidate,
        allAnswersMissingCanddiate
      ],
      [1]
    );
    expect(match.length).toBe(4);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allAnswersMissing');
    const furthestDistance =
      2 * maxCfaDistance * (29 / 30) +
      scale(5, 0, 4, 0, maxCfaDistance) * (1 / 30);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
    expect(furthest.percentage).toBeLessThan(0);
  });
  test('candidate half factor points, all answers, five manhattan questions', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(2).answers,
      allHalfsFactorPoints,
      [
        allOnesCandidate,
        allTwosCandidate,
        allThreesCandidate,
        allAnswersHalfFactorPointsMissingCanddiate
      ],
      [1, 2, 3, 4, 5]
    );
    expect(match.length).toBe(4);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allTwos');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allAnswersHalfFactorPointsMissing');
    const furthestDistance =
      (maxCfaDistance + 0.5) * (25 / 30) +
      scale(25, 0, 20, 0, maxCfaDistance) * (5 / 30);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
  });
  test('citizen missing answers', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers.slice(0, 25),
      allOnesFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      [1]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance =
      Math.sqrt(8) * (24 / 25) + scale(2, 0, 4, 0, maxCfaDistance) * (1 / 25);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
  });
  test('with only manhattan answers', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers.slice(0, 5),
      allOnesFactorPoints,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate],
      [0, 1, 2, 3, 4]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance = scale(10, 0, 20, 0, maxCfaDistance);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
  });
});

describe('election answer proxies', () => {
  test('real data example', () => {
    const match = matchCandidates(
      exampleCitizenAnswers,
      exampleCitizenFactorPoints,
      cfaManhattanexampleCandidates,
      [1, 2, 3, 11, 24]
    );

    // Closest candidate is exact match
    expect(match.length).toBe(6);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('exactMatchCandidate');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);

    // Furthest candidate is all answers missing candidate

    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allAnswersMissing');
    const furthestDistance =
      2 * maxCfaDistance * (25 / 30) +
      scale(25, 0, 20, 0, maxCfaDistance) * (5 / 30);
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(
      1 - furthestDistance / maxCfaDistance
    );
    expect(furthest.percentage).toBeLessThan(0);

    // Second closest is the canddiate with all same answers, but one difference
    // in one of the manhattan questions
    const secondClosest = match[1];
    expect(secondClosest.secondAnswererId).toBe(
      'onlyDifferenceIsFirstQuestion'
    );
    expect(secondClosest.distance).toBe(
      (5 / 30) * scale(1, 0, 20, 0, maxCfaDistance)
    );
    expect(secondClosest.percentage).toBe(
      1 - ((5 / 30) * scale(1, 0, 20, 0, maxCfaDistance)) / maxCfaDistance
    );

    // Third closest is candidate with ones for factor points and almost same
    // manhattan values
    const thirdClosest = match[2];
    expect(thirdClosest.secondAnswererId).toBe('allOneFactorPointsCandidate');
    expect(thirdClosest.distance).toBeCloseTo(
      (25 / 30) * 0.867179 + (5 / 30) * scale(8, 0, 20, 0, maxCfaDistance)
    );
    expect(thirdClosest.percentage).toBeCloseTo(
      1 -
        ((25 / 30) * 0.867179 + (5 / 30) * scale(8, 0, 20, 0, maxCfaDistance)) /
          maxCfaDistance
    );

    // Fourth closest is candidate all fives and factor points
    const fourthClosest = match[3];
    expect(fourthClosest.secondAnswererId).toBe('allFives');
    expect(fourthClosest.distance).toBeCloseTo(
      (25 / 30) * 2.04353 + (5 / 30) * scale(11, 0, 20, 0, maxCfaDistance)
    );
    expect(fourthClosest.percentage).toBeCloseTo(
      1 -
        ((25 / 30) * 2.04353 + (5 / 30) * scale(11, 0, 20, 0, maxCfaDistance)) /
          maxCfaDistance
    );

    // Fourth closest is candidate all missing answers and some factor points
    const fifthClosest = match[4];
    expect(fifthClosest.secondAnswererId).toBe(
      'allAnswersHalfFactorPointsMissing'
    );
    expect(fifthClosest.distance).toBeCloseTo(
      (25 / 30) * (0.3510495 + maxCfaDistance) +
        (5 / 30) * scale(25, 0, 20, 0, maxCfaDistance)
    );
    expect(fifthClosest.percentage).toBeCloseTo(
      1 -
        ((25 / 30) * (0.3510495 + maxCfaDistance) +
          (5 / 30) * scale(25, 0, 20, 0, maxCfaDistance)) /
          maxCfaDistance
    );
  });
});
