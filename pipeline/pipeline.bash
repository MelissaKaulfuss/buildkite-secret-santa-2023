#!/bin/bash

set -euo pipefail

NAMES=$(shuf -e Baz Ben Brett Chris Hannah Mel MHz Michael Mitch)

if [[ ! -z "${BUILDKITE:-}" ]]; then
  buildkite-agent meta-data set names "$NAMES"
fi

cat <<PIPELINE
steps:
  - command: "pipeline/readme.bash"
    label: "🎄 Readme"
    artifact_paths: "pipeline/*.gif"
PIPELINE

for name in $NAMES; do
  cat <<PIPELINE
  - block: "📝 $name"
    prompt: "Dear Secret Santa…"
    submit: "Lock it in Eddy!"
    fields:
      - text: "Pressie Hint"
        hint: "My xmas pressie hint is…"
        key: "hint-$name"
      - text: "Delivery Address"
        hint: "Please send my xmas pressie to…"
        key: "address-$name"
PIPELINE
done

cat <<PIPELINE
  - command: "pipeline/magical-unicorns.bash"
    label: "💌 :santa::skin-tone-3: :unicorn_face:"
PIPELINE
