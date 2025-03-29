#! /bin/bash

  # Run a promptfoo test with openai

echo "Generating tests..."

promptfoo redteam generate -c config.yaml --force --verbose -o tests.yaml -j 100

echo "Tests generated"