# TS Parts of the Algorithms

The services powering the Sanoma elecetion machine are mostly written in
TypeScript, and this folder contains relevasnt part of those applications
related to the algorithm and candidate matching.

## Requirements for running locally

- Tested with Node 18 (see `.nvmrc`)

## Setting up

Should be as simple as in this folder.

```
npm i
```

Would recommend [`nvm`](https://github.com/nvm-sh/nvm) both in general and to
make sure that you're on the correct node version.

## Available scripts

The relevant scripts for playing around and checking that things work are:

```
npm test
```

and

```
npm test:watch
```

The former runs the test suite with coverage, and the latter helps with
developing by running the tests in watch mode.

## What algorithms are covered here?

Currently, this repository in full contains the algorithms that power the
Helsingin Sanomat election machine for the 2023 parliamentary elections and
the 2024 presidential elections.

The [manhattan-matcher.ts](./matching-algorithm/match-candidate/manhattan-matcher.ts)
contains also the function to compute value maps using sum variables over the questions.

The easiest way to dig into the algorithms is to start from the
[match-candidate](./matching-algorithm/match-candidate) folder - the abstraction
level goes from high to low starting from there.
