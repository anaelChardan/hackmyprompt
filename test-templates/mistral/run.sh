#! /bin/bash

# Run a promptfoo test with mistral

echo "Generating tests..."

promptfoo redteam generate -c config.yaml --force --verbose -o tests.yaml -j 10

echo "Running tests..."

promptfoo redteam eval -c tests.yaml --output=results.json -j 10 --verbose

echo "Tests done"
