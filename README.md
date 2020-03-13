# BackstopJS: Avoid misery with Visual Regression Testing

This is a demo into how to use BackstopJS Visual Regression Testing in many different ways.

# Requirements
  - [Lando install](https://docs.lando.dev/basics/installation.html)
  - [Docker](https://docs.lando.dev/basics/installation.html#docker-engine-requirements) can be ran separately from Lando
  - [BackstopJS install](https://github.com/garris/BackstopJS#getting-started)
        `npm install -g backstopjs`

# Components
    - Drupal 8.8.3
    - MySQL 5.7
    - PHP 7.2
    - Backstop

# Setting Up for Local Development

  - `lando start` (This will setup the database, PHP7.2, nginx, drush, and composer install)
  - Once Lando has completed the setup you can go to any of the links available

# Getting Started using BackstopJS

## Backstop-Docker
   To use this just simiply update the following files if needed:
   - [backstop-docker/enviornment.json](backstop-docker/enviornment.json)
     - This will include any environments you want to run backstop against such as Production, Stage/Test, or Dev.
     Local is setup to run with lando.yml within the [backstop.js](backstop-docker/backstop.js).

   - [backstop-docker/page.json](backstop-docker/page.json)
     - The page.json includes all pages that will be used to test with backstop.

       ```{"label":  "Namepage", "url": "/en/contact"}```

       You can include selectors in this file as well. The `backstopSelectors` can be used to pick a region or section of the page. The `".class"` is div class to pick in the page and the `"document"` will take a screen capture of the whole page as well.
       ```
       {"label":  "NameFeedback", "url":  "/node/1234",
              "backstopSelectors": [
              ".class",
              "document"
              ]
            },```
      Once these files have been updated go to the following [documentation](backstop-docker/README.md) to see the commands you can use to run to compare pages.

# CI setup

   To add backstop to the CircleCI make sure to change the backstopjs here `"report": ["browser", "CI"],`. Add the `"CI"` to the report section.
   ```
     backstop:
        parameters:
          target:
            type: string
        working_directory: /home/circleci/code
        docker:
          # Need to use docker image for these steps.
          - image: circleci/python:2.7.14
        steps:
          - checkout
          - setup_remote_docker
          - run: docker-compose up --no-start backstop
          - run: docker cp ./backstop/. "$(docker-compose ps -q backstop)":/src/
          - run: docker-compose run backstop reference --target=prod
          - run: docker-compose run backstop test --target=test
          - run:
              command: docker cp "$(docker-compose ps -q backstop)":/src/. ./backstop/
              when: always
          - store_test_results:
              path: /home/circleci/code/backstop/report
          - store_artifacts:
              path: /home/circleci/code/backstop
   ```

# Troubleshooting

## Backstop-docker
 If you update the lando.yml file and you have trouble bring the backstop docker container back up. Lando does not remove old containers so the following needs to be done:
   ```
    $ docker stop backstopjs_backstop_1
    $ docker rm backstopjs_backstop_1
    $ lando start
   ```

# Attribution
   [BackstopJS](https://github.com/garris/BackstopJS) was created and is maintained by Garris Shipon

