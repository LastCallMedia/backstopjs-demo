Backstop Visual Regression Testing with Docker
===============================================

Visual regression tests are run manually before and after a Pull Request has been created.

## Before any changes to the branch
To get a baseline of the local setup. If you update the database you should redo the reference before running the test

Environments
`lando backstop-docker` will run against local as default.
If you want to use Production as baseline reference add the following option `--target=prod`
Use the `--target=` to choose which environment you want to use in backstop. These environments are all set in the `enviornment.json`.

Run this from outside the container (using Production as baseline):
1. `lando backstop-docker reference --target=prod`

## After the changes to the branch has happen or committed
1. `lando backstop-docker test` - This will test your local setup.
2. `open backstop-docker/report/index.html` - Open backstop results in your default browser.
