# Sanoma Election Machine Algorithms

This repository contains the implementations of algorithms used in Sanoma
election machines. They are published in order to open up the inner workings
about the machines in order to promote openness surrounding tools that have
become integral in the modern election cycles.

The election machine is available [here](https://vaalikone.fi/).

## Structure

The subfolders in the repository contain different facets of the algorihtms
used, they will explain themselves in their own READMEs.

All the code should be runnable with the correct local environment on
your local machine.

## Caveats

This, as you may guess is not the exact same code that is running in the
election machines we use. The reasons for this are twofold:

1. This helps focusing on the core of what matters (the code here is more
   focused on the algorithms and heavily commented to help understand the inner
   workings more), and...
2. The algorithms running embedded in the software stacks running the election
   machines, and we don't want to publish all of the election machine for
   security and convenience reasons (they are actively developed, and most of
   that development is not algorithm related, so there would be a lot of noice
   from that too).

In the optimal world this repo will be refactored in a way that we could
publish the algorithms from here as packages to say npm and other package
distribution channels, but that will have to wait for some loose development
time.

## Note about the vocabulary

In this repo the application that is used to help users select candidates in
an election is called "election machine". This is a direct translation of the
Finnish name - the more widely known name for these applications is Voting Aid
Applications (VAA).

## Contribution

As of writing this, there's yet no idea on how much people would be interested
in contributing here. Until the level of engagment is known, let's keep the
contributions / bug reports / such in the form of issues. We'll think of
a proper contribution guideline (along with relevant CI and other things) if
it looks like that would be needed.
