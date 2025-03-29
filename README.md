# How to reproduce a result from Promptfoo

## Step 1: Tests configuration

```sh
promptfoo redteam setup
```

Configure your prompt and strategies

Save to yaml

## Step 2: Tests generation

```sh
promptfoo redteam generate -c health_config.yaml -j 10 --force --verbose -o health_tests.yaml
```

## Step 3: Test evaluation

```sh
promptfoo redteam eval -c health_tests.yaml --output=health.json -j 10 --verbose
```

Then, the evaluation id is in the log and in the URL.

```sh
promptfoo view
```