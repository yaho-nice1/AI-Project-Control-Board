#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const schemaVersion = "0.2.0";
const coreDocumentPaths = [
  "AGENTS.md",
  "docs/architecture.md",
  "docs/coding-rules.md",
  "docs/data-contracts.md",
  "docs/testing-guide.md",
];
const featureDocumentNames = ["spec.md", "plan.md", "tasks.md", "acceptance-tests.md", "change-log.md"];

function readText(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function writeJson(relativePath, data) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(data, null, 2)}\n`);
}

function kebabToTitle(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractSummary(text, fallback) {
  if (!text) {
    return fallback;
  }

  const purpose = text.match(/##\s*목적\s*\n+([\s\S]*?)(?=\n##\s|\n#\s|$)/);
  const background = text.match(/##\s*배경\s*\n+([\s\S]*?)(?=\n##\s|\n#\s|$)/);
  const source = (purpose || background || [null, text])[1];
  const line = source
    .split("\n")
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .find((item) => item && !item.startsWith("```") && !item.startsWith("|"));

  return line || fallback;
}

function fileUpdatedAt(relativePath) {
  const fullPath = path.join(root, relativePath);
  return fs.existsSync(fullPath) ? fs.statSync(fullPath).mtime.toISOString() : null;
}

function documentStatus(text) {
  if (text === null) {
    return "missing";
  }
  const body = text.trim();
  if (!body) {
    return "waiting";
  }
  if (/(TODO|TBD|미정|후속 구현|수동 검증 필요|Not Run|Needs Review)/i.test(body)) {
    return "review";
  }
  const checkboxes = [...body.matchAll(/^- \[( |x|X)\]\s+/gm)];
  if (checkboxes.length && checkboxes.some((match) => match[1] === " ")) {
    return "review";
  }
  return "done";
}

function coreDocument(relativePath) {
  const text = readText(relativePath);
  const title = path.basename(relativePath);
  return {
    key: slugify(relativePath.replace(/\.md$/, "")),
    title,
    path: relativePath,
    status: documentStatus(text),
    body: extractSummary(text, `${title} 문서가 아직 작성되지 않았다.`),
    updatedAt: fileUpdatedAt(relativePath),
  };
}

function parseTasks(featureId, tasksPath, text) {
  if (!text) {
    return [];
  }

  return [...text.matchAll(/^- \[( |x|X)\]\s+(.+)$/gm)].map((match, index) => {
    const done = match[1].toLowerCase() === "x";
    const title = match[2].replace(/`/g, "").trim();
    return {
      id: `${featureId}-${slugify(title) || `task-${index + 1}`}`,
      featureId,
      title,
      status: done ? "done" : "waiting",
      source: tasksPath,
      criteria: done ? "체크된 작업으로 기록되어 있다." : "tasks.md에서 완료 체크가 필요하다.",
    };
  });
}

function featureStatus(documents, tasks) {
  if (documents.some((document) => document.status === "missing")) {
    return "blocked";
  }
  if (tasks.length && tasks.every((task) => task.status === "done")) {
    return documents.every((document) => document.status === "done") ? "done" : "review";
  }
  if (tasks.some((task) => task.status !== "done")) {
    return "active";
  }
  if (documents.some((document) => document.status === "review" || document.status === "waiting")) {
    return "review";
  }
  return "done";
}

function featureState(featureName) {
  const featureId = featureName;
  const featurePath = `specs/${featureName}/`;
  const specText = readText(`${featurePath}spec.md`);
  const documents = featureDocumentNames.map((name) => {
    const relativePath = `${featurePath}${name}`;
    const text = readText(relativePath);
    return {
      path: relativePath,
      name,
      status: documentStatus(text),
      required: true,
      summary: extractSummary(text, `${name} 문서가 아직 작성되지 않았다.`),
      updatedAt: fileUpdatedAt(relativePath),
    };
  });
  const tasks = parseTasks(featureId, `${featurePath}tasks.md`, readText(`${featurePath}tasks.md`));

  return {
    id: featureId,
    path: featurePath,
    title: kebabToTitle(featureName),
    status: featureStatus(documents, tasks),
    summary: extractSummary(specText, `${featurePath} 문서 상태를 동기화한다.`),
    documents,
    tasks,
  };
}

function discoverFeatures() {
  const specsPath = path.join(root, "specs");
  if (!fs.existsSync(specsPath)) {
    return [];
  }

  return fs
    .readdirSync(specsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort()
    .map(featureState);
}

function currentStage(features) {
  if (features.some((feature) => feature.status === "blocked")) {
    return "tests";
  }
  if (features.some((feature) => feature.status === "active")) {
    return "tasks";
  }
  if (features.some((feature) => feature.status === "review")) {
    return "tests";
  }
  return "changelog";
}

function buildState() {
  const features = discoverFeatures();
  return {
    schemaVersion,
    project: {
      name: "AI Project Control Board",
      goal: extractSummary(readText("README.md"), "AI 프로젝트 템플릿을 시각화 보드로 연결한다."),
    },
    currentStage: currentStage(features),
    updatedAt: new Date().toISOString(),
    documents: coreDocumentPaths.map(coreDocument),
    features,
  };
}

const state = buildState();
writeJson(".control-board/state.json", state);
writeJson("src/board-state.json", state);
console.log(`Synced ${state.documents.length} core docs and ${state.features.length} feature specs.`);
