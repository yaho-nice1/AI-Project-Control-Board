const STORAGE_KEY = "ai-workflow-control-board:v2";
const STATE_FILE_PATHS = ["board-state.json", "../.control-board/state.json"];

const boardData = {
  project: {
    name: "AI Project Control Board",
    subtitle: "AI Coding Workflow",
    goal: "AI 프로젝트 템플릿을 비개발자도 검토하고 진행할 수 있는 시각화 보드로 전환한다.",
    version: "v0.8.6",
    feature: "ai-workflow-control-board",
    allowedFiles: [
      "AGENTS.md",
      "README.md",
      "docs/",
      "specs/ai-workflow-control-board/",
      "adr/",
      "scripts/",
      "src/",
      "tests/",
      ".gitignore",
    ],
    reportFormat: [
      "변경한 파일",
      "실행한 테스트 또는 검증",
      "남은 위험 요소",
      "필요한 후속 작업",
    ],
  },
  stages: [
    { id: "orient", label: "기준 확인", source: "AGENTS.md", status: "done" },
    { id: "spec", label: "요구사항", source: "specs/ai-workflow-control-board/spec.md", status: "active" },
    { id: "plan", label: "계획", source: "specs/ai-workflow-control-board/plan.md", status: "review" },
    { id: "tasks", label: "작업", source: "specs/ai-workflow-control-board/tasks.md", status: "review" },
    { id: "prompt", label: "AI 작업 요청", source: "AGENTS.md + specs/ai-workflow-control-board/plan.md", status: "active" },
    { id: "tests", label: "테스트", source: "specs/ai-workflow-control-board/acceptance-tests.md", status: "review" },
    { id: "changelog", label: "변경 기록", source: "specs/ai-workflow-control-board/change-log.md", status: "review" },
    { id: "decision", label: "결정 기록", source: "adr/0002-feature-scoped-specs.md", status: "done" },
  ],
  documents: [
    {
      key: "home",
      title: "홈",
      path: "requirements-home",
      body: "현재 프로젝트 진행률, 생성된 문서, 검토할 작업을 한 화면에서 확인한다.",
    },
    {
      key: "agents",
      title: "AGENTS.md",
      path: "AGENTS.md",
      body: "AI coding agent가 작업 전 확인해야 하는 규칙, 금지 사항, 완료 보고 형식을 정의한다.",
    },
    {
      key: "architecture",
      title: "architecture.md",
      path: "docs/architecture.md",
      body: "정적 웹앱, localStorage, 템플릿 문서와 보드 데이터의 연결 구조를 설명한다.",
    },
    {
      key: "coding",
      title: "coding-rules.md",
      path: "docs/coding-rules.md",
      body: "UI 구현, 네이밍, 리뷰 기준, 템플릿 문구 일치 규칙을 정의한다.",
    },
    {
      key: "data",
      title: "data-contracts.md",
      path: "docs/data-contracts.md",
      body: "WorkflowStage, TemplateDocument, ChecklistItem, QualityRule의 데이터 계약을 정의한다.",
    },
    {
      key: "testing",
      title: "testing-guide.md",
      path: "docs/testing-guide.md",
      body: "변경 유형별 필수 테스트와 실패 시 처리 방식을 정의한다.",
    },
  ],
  checks: [
    { id: "check-requirements-scope", label: "요구사항의 포함/제외 범위를 확인했다" },
    { id: "check-docs-linked", label: "생성된 문서가 실제 템플릿 파일과 연결돼 있다" },
    { id: "check-impact-reviewed", label: "데이터 계약과 테스트 영향 여부를 검토했다" },
    { id: "check-agent-prompt", label: "AI coding agent 지시문에 완료 기준을 포함했다" },
  ],
  activity: {
    focusFeature: null,
    recentFiles: [],
  },
  kanban: [
    {
      column: "검토 필요",
      count: 2,
      cards: [
        {
          title: "AGENTS 규칙 정리",
          description: "작업 전 승인, 검증, 완료 보고 형식을 비개발자 문구로 정리한다.",
          document: "AGENTS.md",
        },
        {
          title: "데이터 계약 확인",
          description: "WorkflowStage와 체크리스트 저장 방식이 화면 흐름과 맞는지 확인한다.",
          document: "data-contracts.md",
        },
      ],
    },
    {
      column: "진행 중",
      count: 1,
      cards: [
        {
          title: "테스트 전략 초안",
          description: "자동 테스트와 브라우저 수동 검증 기준을 정리한다.",
          document: "testing-guide.md",
          status: "WRITING",
        },
      ],
    },
    { column: "승인됨", count: 0, cards: [] },
    {
      column: "막힘",
      count: 1,
      cards: [
        {
          title: "DB 스키마 영향 확인",
          description: "현재 변경은 저장 구조 변경 없이 진행 가능한지 최종 판단이 필요하다.",
          document: "architecture.md",
          warning: true,
        },
      ],
    },
  ],
  features: [
    {
      order: 3,
      name: "Workflow Visualization",
      path: "specs/workflow-visualization/",
      risk: "High",
      status: "검토 필요",
      taskProgress: "2/10 완료",
      progress: 15,
      spec: "왼쪽 큰 탭으로 요구사항, 계획, 작업, 테스트, 로그, ADR 화면을 전환한다.",
      plan: "정적 앱 구조를 유지하면서 화면별 렌더링 함수를 분리한다.",
      docs: [
        { name: "spec.md", tone: "review" },
        { name: "plan.md", tone: "neutral" },
        { name: "tasks.md", tone: "neutral" },
        { name: "acceptance-tests.md", tone: "review" },
        { name: "change-log.md", tone: "neutral" },
      ],
      nextAction: "작업 화면과 테스트 화면을 연결한다",
      note: "화면 흐름 변경 후 acceptance-tests.md 기준 재확인 필요",
    },
    {
      order: 2,
      name: "Generated Docs Preview",
      path: "specs/generated-docs-preview/",
      risk: "Medium",
      status: "진행 중",
      taskProgress: "5/8 완료",
      progress: 45,
      spec: "요구사항 홈의 작은 탭에서 AGENTS.md와 docs 문서를 마크다운처럼 읽게 한다.",
      plan: "파일 경로는 보조 메타데이터로 두고 문서 목적과 검토 질문을 먼저 보여준다.",
      docs: [
        { name: "spec.md", tone: "neutral" },
        { name: "plan.md", tone: "neutral" },
        { name: "tasks.md", tone: "neutral" },
        { name: "acceptance-tests.md", tone: "neutral" },
        { name: "change-log.md", tone: "neutral" },
      ],
      nextAction: "문서 미리보기 내용을 실제 문서와 더 촘촘히 맞춘다",
      note: "data-contracts.md 검토 후 문서 표시 기준 확정",
    },
    {
      order: 4,
      name: "Validation & Handoff",
      path: "specs/validation-and-handoff/",
      risk: "Low",
      status: "완료",
      taskProgress: "4/4 완료",
      progress: 100,
      spec: "테스트 기준, 변경 기록, ADR을 최신순으로 확인하고 Codex 작업 전달을 준비한다.",
      plan: "수동 검증 결과와 변경 로그를 한 화면에서 읽고 다음 AI 작업 요청으로 연결한다.",
      docs: [
        { name: "spec.md", tone: "done" },
        { name: "plan.md", tone: "done" },
        { name: "tasks.md", tone: "done" },
        { name: "acceptance-tests.md", tone: "done" },
        { name: "change-log.md", tone: "done" },
      ],
      nextAction: "모든 수용 기준 통과",
      note: "",
    },
  ],
  tasks: [
    {
      id: "connect-template-docs",
      name: "템플릿 문서 연결",
      status: "완료",
      feature: "Workflow Visualization",
      criteria: "모든 주요 단계가 실제 템플릿 파일 경로와 연결되어야 한다.",
      items: ["AGENTS.md 연결", "spec/plan/tasks 연결", "ADR 연결"],
    },
    {
      id: "screen-rendering",
      name: "화면별 렌더링 구현",
      status: "진행중",
      feature: "Workflow Visualization",
      criteria: "왼쪽 탭 클릭 시 한 화면에 하나의 기능만 표시되어야 한다.",
      items: ["요구사항 홈 구현", "계획 화면 구현", "작업 흐름 구현", "테스트/로그/ADR 화면 구현"],
    },
    {
      id: "document-tabs",
      name: "문서 탭 구성",
      status: "완료",
      feature: "Generated Docs Preview",
      criteria: "홈과 주요 Markdown 문서를 작은 탭으로 전환할 수 있어야 한다.",
      items: ["홈 탭 유지", "AGENTS.md 탭 표시", "docs 문서 탭 표시"],
    },
    {
      id: "document-status-scroll",
      name: "문서 상태 스크롤",
      status: "진행중",
      feature: "Generated Docs Preview",
      criteria: "문서 생성 현황의 모든 문서가 기존 row UI 안에서 스크롤로 보여야 한다.",
      items: ["문서 row 1열 유지", "전체 문서 렌더링", "compact 영역 스크롤"],
    },
    {
      id: "browser-validation",
      name: "브라우저 검증",
      status: "대기중",
      feature: "Validation & Handoff",
      criteria: "로컬 서버에서 주요 화면 전환과 체크리스트 저장이 확인되어야 한다.",
      items: ["run_tests.sh 실행", "화면 전환 확인", "체크 상태 유지 확인"],
    },
    {
      id: "adr-and-log",
      name: "ADR 및 로그 기록",
      status: "완료",
      feature: "Validation & Handoff",
      criteria: "중요한 구조 결정과 작업 후 변경 기록이 실제 문서에 남아야 한다.",
      items: ["ADR-0002 기록", "제품 change-log 갱신", "기능별 change-log 분리"],
    },
  ],
  tests: [
    {
      name: "Smoke Test",
      content: "기본 파일 구조, app.js 구문, 템플릿 경로 참조를 확인한다.",
      result: "Passed",
      time: "방금",
      document: "tests/smoke.js",
    },
    {
      name: "브라우저 화면 전환",
      content: "요구사항, 계획, 작업, 테스트, 로그, ADR 탭이 각각 전용 화면을 렌더링하는지 확인한다.",
      result: "Needs Review",
      time: "수동 검증 필요",
      document: "src/index.html",
    },
    {
      name: "체크리스트 저장",
      content: "요구사항 체크리스트 상태가 새로고침 후에도 유지되는지 확인한다.",
      result: "Not Run",
      time: "수동 검증 예정",
      document: "src/app.js",
    },
  ],
  logs: [
    {
      date: "2026-06-03",
      version: "v0.8.6",
      files: ["src/index.html", "src/app.js", "src/styles.css"],
      summary: "홈 화면을 완료/현재/다음 단계와 문서 생성 현황 중심으로 재구성하고 왼쪽 내비게이션을 아이콘 rail로 단순화했다.",
      validation: "run_tests.sh와 브라우저 화면 검증으로 확인한다.",
      risk: "새로고침은 현재 페이지 reload 동작이며 실제 문서 재생성 기능은 후속 범위다.",
    },
    {
      date: "2026-06-03",
      version: "v0.8.5",
      files: ["src/app.js", "src/styles.css"],
      summary: "작업 화면의 태스크 맵 노드를 더 작게 줄이고 긴 설명은 상세 리스트로 분리했다.",
      validation: "run_tests.sh와 브라우저 화면 검증으로 확인한다.",
      risk: "노드 클릭으로 상세 내용을 띄우는 상호작용은 아직 후속 범위다.",
    },
    {
      date: "2026-06-03",
      version: "v0.8.4",
      files: ["src/app.js", "src/styles.css"],
      summary: "작업 화면을 기능별 태스크 맵으로 바꾸고 루트, 기능, 작업 노드를 선으로 연결했다.",
      validation: "run_tests.sh와 로컬 화면 검증으로 확인한다.",
      risk: "태스크 노드 클릭으로 상세를 전환하는 상호작용은 아직 후속 범위다.",
    },
    {
      date: "2026-06-03",
      version: "v0.8.3",
      files: ["src/styles.css", "src/app.js"],
      summary: "외부 UI 프레임워크 없이 왼쪽 단계 탭, 문서 탭, 카드, 기록 화면의 시각 위계를 정리했다.",
      validation: "run_tests.sh와 로컬 화면 검증으로 확인한다.",
      risk: "실제 Markdown 직접 저장과 동적 프로젝트 상태 파일은 아직 후속 범위다.",
    },
    {
      date: "2026-06-02",
      version: "v0.4",
      files: ["src/index.html", "src/styles.css", "src/app.js"],
      summary: "Stitch 3차 디자인을 참고해 화면별 전용 워크스페이스 구조로 재설계했다.",
      validation: "run_tests.sh와 브라우저 수동 검증으로 확인한다.",
      risk: "실제 Markdown 직접 저장은 아직 후속 범위다.",
    },
    {
      date: "2026-06-02",
      version: "v0.3",
      files: ["src/styles.css"],
      summary: "오프화이트 문서형 스타일과 세이지 그린 디자인 토큰을 적용했다.",
      validation: "정적 서버 응답과 자동 테스트를 확인했다.",
      risk: "CSS 중심 적용이라 정보 구조 개선이 추가로 필요했다.",
    },
  ],
  decisions: [
    {
      code: "ADR-0002",
      status: "Accepted",
      source: "adr/0002-feature-scoped-specs.md",
      title: "기능별 spec 폴더 사용",
      date: "2026-06-03",
      context: "기능 계획 화면이 실제 기능 단위를 보여주기 시작하면서 제품 전체 spec 하나로는 작업 범위와 문서 경로를 명확히 연결하기 어려웠다.",
      decision: "제품 전체 기준은 specs/ai-workflow-control-board/에 두고, 개별 기능은 specs/<feature-name>/ 아래의 5개 문서 세트로 관리한다.",
      consequences: ["기능 카드와 실제 문서 경로가 1:1로 연결", "기능별 변경 로그와 수용 기준 추적 가능", "기능이 늘수록 문서 수 증가"],
      alternatives: ["제품 전체 spec 하나에 계속 누적", "UI 내부 데이터로만 기능 상태 관리", "docs/ 아래에 기능별 계획 문서 추가"],
    },
    {
      code: "ADR-0001",
      status: "Accepted",
      source: "adr/0001-local-first-control-board.md",
      title: "로컬 우선 정적 보드 사용",
      date: "2026-06-02",
      context: "비개발자가 설치나 서버 설정 없이 AI 템플릿 흐름을 확인할 수 있어야 한다.",
      decision: "초기 버전은 빌드 도구와 백엔드 없는 정적 웹앱으로 만든다.",
      consequences: ["브라우저에서 바로 실행 가능", "localStorage로 진행 상태 저장", "실제 Markdown 저장은 후속 범위"],
      alternatives: ["Next.js 기반 대시보드", "Electron 앱", "GitHub API 연동 웹 서비스"],
    },
  ],
};

const navItems = [
  { key: "requirements", label: "요구사항", icon: "file" },
  { key: "plan", label: "계획", icon: "layout" },
  { key: "tasks", label: "작업", icon: "map" },
  { key: "tests", label: "테스트", icon: "test" },
  { key: "logs", label: "변경 기록", icon: "history" },
  { key: "decisions", label: "결정 기록", icon: "decision" },
];

const state = {
  screen: "requirements",
  documentKey: "home",
  selectedTaskId: null,
  expandedTaskGroups: {},
  pages: {
    tests: 0,
    logs: 0,
    decisions: 0,
  },
  checks: readStoredChecks(),
};

const PAGE_SIZE = 5;

function readStoredChecks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function storeChecks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checks));
  } catch (error) {
    showToast("브라우저 저장소에 진행 상태를 저장하지 못했습니다.");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function progressSummary() {
  const total = boardData.checks.length;
  const done = boardData.checks.filter((check) => state.checks[check.id]).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

function currentDocument() {
  return boardData.documents.find((document) => document.key === state.documentKey) || boardData.documents[0];
}

function currentNavItem() {
  return navItems.find((item) => item.key === state.screen) || navItems[0];
}

function selectedTask() {
  return boardData.tasks.find((task) => task.id === state.selectedTaskId);
}

function documentToneFromStatus(status) {
  const tones = {
    done: "done",
    review: "review",
    waiting: "neutral",
    missing: "review",
  };
  return tones[status] || "neutral";
}

function featureStatusFromState(status) {
  const labels = {
    active: "진행 중",
    review: "검토 필요",
    done: "완료",
    blocked: "막힘",
    ready: "대기 중",
  };
  return labels[status] || status;
}

function riskFromStatus(status) {
  if (status === "review" || status === "blocked") {
    return "High";
  }
  if (status === "active") {
    return "Medium";
  }
  return "Low";
}

function featureProgressFromState(feature) {
  const documents = Array.isArray(feature.documents) ? feature.documents : [];
  const tasks = Array.isArray(feature.tasks) ? feature.tasks : [];
  const documentDone = documents.filter((document) => document.status === "done").length;
  const taskDone = tasks.filter((task) => task.status === "done").length;
  const total = documents.length + tasks.length;
  if (!total) {
    return 0;
  }
  return Math.round(((documentDone + taskDone) / total) * 100);
}

function buildKanbanFromBoardState(boardState) {
  const columns = [
    { column: "검토 필요", cards: [] },
    { column: "진행 중", cards: [] },
    { column: "승인됨", cards: [] },
    { column: "막힘", cards: [] },
  ];
  const columnByFeatureStatus = {
    review: "검토 필요",
    active: "진행 중",
    ready: "진행 중",
    done: "승인됨",
    blocked: "막힘",
  };
  const columnMap = new Map(columns.map((column) => [column.column, column]));

  boardState.features.forEach((feature) => {
    const documents = Array.isArray(feature.documents) ? feature.documents : [];
    const tasks = Array.isArray(feature.tasks) ? feature.tasks : [];
    const doneDocuments = documents.filter((document) => document.status === "done").length;
    const doneTasks = tasks.filter((task) => task.status === "done").length;
    const targetColumn = columnMap.get(columnByFeatureStatus[feature.status] || "검토 필요");
    targetColumn.cards.push({
      title: feature.title,
      description: feature.summary || `${feature.path} 기준 문서와 작업 상태를 확인한다.`,
      document: feature.path,
      progress: featureProgressFromState(feature),
      documentProgress: `${doneDocuments}/${documents.length} 문서`,
      taskProgress: `${doneTasks}/${tasks.length} tasks`,
      status: featureStatusFromState(feature.status),
      warning: feature.status === "blocked",
    });
  });

  return columns.map((column) => ({
    column: column.column,
    count: column.cards.length,
    cards: column.cards,
  }));
}

function taskStatusLabel(status) {
  const labels = {
    active: "진행중",
    waiting: "대기중",
    blocked: "막힘",
    done: "완료",
    review: "검토 필요",
  };
  return labels[status] || status;
}

function applyBoardStateFile(boardState) {
  if (!boardState || !Array.isArray(boardState.features)) {
    return;
  }

  if (Array.isArray(boardState.documents) && boardState.documents.length) {
    const homeDocument = boardData.documents.find((document) => document.key === "home") || {
      key: "home",
      title: "홈",
      path: "requirements-home",
      body: "현재 프로젝트 진행률, 생성된 문서, 검토할 작업을 한 화면에서 확인한다.",
    };
    boardData.documents = [
      homeDocument,
      ...boardState.documents.map((document) => ({
        key: document.key,
        title: document.title,
        path: document.path,
        body: document.body,
        content: document.content || "",
        status: document.status,
      })),
    ];

    documentStatuses.length = 0;
    documentStatuses.push(
      ...boardState.documents.map((document) => ({
        key: document.key,
        title: document.title,
        path: document.path,
        status: documentStatusLabel(document.status),
        tone: documentStatusTone(document.status),
      })),
    );
  }

  boardData.features = boardState.features.map((feature, index) => {
    const tasks = Array.isArray(feature.tasks) ? feature.tasks : [];
    const doneTasks = tasks.filter((task) => task.status === "done").length;
    const progress = featureProgressFromState(feature);
    return {
      order: index + 1,
      name: feature.title,
      path: feature.path,
      risk: riskFromStatus(feature.status),
      status: featureStatusFromState(feature.status),
      taskProgress: `${doneTasks}/${tasks.length} 완료`,
      progress,
      spec: `${feature.path} 기준 문서와 작업 상태를 동기화한다.`,
      plan: "상태 파일의 문서와 태스크 상태를 보드 화면에 반영한다.",
      docs: (feature.documents || []).map((document) => ({
        name: document.name,
        tone: documentToneFromStatus(document.status),
      })),
      nextAction: feature.status === "done" ? "모든 수용 기준 통과" : "상태 파일 기준 다음 작업 확인",
      note: "",
    };
  });

  boardData.tasks = boardState.features.flatMap((feature) =>
    (feature.tasks || []).map((task) => ({
      id: task.id,
      name: task.title,
      status: taskStatusLabel(task.status),
      feature: feature.title,
      source: task.source,
      criteria: task.criteria || "상태 파일 기준 완료 기준을 확인한다.",
      items: [task.source, `${feature.path}change-log.md 갱신`, "검증 결과 기록"],
    })),
  );

  boardData.activity = boardState.activity || {
    focusFeature: null,
    recentFiles: [],
  };
  boardData.kanban = buildKanbanFromBoardState(boardState);
}

function documentStatusLabel(status) {
  const labels = {
    done: "완료",
    review: "검토 필요",
    waiting: "대기 중",
    missing: "누락",
  };
  return labels[status] || status;
}

function documentStatusTone(status) {
  const tones = {
    done: "done",
    review: "review",
    waiting: "waiting",
    missing: "review",
  };
  return tones[status] || "waiting";
}

function paginatedItems(key, items) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = Math.min(state.pages[key] || 0, totalPages - 1);
  state.pages[key] = page;
  const start = page * PAGE_SIZE;
  return {
    items: items.slice(start, start + PAGE_SIZE),
    page,
    totalPages,
  };
}

function featureNodeId(featureName) {
  return `feature-${featureName.toLowerCase().replaceAll(" & ", "-and-").replaceAll(" ", "-")}`;
}

function kanbanColumnTone(columnName) {
  const tones = {
    "검토 필요": "review",
    "진행 중": "progress",
    "승인됨": "approved",
    "막힘": "blocked",
  };
  return tones[columnName] || "neutral";
}

function featureStatusTone(status) {
  const tones = {
    "진행 중": "progress",
    완료: "done",
    "검토 필요": "review",
    막힘: "blocked",
  };
  return tones[status] || "waiting";
}

function featureRiskTone(risk) {
  const tones = {
    Low: "low",
    Medium: "medium",
    High: "high",
  };
  return tones[risk] || "medium";
}

function featureRiskLabel(risk) {
  const labels = {
    Low: "낮음",
    Medium: "중간",
    High: "높음",
  };
  return labels[risk] || risk;
}

function iconSvg(name) {
  const icons = {
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>',
    layout: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="7" height="14"></rect><rect x="13" y="5" width="7" height="14"></rect></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18l5-5"></path><path d="M10 13l4 4"></path><path d="M14 17l5-9"></path><circle cx="5" cy="18" r="2"></circle><circle cx="10" cy="13" r="2"></circle><circle cx="14" cy="17" r="2"></circle><circle cx="19" cy="8" r="2"></circle></svg>',
    test: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3v5l-5 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-9V3"></path><path d="M8 3h8"></path><path d="M7 16h10"></path></svg>',
    history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2"></path><path d="M4 4v5h5"></path><path d="M12 7v5l3 2"></path></svg>',
    decision: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 5-8 5-8-5z"></path><path d="M4 13l8 5 8-5"></path><path d="M8 13v5"></path><path d="M16 13v5"></path></svg>',
    refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.7"></path><path d="M20 4v6h-6"></path></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v5l3 2"></path></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>',
  };
  return icons[name] || icons.file;
}

const documentStatuses = [
  { key: "agents", title: "AGENTS.md", path: "AGENTS.md", status: "완료", tone: "done" },
  { key: "docs-architecture", title: "architecture.md", path: "docs/architecture.md", status: "완료", tone: "done" },
  { key: "docs-data-contracts", title: "data-contracts.md", path: "docs/data-contracts.md", status: "검토 필요", tone: "review" },
  { key: "docs-coding-rules", title: "coding-rules.md", path: "docs/coding-rules.md", status: "완료", tone: "done" },
  { key: "docs-testing-guide", title: "testing-guide.md", path: "docs/testing-guide.md", status: "대기 중", tone: "waiting" },
];

function taskStatusClass(status) {
  if (status === "진행중" || status === "active") {
    return "active";
  }
  if (status === "대기중" || status === "waiting" || status === "blocked") {
    return "blocked";
  }
  if (status === "완료" || status === "done") {
    return "done";
  }
  if (status === "검토 필요" || status === "review") {
    return "review";
  }
  return "";
}

function taskFeatureGroups() {
  const groups = new Map(
    boardData.features.map((feature) => [
      feature.name,
      {
        name: feature.name,
        order: feature.order,
        progress: feature.progress,
        risk: feature.risk,
        summary: feature.plan,
        docs: feature.docs,
        tasks: [],
      },
    ]),
  );

  boardData.tasks.forEach((task) => {
    if (!groups.has(task.feature)) {
      groups.set(task.feature, {
        name: task.feature,
        order: groups.size + 1,
        progress: 0,
        risk: "Review",
        summary: "검증과 수동 확인 작업을 묶어 실행 준비 상태를 확인한다.",
        docs: ["acceptance-tests.md"],
        tasks: [],
      });
    }
    groups.get(task.feature).tasks.push(task);
  });

  return Array.from(groups.values()).sort((a, b) => a.order - b.order);
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function relativeTime(updatedAt) {
  if (!updatedAt) {
    return "시간 없음";
  }
  const diffMs = Date.now() - new Date(updatedAt).getTime();
  if (!Number.isFinite(diffMs)) {
    return "시간 없음";
  }
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMinutes < 1) {
    return "방금 전";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}

function homeStageCards() {
  const features = [...boardData.features].sort((first, second) => first.order - second.order);
  if (!features.length) {
    return [
      { label: "완료 단계", title: "기능 없음", percent: 0, tone: "done" },
      { label: "현재 단계", title: "동기화 필요", percent: 0, tone: "active" },
      { label: "다음 단계", title: "대기 중", percent: 0, tone: "next" },
    ];
  }

  const doneFeatures = features.filter((feature) => feature.status === "완료");
  const currentIndex = features.findIndex((feature) => feature.status !== "완료");
  const currentFeature = currentIndex >= 0 ? features[currentIndex] : features[features.length - 1];
  const nextFeature = currentIndex >= 0 ? features[currentIndex + 1] : null;

  return [
    {
      label: "완료 단계",
      title: `${doneFeatures.length}/${features.length} 기능 완료`,
      percent: clampPercent((doneFeatures.length / features.length) * 100),
      tone: "done",
    },
    {
      label: currentIndex >= 0 ? "현재 단계" : "현재 단계",
      title: currentIndex >= 0 ? currentFeature.name : "전체 기능 완료",
      percent: clampPercent(currentIndex >= 0 ? currentFeature.progress : 100),
      tone: "active",
    },
    {
      label: "다음 단계",
      title: nextFeature ? nextFeature.name : "대기 중인 다음 기능 없음",
      percent: clampPercent(nextFeature ? nextFeature.progress : 100),
      tone: "next",
    },
  ];
}

function render() {
  document.getElementById("workspaceTitle").textContent = currentNavItem().label;
  document.getElementById("projectName").textContent = boardData.project.subtitle;

  renderPrimaryNav();
  renderDocumentTabs();
  renderScreen();
}

function renderPrimaryNav() {
  const nav = document.getElementById("stageNav");
  nav.innerHTML = navItems
    .map(
      (item) => `
        <button type="button" class="${item.key === state.screen ? "active" : ""}" data-screen="${escapeHtml(item.key)}" title="${escapeHtml(item.label)}">
          <span class="nav-icon">${iconSvg(item.icon)}</span>
          <span>${escapeHtml(item.label)}</span>
        </button>
      `,
    )
    .join("");

  nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = button.dataset.screen;
      state.documentKey = "home";
      render();
    });
  });
}

function renderDocumentTabs() {
  const tabs = document.getElementById("documentTabs");
  const showDocs = state.screen === "requirements" || state.screen === "plan" || state.screen === "tasks";
  if (!showDocs) {
    tabs.innerHTML = "";
    return;
  }

  tabs.innerHTML = boardData.documents
    .map(
      (document) => `
        <button type="button" class="${document.key === state.documentKey ? "active" : ""}" data-document-key="${escapeHtml(document.key)}">
          ${escapeHtml(document.title)}
        </button>
      `,
    )
    .join("");

  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.documentKey = button.dataset.documentKey;
      render();
    });
  });
}

function renderScreen() {
  const content = document.getElementById("mainContent");
  if (state.screen === "requirements") {
    content.innerHTML = state.documentKey === "home" ? renderRequirementsHome() : renderMarkdownPreview();
  } else if (state.screen === "plan") {
    content.innerHTML = state.documentKey === "home" ? renderPlan() : renderMarkdownPreview();
  } else if (state.screen === "tasks") {
    content.innerHTML = state.documentKey === "home" ? renderTasks() : renderMarkdownPreview();
  } else if (state.screen === "tests") {
    content.innerHTML = renderTests();
  } else if (state.screen === "logs") {
    content.innerHTML = renderLogs();
  } else {
    content.innerHTML = renderDecisions();
  }

  content.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.addEventListener("change", () => {
      state.checks[input.dataset.checkId] = input.checked;
      storeChecks();
      render();
    });
  });

  content.querySelectorAll("[data-task-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTaskId = button.dataset.taskId;
      render();
    });
  });

  content.querySelectorAll("[data-task-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const groupId = button.dataset.taskGroup;
      state.expandedTaskGroups[groupId] = !state.expandedTaskGroups[groupId];
      render();
    });
  });

  content.querySelectorAll("[data-home-document-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "requirements";
      state.documentKey = button.dataset.homeDocumentKey;
      render();
    });
  });

  content.querySelectorAll("[data-close-task-modal]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.classList.contains("task-modal-backdrop") && event.target !== button) {
        return;
      }
      state.selectedTaskId = null;
      render();
    });
  });

  content.querySelectorAll("[data-page-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.pageKey;
      const direction = Number(button.dataset.pageDirection);
      state.pages[key] = Math.max(0, (state.pages[key] || 0) + direction);
      render();
    });
  });

  drawTaskMapLines();
}

function renderRequirementsHome() {
  const stageCards = homeStageCards();
  return `
    <section class="page requirements-page">
      <div class="home-summary-strip">
        <div class="home-stage-compact">
          ${stageCards
            .map(
              (stage) => `
                <article class="home-stage-chip ${escapeHtml(stage.tone)}">
                  <span>${escapeHtml(stage.label)}</span>
                  <strong>${escapeHtml(stage.title)}</strong>
                  <em>${stage.percent}%</em>
                  <div class="stage-progress-bar" aria-hidden="true">
                    <i style="width: ${stage.percent}%"></i>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>

        <article class="home-mini-panel recent-mini">
          <header>
            <h3>최근 수정</h3>
            <span>${escapeHtml(boardData.activity.focusFeature ? boardData.activity.focusFeature.title : "전체")}</span>
          </header>
          <div class="recent-file-list">
            ${renderRecentFiles()}
          </div>
        </article>

        <article class="home-mini-panel document-mini">
          <header>
            <h3>문서</h3>
            <span>${documentStatuses.filter((document) => document.tone === "done").length}/${documentStatuses.length}</span>
          </header>
          <div class="document-status-list compact">
            ${documentStatuses.map((document) => renderDocumentStatusRow(document)).join("")}
          </div>
        </article>
      </div>

      <section class="home-kanban-main" aria-label="메인 칸반 보드">
        <header>
          <h2>작업 보드</h2>
          <span>현재 요구사항 단계의 주요 작업 흐름</span>
        </header>
        <div class="kanban-board">
          ${boardData.kanban
            .map(
              (column) => `
                <section class="kanban-column ${kanbanColumnTone(column.column)}">
                  <header>
                    <h3><span class="kanban-title-pill">${escapeHtml(column.column)}</span></h3>
                    <span>${column.count}</span>
                  </header>
                  ${
                    column.cards.length
                      ? column.cards
                          .map(
                            (card) => `
                        <article class="task-card ${card.warning ? "warning" : ""}">
                          <h4>${escapeHtml(card.title)}</h4>
                          <p>${escapeHtml(card.description)}</p>
                          ${
                            typeof card.progress === "number"
                              ? `
                                <div class="card-progress" aria-label="기능 진행률">
                                  <i style="width: ${clampPercent(card.progress)}%"></i>
                                  <span>${clampPercent(card.progress)}%</span>
                                </div>
                              `
                              : ""
                          }
                          <div class="card-meta">
                            <code>${escapeHtml(card.document)}</code>
                            ${card.documentProgress ? `<strong>${escapeHtml(card.documentProgress)}</strong>` : ""}
                            ${card.taskProgress ? `<strong>${escapeHtml(card.taskProgress)}</strong>` : ""}
                            ${card.status ? `<strong>${escapeHtml(card.status)}</strong>` : ""}
                          </div>
                        </article>
                      `,
                          )
                          .join("")
                      : `<div class="empty-state">대기 중인 작업 없음</div>`
                  }
                </section>
              `,
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderRecentFiles() {
  const recentFiles = boardData.activity.recentFiles || [];
  if (!recentFiles.length) {
    return `<span class="recent-empty">아직 동기화된 수정 내역이 없습니다.</span>`;
  }

  return recentFiles
    .slice(0, 5)
    .map(
      (file) => `
        <span class="recent-file-item" title="${escapeHtml(file.path)}">
          <strong>${escapeHtml(file.label || file.path)}</strong>
          <em>${escapeHtml(relativeTime(file.updatedAt))}</em>
        </span>
      `,
    )
    .join("");
}

function renderDocumentStatusRow(document) {
  const iconName = document.tone === "done" ? "check" : document.tone === "review" ? "alert" : "clock";
  const documentKey = document.key || "";
  return `
    <button type="button" class="document-status-row ${escapeHtml(document.tone)}" data-home-document-key="${escapeHtml(documentKey)}" title="${escapeHtml(document.path || document.title)}">
      <span class="status-icon">${iconSvg(iconName)}</span>
      <strong>${escapeHtml(document.title)}</strong>
      <em>${escapeHtml(document.status)}</em>
    </button>
  `;
}

function renderMarkdownPreview() {
  const document = currentDocument();
  const markdown = document.content || `# ${document.title}\n\n${document.body}`;
  return `
    <section class="page markdown-page">
      <p class="eyebrow">Project Document</p>
      <h2>${escapeHtml(document.title)}</h2>
      <p class="doc-path">${escapeHtml(document.path)}</p>
      <article class="markdown-preview">
        ${renderMarkdown(markdown)}
      </article>
    </section>
  `;
}

function renderMarkdown(markdown) {
  const lines = String(markdown || "").split("\n");
  const html = [];
  let inList = false;
  let inCode = false;
  let codeLines = [];
  let inTable = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
    }
  };

  const inline = (value) =>
    escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        closeList();
        closeTable();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (!line.trim()) {
      closeList();
      closeTable();
      return;
    }

    const tableCells = line.trim().startsWith("|") ? line.trim().split("|").slice(1, -1).map((cell) => cell.trim()) : null;
    const nextLine = lines[index + 1] || "";
    const isHeaderSeparator = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
    if (isHeaderSeparator) {
      return;
    }
    if (tableCells && /^\|?\s*:?-{3,}:?/.test(nextLine.trim())) {
      closeList();
      closeTable();
      html.push(`<table><thead><tr>${tableCells.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>`);
      inTable = true;
      return;
    }
    if (tableCells && inTable) {
      html.push(`<tr>${tableCells.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`);
      return;
    }
    closeTable();

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      return;
    }

    const taskItem = line.match(/^[-*]\s+\[( |x|X)\]\s+(.+)$/);
    if (taskItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      const checked = taskItem[1].toLowerCase() === "x";
      html.push(`<li class="markdown-task ${checked ? "done" : ""}"><span>${checked ? "✓" : ""}</span>${inline(taskItem[2])}</li>`);
      return;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inline(listItem[1])}</li>`);
      return;
    }

    closeList();
    html.push(`<p>${inline(line)}</p>`);
  });

  closeList();
  closeTable();
  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return html.join("");
}

function renderPlan() {
  const sortedFeatures = [...boardData.features].sort((first, second) => first.order - second.order);
  return `
    <section class="page plan-page">
      <div class="page-heading">
        <h2>기능 계획</h2>
      </div>
      <div class="feature-list">
        ${sortedFeatures
          .map(
            (feature, index) => `
              <article class="feature-block ${featureStatusTone(feature.status)}">
                <div class="feature-header">
                  <div>
                    <div class="feature-title-row">
                      <span class="feature-status-pill ${featureStatusTone(feature.status)}">${escapeHtml(feature.status)}</span>
                      <span class="feature-path">${escapeHtml(feature.path)}</span>
                    </div>
                    <h3>${escapeHtml(feature.name)}</h3>
                    <p>${escapeHtml(feature.spec)}</p>
                  </div>
                  <span class="risk-pill ${featureRiskTone(feature.risk)}">위험도: ${escapeHtml(featureRiskLabel(feature.risk))}</span>
                </div>
                <div class="feature-doc-pills">
                  ${feature.docs.map((doc) => `<code class="${escapeHtml(doc.tone)}">${escapeHtml(doc.name)}</code>`).join("")}
                </div>
                ${
                  feature.note
                    ? `<p class="feature-note ${featureStatusTone(feature.status)}">${escapeHtml(feature.note)}</p>`
                    : ""
                }
                <footer>
                  <div class="feature-progress">
                    <span>작업 진행 · ${escapeHtml(feature.taskProgress)}</span>
                    <div><i style="width: ${feature.progress}%"></i></div>
                    <em>${feature.progress}%</em>
                  </div>
                  <button type="button" class="feature-next-action ${featureStatusTone(feature.status)}">${escapeHtml(feature.nextAction)}</button>
                </footer>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTasks() {
  const groups = taskFeatureGroups();
  const task = selectedTask();
  return `
    <section class="page tasks-page">
      <div class="page-heading">
        <h2>작업 흐름 및 실행</h2>
        <p>기능에서 태스크로 이어지는 관계를 보면서 작업 범위와 완료 기준을 확인하세요.</p>
      </div>
      <div class="task-map" aria-label="기능별 태스크 맵">
        <svg class="task-map-lines" aria-hidden="true"></svg>
        <div class="task-map-root" data-node-id="root">
          <span>ROOT</span>
          <strong>AI Project Control Board</strong>
          <small>spec → plan → tasks</small>
        </div>
        <div class="task-map-branches">
          ${groups
            .map(
              (group) => {
                const groupId = featureNodeId(group.name);
                const isExpanded = Boolean(state.expandedTaskGroups[groupId]);
                const doneCount = group.tasks.filter((item) => item.status === "완료").length;
                return `
                <section class="task-map-group ${isExpanded ? "expanded" : "collapsed"}">
                  <button type="button" class="task-map-feature" data-node-id="${escapeHtml(groupId)}" data-task-group="${escapeHtml(groupId)}" aria-expanded="${isExpanded}">
                    <span>${isExpanded ? "펼쳐짐" : "접힘"}</span>
                    <strong>${escapeHtml(group.name)}</strong>
                    <small>${doneCount}/${group.tasks.length} tasks · ${isExpanded ? "클릭해 접기" : "클릭해 보기"}</small>
                  </button>
                  ${
                    isExpanded
                      ? `
                        <div class="task-map-leaves">
                          ${
                            group.tasks.length
                              ? group.tasks
                                  .map(
                                    (task) => `
                                      <button type="button" class="task-map-leaf ${taskStatusClass(task.status)}" data-node-id="task-${escapeHtml(task.id)}" data-task-id="${escapeHtml(task.id)}">
                                        <span>${escapeHtml(task.status)}</span>
                                        <strong>${escapeHtml(task.name)}</strong>
                                      </button>
                                    `,
                                  )
                                  .join("")
                              : `
                                <article class="task-map-leaf empty">
                                  <span>대기중</span>
                                  <strong>태스크 대기</strong>
                                </article>
                              `
                          }
                        </div>
                      `
                      : `
                        <div class="task-map-collapsed-summary">
                          <span>${group.tasks.length ? `${group.tasks.length}개 task 숨김` : "task 없음"}</span>
                        </div>
                      `
                  }
                </section>
              `;
              },
            )
            .join("")}
        </div>
      </div>
      ${
        task
          ? `
            <div class="task-modal-backdrop" role="presentation" data-close-task-modal>
              <article class="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
                <header>
                  <div>
                    <span class="task-modal-status ${taskStatusClass(task.status)}">${escapeHtml(task.status)}</span>
                    <h3 id="task-modal-title">${escapeHtml(task.name)}</h3>
                  </div>
                  <button type="button" class="icon-button" aria-label="작업 상세 닫기" data-close-task-modal>${iconSvg("close")}</button>
                </header>
                <p>관련 기능: <strong>${escapeHtml(task.feature)}</strong></p>
                <p class="task-modal-path">${escapeHtml(`specs/${task.feature.toLowerCase().replaceAll(" & ", "-and-").replaceAll(" ", "-")}/tasks.md`)}</p>
                <div class="criteria">
                  <strong>Completion Criteria</strong>
                  <p>${escapeHtml(task.criteria)}</p>
                </div>
                <ul>${task.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
            </div>
          `
          : ""
      }
    </section>
  `;
}

function drawTaskMapLines() {
  const map = document.querySelector(".task-map");
  const svg = document.querySelector(".task-map-lines");
  if (!map || !svg) {
    return;
  }

  const mapRect = map.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);
  svg.innerHTML = "";

  const point = (element, side) => {
    const rect = element.getBoundingClientRect();
    const x = side === "left" ? rect.left - mapRect.left : rect.right - mapRect.left;
    const y = rect.top - mapRect.top + rect.height / 2;
    return { x, y };
  };

  const addPath = (from, to) => {
    const distance = Math.max(34, Math.min(92, (to.x - from.x) * 0.46));
    const d = `M ${from.x} ${from.y} C ${from.x + distance} ${from.y}, ${to.x - distance} ${to.y}, ${to.x} ${to.y}`;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  };

  const root = map.querySelector('[data-node-id="root"]');
  const features = [...map.querySelectorAll(".task-map-feature[data-node-id]")];
  if (!root || !features.length) {
    return;
  }

  features.forEach((feature) => {
    addPath(point(root, "right"), point(feature, "left"));
    const group = feature.closest(".task-map-group");
    if (!group || group.classList.contains("collapsed")) {
      return;
    }
    const leaves = [...group.querySelectorAll(".task-map-leaf[data-node-id]")];
    leaves.forEach((leaf) => addPath(point(feature, "right"), point(leaf, "left")));
  });
}

function renderTests() {
  const page = paginatedItems("tests", boardData.tests);
  return `
    <section class="page history-page">
      <div class="history-heading">
        <div>
          <h2>테스트 기록</h2>
          <p>최신순으로 테스트 내용과 결과를 확인합니다.</p>
        </div>
      </div>
      <div class="record-list">
        ${page.items.map((test) => renderTestCard(test)).join("")}
      </div>
      ${renderPagination("tests", page)}
    </section>
  `;
}

function renderLogs() {
  const page = paginatedItems("logs", boardData.logs);
  return `
    <section class="page history-page">
      <div class="page-heading">
        <h2>변경 기록</h2>
        <p>무엇을 왜 바꿨고 어떻게 검증했는지 최신순으로 확인합니다.</p>
      </div>
      <div class="record-list">
        ${page.items.map((log) => renderLogCard(log)).join("")}
      </div>
      ${renderPagination("logs", page)}
    </section>
  `;
}

function renderDecisions() {
  const page = paginatedItems("decisions", boardData.decisions);
  return `
    <section class="page decision-page">
      <div class="page-heading">
        <h2>Architecture Decision Records</h2>
        <p>중요한 기술적, 구조적 결정을 최신순으로 검토합니다.</p>
      </div>
      <div class="record-list">
        ${page.items.map((decision) => renderDecisionCard(decision)).join("")}
      </div>
      ${renderPagination("decisions", page)}
    </section>
  `;
}

function renderPagination(key, page) {
  if (page.totalPages <= 1) {
    return "";
  }
  return `
    <nav class="record-pagination" aria-label="기록 페이지 이동">
      <button type="button" data-page-key="${escapeHtml(key)}" data-page-direction="-1" ${page.page === 0 ? "disabled" : ""}>이전</button>
      <span>${page.page + 1} / ${page.totalPages}</span>
      <button type="button" data-page-key="${escapeHtml(key)}" data-page-direction="1" ${page.page >= page.totalPages - 1 ? "disabled" : ""}>다음</button>
    </nav>
  `;
}

function renderTestCard(test) {
  const statusClass = test.result.toLowerCase().replaceAll(" ", "-");
  return `
    <article class="record-card">
      <header>
        <div class="record-meta">
          <span>TEST</span>
          <time>${escapeHtml(test.time)}</time>
        </div>
        <strong class="record-pill ${escapeHtml(statusClass)}">${escapeHtml(test.result)}</strong>
      </header>
      <h3>${escapeHtml(test.name)}</h3>
      <p>${escapeHtml(test.content)}</p>
      <div class="record-chips">
        <code>${escapeHtml(test.document)}</code>
      </div>
    </article>
  `;
}

function renderLogCard(log) {
  return `
    <article class="record-card">
      <header>
        <div class="record-meta">
          <span>${escapeHtml(log.version)}</span>
          <time>${escapeHtml(log.date)}</time>
        </div>
        <strong class="record-pill neutral">LOG</strong>
      </header>
      <h3>${escapeHtml(log.summary)}</h3>
      <div class="record-chips">${log.files.map((file) => `<code>${escapeHtml(file)}</code>`).join("")}</div>
      <div class="record-grid">
        <section>
          <h4>Validation</h4>
          <p>${escapeHtml(log.validation)}</p>
        </section>
        <section>
          <h4>Remaining Risks</h4>
          <p>${escapeHtml(log.risk)}</p>
        </section>
      </div>
    </article>
  `;
}

function renderDecisionCard(decision) {
  return `
    <article class="record-card decision-card">
      <header>
        <div class="record-meta">
          <span>${escapeHtml(decision.code)}</span>
          <time>${escapeHtml(decision.date)}</time>
        </div>
        <strong class="record-pill done">${escapeHtml(decision.status)}</strong>
      </header>
      <h3>${escapeHtml(decision.title)}</h3>
      <p>${escapeHtml(decision.context)}</p>
      <div class="record-summary">
        <h4>Decision</h4>
        <p>${escapeHtml(decision.decision)}</p>
      </div>
      <div class="record-grid">
        <section>
          <h4>Consequences</h4>
          <ul>${decision.consequences.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h4>Alternatives</h4>
          <ul>${decision.alternatives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </div>
    </article>
  `;
}

function renderHistoryEntry(title, content, result, time, documents) {
  const statusClass = result.toLowerCase().replaceAll(" ", "-");
  return `
    <article class="history-entry">
      <header>
        <h3>${escapeHtml(title)}</h3>
        <span class="result ${escapeHtml(statusClass)}">${escapeHtml(result)}</span>
      </header>
      <p>${escapeHtml(content)}</p>
      <footer>
        <span>${escapeHtml(time)}</span>
        ${documents.map((document) => `<code>${escapeHtml(document)}</code>`).join("")}
      </footer>
    </article>
  `;
}

function buildPrompt(stage = boardData.stages.find((item) => item.id === "tasks")) {
  return `당신은 이 저장소의 AI coding agent입니다.

작업 전 반드시 확인:
- README.md
- AGENTS.md
- docs/architecture.md
- docs/coding-rules.md
- docs/data-contracts.md
- docs/testing-guide.md
- specs/${boardData.project.feature}/spec.md
- specs/${boardData.project.feature}/plan.md

현재 작업:
- 프로젝트: ${boardData.project.name}
- 기능: ${boardData.project.feature}
- 단계: ${stage.label}
- 연결 문서: ${stage.source}

변경 가능 파일:
${boardData.project.allowedFiles.map((file) => `- ${file}`).join("\n")}

완료 보고 형식:
${boardData.project.reportFormat.map((item) => `- ${item}`).join("\n")}`;
}

function buildReportTemplate() {
  return `변경한 파일
- 

실행한 테스트 또는 검증
- 

남은 위험 요소
- 

필요한 후속 작업
- `;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    showToast("복사가 제한됐습니다. 텍스트를 직접 선택해 주세요.");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

const createDocumentButton = document.getElementById("createDocumentButton");
if (createDocumentButton) {
  createDocumentButton.addEventListener("click", () => {
    showToast("현재 화면 기준 문서 초안을 준비했습니다.");
  });
}

const copyPromptButton = document.getElementById("copyPromptButton");
if (copyPromptButton) {
  copyPromptButton.addEventListener("click", () => {
    copyText(buildPrompt(), "AI 작업 지시문을 복사했습니다.");
  });
}

const copyReportButton = document.getElementById("copyReportButton");
if (copyReportButton) {
  copyReportButton.addEventListener("click", () => {
    copyText(buildReportTemplate(), "완료 보고 형식을 복사했습니다.");
  });
}

document.getElementById("refreshButton").addEventListener("click", () => {
  window.location.reload();
});

window.addEventListener("resize", () => {
  window.requestAnimationFrame(drawTaskMapLines);
});

async function loadBoardStateFile() {
  for (const path of STATE_FILE_PATHS) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      applyBoardStateFile(await response.json());
      return;
    } catch (error) {
      // Opening index.html directly cannot fetch local state files; try next path.
    }
  }
}

async function init() {
  await loadBoardStateFile();
  render();
}

init();
