import { matchCandidates } from '../match-candidate/manhattan-match-candidate';
import { maxCfaDistance } from '../matchers/cfa-matcher';
import { scale } from '../utils/scale';
import { createAllSameAnswersFirstAnswerer } from './mock-data/answerer-mocks';
import {
  allAnswersHalfFactorPointsMissingCanddiate,
  allAnswersMissingCanddiate,
  allOnesCandidate,
  allThreesCandidate,
  allTwosCandidate,
  cfaManhattanexampleCandidates,
  exampleCitizenAnswers,
  manhattanexampleCandidates
} from './mock-data/match-candidate-mocks';

describe('null hypothesis', () => {
  test('all empties', () => {
    const match = matchCandidates([], []);
    expect(match.length).toBe(0);
  });
});

describe('match only one candidate', () => {
  test('just one candidate', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      [allThreesCandidate]
    );
    expect(match.length).toBe(1);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allThrees');
    // First answer is all ones, seconf is all threes, each
    // adds two to the distance
    expect(closest.distance).toBe(30 * 2);
    // Max distance is 4 from each
    expect(closest.percentage).toBe(1 - (30 * 2) / (30 * 4));
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBe(30 * 2);
    expect(furthest.percentage).toBe(1 - (30 * 2) / (30 * 4));
  });
});

describe('all same answers', () => {
  test('30 same answers all ones is exact match', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    // Same as in the above test
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBe(30 * 2);
    expect(furthest.percentage).toBe(0.5);
  });
  test('30 same answers all twos is exact match', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(2).answers,
      [allOnesCandidate, allTwosCandidate, allThreesCandidate]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allTwos');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    expect(furthest.distance).toBeCloseTo(30);
    expect(furthest.percentage).toBeCloseTo(1 - (30 * 1) / (30 * 4));
  });
});

describe('missing answers', () => {
  test('candidate is missing all answers', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers,
      [
        allOnesCandidate,
        allTwosCandidate,
        allThreesCandidate,
        allAnswersMissingCanddiate
      ]
    );
    expect(match.length).toBe(4);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allAnswersMissing');
    const furthestDistance = 30 * 5;
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeLessThan(0);
  });
  test('citizen missing answers', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers.slice(0, 25),
      [allOnesCandidate, allTwosCandidate, allThreesCandidate]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance = 25 * 2;
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBe(0.5);
  });
  test('with only five answers', () => {
    const match = matchCandidates(
      createAllSameAnswersFirstAnswerer(1).answers.slice(0, 5),
      [allOnesCandidate, allTwosCandidate, allThreesCandidate]
    );
    expect(match.length).toBe(3);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('allOnes');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);
    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allThrees');
    const furthestDistance = 5 * 2;
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeCloseTo(0.5);
  });
});

describe('election answer proxies', () => {
  test('real data example', () => {
    const match = matchCandidates(
      exampleCitizenAnswers,
      manhattanexampleCandidates
    );

    // Closest candidate is exact match
    expect(match.length).toBe(5);
    const closest = match[0];
    expect(closest.secondAnswererId).toBe('exactMatchCandidate');
    expect(closest.distance).toBe(0);
    expect(closest.percentage).toBe(1);

    // Furthest candidate is all answers missing candidate

    const furthest = match[match.length - 1];
    expect(furthest.secondAnswererId).toBe('allAnswersMissing');
    const furthestDistance = 30 * 5;
    expect(furthest.distance).toBeCloseTo(furthestDistance);
    expect(furthest.percentage).toBeLessThan(0);

    // Second closest is the canddiate with all same answers, but one difference
    const secondClosest = match[1];
    expect(secondClosest.secondAnswererId).toBe(
      'onlyDifferenceIsFirstQuestion'
    );
    expect(secondClosest.distance).toBe(1);
    expect(secondClosest.percentage).toBe(1 - 1 / 120);

    // Third closest is with first three as one
    const thirdClosest = match[2];
    expect(thirdClosest.secondAnswererId).toBe('firstThreeOnesCandidate');
    expect(thirdClosest.distance).toBeCloseTo(8);
    expect(thirdClosest.percentage).toBeCloseTo(1 - 8 / 120);

    // Fourth closest is candidate all fives
    const fourthClosest = match[3];
    expect(fourthClosest.secondAnswererId).toBe('allFives');
    expect(fourthClosest.distance).toBeCloseTo(52);
    expect(fourthClosest.percentage).toBeCloseTo(1 - 52 / 120);

    // Fourth closest is candidate all missing answers
    const fifthClosest = match[4];
    expect(fifthClosest.secondAnswererId).toBe('allAnswersMissing');
    expect(fifthClosest.distance).toBeCloseTo(30 * 5);
    expect(fifthClosest.percentage).toBeLessThan(0);
  });
});
