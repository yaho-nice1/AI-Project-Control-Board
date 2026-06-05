#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const boardRoot = path.resolve(__dirname, "..");
const sourceRoot = resolveSourceRoot();
const schemaVersion = "0.2.0";
const requiredRootPaths = ["AGENTS.md", "README.md"];
const coreDocumentPaths = [
  "AGENTS.md",
  "docs/architecture.md",
  "docs/coding-rules.md",
  "docs/data-contracts.md",
  "docs/testing-guide.md",
];
const featureDocumentNames = ["spec.md", "plan.md", "tasks.md", "acceptance-tests.md", "change-log.md"];
const activityRoots = ["AGENTS.md", "README.md", "docs", "specs", "adr", "scripts", "src", "tests"];
const generatedActivityPaths = new Set([".control-board/state.json", "src/board-state.json"]);

function resolveSourceRoot() {
  const projectFlagIndex = process.argv.indexOf("--project");
  if (projectFlagIndex === -1) {
    return boardRoot;
  }

  const projectPath = process.argv[projectFlagIndex + 1];
  if (!projectPath) {
    throw new Error("Missing value for --project");
  }

  return path.resolve(projectPath);
}

function readText(relativePath) {
  const fullPath = path.join(sourceRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function writeJson(relativePath, data) {
  const fullPath = path.join(boardRoot, relativePath);
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
  const fullPath = path.join(sourceRoot, relativePath);
  return fs.existsSync(fullPath) ? fs.statSync(fullPath).mtime.toISOString() : null;
}

function fileLabel(relativePath) {
  const featureMatch = relativePath.match(/^specs\/([^/]+)\/(.+)$/);
  if (featureMatch) {
    return `${kebabToTitle(featureMatch[1])} / ${featureMatch[2]}`;
  }
  return relativePath;
}

function fileFeature(relativePath) {
  const featureMatch = relativePath.match(/^specs\/([^/]+)\//);
  if (!featureMatch) {
    return null;
  }
  return {
    id: featureMatch[1],
    title: kebabToTitle(featureMatch[1]),
  };
}

function collectActivityFiles(targetPath) {
  if (isGeneratedActivityPath(targetPath)) {
    return [];
  }

  const fullPath = path.join(sourceRoot, targetPath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const stats = fs.statSync(fullPath);
  if (stats.isFile()) {
    return [targetPath];
  }

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .flatMap((entry) => {
      if (entry.name.startsWith(".") || entry.name === "node_modules") {
        return [];
      }
      const relativePath = `${targetPath}/${entry.name}`;
      if (entry.isDirectory()) {
        return collectActivityFiles(relativePath);
      }
      return entry.isFile() ? [relativePath] : [];
    });
}

function recentActivity(limit = 6) {
  const recentFiles = activityRoots
    .flatMap(collectActivityFiles)
    .filter((relativePath) => !relativePath.endsWith(".DS_Store") && !isGeneratedActivityPath(relativePath))
    .map((relativePath) => {
      const updatedAt = fileUpdatedAt(relativePath);
      return {
        path: relativePath,
        label: fileLabel(relativePath),
        feature: fileFeature(relativePath),
        updatedAt,
      };
    })
    .filter((file) => file.updatedAt)
    .sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt))
    .slice(0, limit);

  const focusFile = recentFiles.find((file) => file.feature);
  return {
    focusFeature: focusFile ? focusFile.feature : null,
    recentFiles,
  };
}

function isGeneratedActivityPath(relativePath) {
  return generatedActivityPaths.has(relativePath);
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
    content: text || "",
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
      content: text || "",
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
  const specsPath = path.join(sourceRoot, "specs");
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

function sourceProjectName() {
  const readme = readText("README.md");
  if (readme) {
    const heading = readme.match(/^#\s+(.+)$/m);
    if (heading) {
      return heading[1].trim();
    }
  }
  return path.basename(sourceRoot);
}

function structureState(features) {
  const requiredFeatureFiles = features.flatMap((feature) =>
    feature.documents.filter((document) => document.status === "missing").map((document) => document.path),
  );
  const missing = [...requiredRootPaths, ...coreDocumentPaths, "specs"]
    .filter((relativePath) => !fs.existsSync(path.join(sourceRoot, relativePath)))
    .concat(requiredFeatureFiles);
  const specsPath = path.join(sourceRoot, "specs");
  const hasFeatureFolders =
    fs.existsSync(specsPath) &&
    fs.readdirSync(specsPath, { withFileTypes: true }).some((entry) => entry.isDirectory() && !entry.name.startsWith("_"));

  const warnings = [];
  if (!fs.existsSync(path.join(sourceRoot, "specs"))) {
    warnings.push("specs/ 폴더가 없습니다.");
  } else if (!hasFeatureFolders) {
    warnings.push("specs/ 아래에 기능 폴더가 없습니다.");
  }
  if (!fs.existsSync(path.join(sourceRoot, "adr"))) {
    warnings.push("adr/ 폴더가 없습니다. 중요한 결정 기록이 있으면 추가하세요.");
  }
  if (requiredFeatureFiles.length) {
    warnings.push("기능 폴더에는 spec.md, plan.md, tasks.md, acceptance-tests.md, change-log.md가 필요합니다.");
  }

  return {
    valid: missing.length === 0 && warnings.length === 0,
    missing: [...new Set(missing)].sort(),
    warnings,
  };
}

function buildState() {
  const features = discoverFeatures();
  const projectName = sourceProjectName();
  return {
    schemaVersion,
    sourceProject: {
      name: projectName,
      path: sourceRoot,
      isBoardProject: sourceRoot === boardRoot,
    },
    project: {
      name: projectName,
      goal: extractSummary(readText("README.md"), "AI 프로젝트 템플릿을 시각화 보드로 연결한다."),
    },
    structure: structureState(features),
    currentStage: currentStage(features),
    updatedAt: new Date().toISOString(),
    documents: coreDocumentPaths.map(coreDocument),
    activity: recentActivity(),
    features,
  };
}

const state = buildState();
writeJson(".control-board/state.json", state);
writeJson("src/board-state.json", state);
console.log(
  `Synced ${state.documents.length} core docs and ${state.features.length} feature specs from ${state.sourceProject.name}.`,
);
