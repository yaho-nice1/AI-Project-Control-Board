const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const html = readFile("src/index.html");
const app = readFile("src/app.js");
const dataContracts = readFile("docs/data-contracts.md");
const acceptance = readFile("specs/ai-workflow-control-board/acceptance-tests.md");
const productSpec = readFile("specs/ai-workflow-control-board/spec.md");
const boardState = JSON.parse(readFile(".control-board/state.json"));
const browserBoardState = JSON.parse(readFile("src/board-state.json"));

[
  "AGENTS.md",
  "docs/architecture.md",
  "docs/coding-rules.md",
  "docs/data-contracts.md",
  "docs/testing-guide.md",
  "specs/ai-workflow-control-board/spec.md",
  "specs/ai-workflow-control-board/plan.md",
  "specs/ai-workflow-control-board/tasks.md",
  "specs/ai-workflow-control-board/acceptance-tests.md",
  "specs/ai-workflow-control-board/change-log.md",
  "specs/workflow-visualization/",
  "specs/generated-docs-preview/",
  "specs/validation-and-handoff/",
  "specs/document-state-sync/",
  "adr/0001-local-first-control-board.md",
  "adr/0002-feature-scoped-specs.md",
].forEach((needle) => {
  assert(
    app.includes(needle) || html.includes(needle) || dataContracts.includes(needle) || acceptance.includes(needle) || productSpec.includes(needle),
    `Missing template reference: ${needle}`,
  );
});

["orient", "spec", "plan", "tasks", "prompt", "tests", "changelog", "decision"].forEach((stageId) => {
  assert(app.includes(`id: "${stageId}"`), `Missing workflow stage: ${stageId}`);
});

["ready", "active", "review", "done"].forEach((status) => {
  assert(dataContracts.includes(status), `Missing status contract: ${status}`);
});

assert(html.includes('id="app-root"'), "HTML root element is missing");
assert(html.includes("styles.css"), "Stylesheet link is missing");
assert(html.includes("app.js"), "App script is missing");
assert(app.includes("localStorage"), "Checklist persistence is missing");
assert(app.includes("buildPrompt"), "Prompt generator is missing");
assert(app.includes("featureProgressFromState"), "Feature progress calculator is missing");
assert(app.includes("homeStageCards"), "Dynamic home stage cards are missing");
assert(app.includes("buildKanbanFromBoardState"), "Feature-level kanban builder is missing");
assert(app.includes("data-home-document-key"), "Home document rows must link to markdown previews");
assert(app.includes("renderMarkdown"), "Full markdown renderer is missing");
assert(app.includes("Allowed Files") || app.includes("변경 가능 파일"), "Allowed files prompt section is missing");
assert(boardState.schemaVersion, "Board state schemaVersion is missing");
assert(browserBoardState.schemaVersion === boardState.schemaVersion, "Browser board state schemaVersion must match source state");
assert(Array.isArray(boardState.features), "Board state features must be an array");
assert(Array.isArray(boardState.documents), "Board state core documents must be an array");
assert(boardState.activity && Array.isArray(boardState.activity.recentFiles), "Board state recent activity is missing");
assert(boardState.activity.recentFiles.length > 0, "Board state recent activity must include files");
[".control-board/state.json", "src/board-state.json"].forEach((generatedPath) => {
  assert(
    !boardState.activity.recentFiles.some((file) => file.path === generatedPath),
    `Generated state file should not appear in recent activity: ${generatedPath}`,
  );
});
assert(
  boardState.documents.every((document) => typeof document.content === "string"),
  "Synced core documents must include full markdown content",
);
["AGENTS.md", "docs/architecture.md", "docs/coding-rules.md", "docs/data-contracts.md", "docs/testing-guide.md"].forEach((documentPath) => {
  assert(boardState.documents.some((document) => document.path === documentPath), `Missing synced core document: ${documentPath}`);
});
assert(browserBoardState.updatedAt === boardState.updatedAt, "Browser board state snapshot must match root state updatedAt");
["workflow-visualization", "generated-docs-preview", "validation-and-handoff"].forEach((featureId) => {
  assert(boardState.features.some((feature) => feature.id === featureId), `Missing board state feature: ${featureId}`);
});

const checklistIdMatches = app.match(/id: "[a-z0-9-]+"/g) || [];
const duplicates = checklistIdMatches.filter((item, index) => checklistIdMatches.indexOf(item) !== index);
assert(duplicates.length === 0, `Duplicate ids found: ${duplicates.join(", ")}`);

console.log("Smoke checks passed.");
