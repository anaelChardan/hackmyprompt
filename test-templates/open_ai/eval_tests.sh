#! /bin/bash

echo "Running tests..."

promptfoo redteam eval -c tests.yaml --output=results.json -j 100 --verbose

echo "Tests evaluated"
