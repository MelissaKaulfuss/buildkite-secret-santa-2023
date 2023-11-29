<h1><img alt="Buildkite Secret Santa 2023" src="logo.gif" width="550"></h1>

[Buildkite](https://buildkite.com/)’s Secret Santa 2023 build pipeline, gets xmas pressie hints from everyone, and notifies gift purchasers who they'll be shopping for, and what their gift recipient's wish is.

## How does it work?

The build pipeline:

- [pipeline/pipeline.bash](pipeline/pipeline.bash) - generates the Buildkite pipeline that requests Secret Santa hints from everyone.
- [pipeline/readme.bash](pipeline/readme.bash) - the first step in the pipeline that welcomes everyone to this year’s Secret Santa.
- [pipeline/magical-unicorns.bash](pipeline/magical-unicorns.bash) - the last step in the pipeline: a brilliantly red magical unicorn.

The webhook receiver:

- [notifier/index.js](notifier/index.js) - an AWS Lambda function that accepts the `job.finished` webhook from Buildkite, randomly assigns secret santas, and emails everyone with who they're purchasing for, their hint and delivery address.
- [notifier/job-event-processor.js](notifier/index.js) - extracts the information submitted by everyone from the webhook’s build meta-data.
- [notifier/secret-santa.js](notifier/index.js) - randomly assigns each secret santa based on a determistic seed value for safe re-execution. The seed is read from an environment variable so it can be changed at the last minute, to keep the "secret" in "Secret Santa".

## Give it a try

[![Add to Buildkite](https://buildkite.com/button.svg)](https://buildkite.com/new)

# Thanks to the original Secret Santa admin

This is a fork of [Tim Lucas's](https://github.com/toolmantim) original 2016 Buildkite Secret Santa. 🎅🏻✨

<!-- ## Screenshots

<p align="center"><img alt="Buildkite Secret Santa 2016" src="screenshot.png"></p>

<p align="center"><img alt="Buildkite Secret Santa 2016 Unblock Prompt Animation" src="screenshot-unblock.gif" width="724"></p>

<p align="center"><img alt="Buildkite Secret Santa 2016 Email" src="screenshot-email-notification.png" width="649"></p> -->

## License

See [Licence.md](Licence.md) (MIT)
