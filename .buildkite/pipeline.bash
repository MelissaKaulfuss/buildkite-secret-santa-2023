#!/bin/bash

set -eu

NAMES=$(shuf -e Jess Harriet Sam Keith Tim)

if [[ ! -z "${BUILDKITE:-}" ]]; then
  buildkite-agent meta-data set names "$NAMES"
fi

cat <<PIPELINE
steps:
  - command: "readme.bash"
    label: "🎄 Readme"
    artifact_paths: "*.gif"
  - wait
PIPELINE

for name in $NAMES; do
  cat <<PIPELINE
  - block: "📝 $name"
    prompt: "Dear Secret Santa…"
    fields:
      - text: "My hint for xmas is…"
        key: "hint-$name"
      - text: "Please send my xmas presents to…"
        key: "address-$name"
PIPELINE
done

cat <<PIPELINE
  - wait
  - command: "notify-santas-magical-unicorns.bash"
    label: "💌 :santa::skin-tone-3:"
PIPELINE
