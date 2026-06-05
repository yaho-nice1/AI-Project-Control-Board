const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "board-external-project-"));
const projectRoot = path.join(tempRoot, "Sample Codex Project");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runNode(args) {
  execFileSync(process.execPath, args, { cwd: root, stdio: "pipe" });
}

try {
  fs.mkdirSync(projectRoot, { recursive: true });
  runNode(["scripts/board-init.js", "--project", projectRoot]);

  [
    "AGENTS.md",
    "README.md",
    "docs/architecture.md",
    "docs/coding-rules.md",
    "docs/data-contracts.md",
    "docs/testing-guide.md",
    "specs/initial-feature/spec.md",
    "specs/initial-feature/plan.md",
    "specs/initial-feature/tasks.md",
    "specs/initial-feature/acceptance-tests.md",
    "specs/initial-feature/change-log.md",
  ].forEach((relativePath) => {
    assert(fs.existsSync(path.join(projectRoot, relativePath)), `Missing initialized file: ${relativePath}`);
  });

  fs.writeFileSync(path.join(projectRoot, "README.md"), "# Sample Codex Project\n\n## 목적\n\n외부 프로젝트 연결을 검증한다.\n");
  runNode(["scripts/board-sync.js", "--project", projectRoot]);

  const boardState = readJson(".control-board/state.json");
  assert(boardState.sourceProject.name === "Sample Codex Project", "External source project name is not synced");
  assert(boardState.sourceProject.path === projectRoot, "External source project path is not synced");
  assert(boardState.sourceProject.isBoardProject === false, "External project must not be marked as board project");
  assert(boardState.project.goal === "외부 프로젝트 연결을 검증한다.", "External README summary is not synced");
  assert(boardState.features.some((feature) => feature.id === "initial-feature"), "Initial feature was not discovered");
  assert(boardState.structure.valid === true, "Initialized external project should have a valid template structure");

  console.log("External project checks passed.");
} finally {
  runNode(["scripts/board-sync.js"]);
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
