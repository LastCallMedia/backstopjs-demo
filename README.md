# BackstopJS: Avoid misery with Visual Regression Testing

This is a demo into how to use BackstopJS Visual Regression Testing in many different ways.

# Requirements
  - [Docker](https://docs.lando.dev/basics/installation.html#docker-engine-requirements) can be ran separately from Lando
  - [BackstopJS install](https://github.com/garris/BackstopJS#getting-started)
        `npm install -g backstopjs`


# Setting Up for Local Development

  Two options either use backstop-docker or backstop.

  If you are using the `backstop-docker` copy the directory into your repository and follow these [instruction.](#Backstop-Docker) and use this part of the lando.yml file.

  ```
$services:
$    backstop-docker:
$        type: node:custom
$        overrides:
$          image:  backstopjs/backstopjs:4.4.2
$
$tooling:
$    backstop-docker:
$        service: backstop-docker
$        description: Runs "lando backstop-docker" to use backstop with docker
$        cmd: "backstop --config=backstop-docker/backstop.js"
$
```

  If you are using just backstop.... Examples of backstop....

# Getting Started using BackstopJS

## Backstop-Docker
   To use this just simiply update the following files if needed:
   - [backstop-docker/enviornment.json](backstop-docker/enviornment.json)
     - This will include any environments you want to run BackstopJS against such as Production, Stage/Test, or Dev.
     Local is setup to run with lando.yml within the [backstop.js](backstop-docker/backstop.js). If you are not using Lando you can add local to
     the environment.json file

   - [backstop-docker/page.json](backstop-docker/page.json)
     - The page.json includes all pages that will be used to test with BackstopJS.

       ```{"label":  "Namepage", "url": "/en/contact"}```

       You can include selectors in this file as well. The `backstopSelectors` can be used to pick a region or section of the page. The `".class"` is div class to pick in the page and the `"document"` will take a screen capture of the whole page as well.
       ```
       {"label":  "NameFeedback", "url":  "/node/1234",
              "backstopSelectors": [
              ".class",
              "document"
              ]
            },
       ```
      Once these files have been updated go to the following [documentation](backstop-docker/README.md) to see the commands you can use to run to compare pages.

# CI setup

   To add BackstopJS to the CircleCI make sure to change the backstopjs here `"report": ["browser", "CI"],`. Add the `"CI"` to the report section.
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
 If you update the lando.yml file and you have trouble bring the backstop-docker container back up. Lando does not remove old containers so the following needs to be done:
   ```
    $ docker stop backstopjs_backstop_1
    $ docker rm backstopjs_backstop_1
    $ lando start
   ```

# Attribution
   [BackstopJS](https://github.com/garris/BackstopJS) was created and is maintained by Garris Shipon

