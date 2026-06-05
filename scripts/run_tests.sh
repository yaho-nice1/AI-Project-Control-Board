#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "AGENTS.md"
  "README.md"
  "docs/architecture.md"
  "docs/coding-rules.md"
  "docs/data-contracts.md"
  "docs/testing-guide.md"
  "specs/ai-workflow-control-board/spec.md"
  "specs/ai-workflow-control-board/plan.md"
  "specs/ai-workflow-control-board/tasks.md"
  "specs/ai-workflow-control-board/acceptance-tests.md"
  "specs/ai-workflow-control-board/change-log.md"
  "specs/workflow-visualization/spec.md"
  "specs/workflow-visualization/plan.md"
  "specs/workflow-visualization/tasks.md"
  "specs/workflow-visualization/acceptance-tests.md"
  "specs/workflow-visualization/change-log.md"
  "specs/generated-docs-preview/spec.md"
  "specs/generated-docs-preview/plan.md"
  "specs/generated-docs-preview/tasks.md"
  "specs/generated-docs-preview/acceptance-tests.md"
  "specs/generated-docs-preview/change-log.md"
  "specs/validation-and-handoff/spec.md"
  "specs/validation-and-handoff/plan.md"
  "specs/validation-and-handoff/tasks.md"
  "specs/validation-and-handoff/acceptance-tests.md"
  "specs/validation-and-handoff/change-log.md"
  "specs/document-state-sync/spec.md"
  "specs/document-state-sync/plan.md"
  "specs/document-state-sync/tasks.md"
  "specs/document-state-sync/acceptance-tests.md"
  "specs/document-state-sync/change-log.md"
  "scripts/board-init.js"
  "scripts/board-sync.js"
  ".control-board/state.json"
  "src/board-state.json"
  "adr/0001-local-first-control-board.md"
  "adr/0002-feature-scoped-specs.md"
  "src/index.html"
  "src/styles.css"
  "src/app.js"
  "tests/smoke.js"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

node --check src/app.js
node --check scripts/board-init.js
node --check scripts/board-sync.js
node --check tests/external-project.js
node --check tests/smoke.js
node scripts/board-sync.js
node tests/smoke.js
node tests/external-project.js
node tests/smoke.js

echo "All checks passed."
