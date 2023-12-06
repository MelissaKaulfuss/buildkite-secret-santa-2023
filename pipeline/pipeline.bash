#!/bin/bash

set -euo pipefail

NAMES=$(shuf -e Baz Ben Brett Chris Hannah Mel MHz Michael Mitch)

if [[ ! -z "${BUILDKITE:-}" ]]; then
  buildkite-agent meta-data set names "$NAMES"
fi

cat <<PIPELINE
steps:
  - command: "pipeline/readme.bash"
    label: "🎄 README please"
PIPELINE

for name in $NAMES; do
  cat <<PIPELINE
  - block: "📝 $name"
    prompt: "Dear Secret Santa…"
    submit: "Lock it in Eddy!"
    fields:
      - text: "My xmas pressie hint"
        key: "hint-$name"
      - text: "Please delivery my xmas pressie to this address"
        key: "address-$name"
PIPELINE
done

cat <<PIPELINE
  - command: "pipeline/magical-unicorns.bash"
    label: "💌 :santa::skin-tone-3: :unicorn_face:"
PIPELINE
