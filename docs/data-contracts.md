# 데이터 계약

## 목적

보드가 다루는 워크플로우 단계, 문서, 체크리스트, 검증 결과의 구조를 정의한다. 데이터 구조가 바뀌면 이 문서를 먼저 또는 함께 갱신한다.

## 엔티티 목록

| 엔티티 | 목적 | 소유자 | downstream |
| --- | --- | --- | --- |
| BoardProject | 한 프로젝트의 이름, 목표, 진행률을 표현한다 | 앱 | 보드 헤더, AI 지시문 |
| WorkflowStage | 요구사항, 계획, 작업, 검증 같은 진행 단계를 표현한다 | 앱 | 칸반 보드, 상세 패널 |
| TemplateDocument | 실제 템플릿 파일과 요약, 원문 내용을 연결한다 | 앱 | 문서 라이브러리, 프롬프트 |
| ChecklistItem | 사용자가 완료 여부를 표시하는 검토 항목이다 | 사용자 | 진행률, 검증 패널 |
| QualityRule | 완료 전 확인해야 하는 품질 기준이다 | 앱 | 검증 패널, change-log |
| FeatureSpec | `specs/<feature-name>/` 단위 기능 문서 묶음을 표현한다 | 앱 | 기능 계획, 작업 맵, AI 지시문 |
| DocumentState | 기능별 문서의 존재 여부와 검토 상태를 표현한다 | 앱 또는 상태 파일 | 문서 생성 현황, 기능 카드 |
| TaskState | 기능별 작업 상태와 상세 내용을 표현한다 | 앱 또는 상태 파일 | 작업 맵, 완료 보고 |
| BoardStateFile | 동적 보드 상태 파일의 최상위 구조를 표현한다 | `.control-board/state.json` | 전체 보드, Codex 작업 요청 |
| ActivityState | 최근 수정 파일과 최근 수정된 기능을 표현한다 | `.control-board/state.json` | 홈 최근 수정 패널 |
| SourceProject | 보드가 현재 읽고 있는 원본 프로젝트를 표현한다 | `.control-board/state.json` | 헤더, 외부 프로젝트 동기화 |
| StructureState | 원본 프로젝트의 템플릿 구조 검사 결과를 표현한다 | `.control-board/state.json` | 구조 경고, 외부 프로젝트 연결 |

## 필드 계약

| 엔티티 | 필드 | 타입 | nullable | 허용값 / 제약 | 설명 |
| --- | --- | --- | --- | --- | --- |
| BoardProject | name | string | no | 1자 이상 | 프로젝트 이름 |
| BoardProject | goal | string | no | 1자 이상 | 프로젝트 목적 |
| WorkflowStage | id | string | no | 고유값 | 단계 식별자 |
| WorkflowStage | title | string | no | 1자 이상 | 화면 표시 이름 |
| WorkflowStage | source | string | no | 파일 경로 | 연결된 템플릿 파일 |
| WorkflowStage | status | string | no | `ready`, `active`, `review`, `done` | 단계 상태 |
| WorkflowStage | checks | array | no | 1개 이상 | 단계별 체크리스트 |
| TemplateDocument | path | string | no | 파일 경로 | 템플릿 문서 위치 |
| TemplateDocument | purpose | string | no | 1자 이상 | 문서 목적 |
| TemplateDocument | content | string | no | Markdown 문자열 | 문서 탭에 표시할 실제 파일 원문 |
| ChecklistItem | id | string | no | 고유값 | 체크 항목 식별자 |
| ChecklistItem | label | string | no | 1자 이상 | 검토 항목 |
| QualityRule | metric | string | no | 1자 이상 | 검증 기준 이름 |
| QualityRule | expected | string | no | 1자 이상 | 기대 상태 |
| FeatureSpec | id | string | no | `kebab-case` | 기능 식별자 |
| FeatureSpec | path | string | no | `specs/<feature-name>/` | 기능 spec 폴더 경로 |
| FeatureSpec | title | string | no | 1자 이상 | 화면 표시 기능명 |
| FeatureSpec | status | string | no | `ready`, `active`, `review`, `done`, `blocked` | 기능 진행 상태 |
| FeatureSpec | documents | array | no | 5개 이상 권장 | 기능에 연결된 문서 상태 목록 |
| FeatureSpec | tasks | array | no | 0개 이상 | 기능에 연결된 작업 상태 목록 |
| DocumentState | path | string | no | 파일 경로 | 문서 파일 경로 |
| DocumentState | name | string | no | 파일명 | 화면 표시 문서명 |
| DocumentState | status | string | no | `done`, `review`, `waiting`, `missing` | 문서 상태 |
| DocumentState | required | boolean | no | true 또는 false | 필수 문서 여부 |
| DocumentState | content | string | no | Markdown 문자열 | 기능 문서의 실제 파일 원문 |
| TaskState | id | string | no | 고유값 | 작업 식별자 |
| TaskState | featureId | string | no | `FeatureSpec.id` 참조 | 연결 기능 |
| TaskState | title | string | no | 1자 이상 | 작업 제목 |
| TaskState | status | string | no | `done`, `active`, `waiting`, `blocked`, `review` | 작업 상태 |
| TaskState | source | string | no | 파일 경로 | 연결된 `tasks.md` 또는 문서 섹션 |
| TaskState | criteria | string | yes | 문자열 | 완료 기준 |
| BoardStateFile | schemaVersion | string | no | semver | 상태 파일 스키마 버전 |
| BoardStateFile | sourceProject | object | no | `SourceProject` | 현재 읽고 있는 프로젝트 |
| BoardStateFile | structure | object | no | `StructureState` | 템플릿 구조 검사 결과 |
| BoardStateFile | documents | array | no | 핵심 문서 5개 이상 | `AGENTS.md`와 주요 `docs/*.md` 문서 상태 목록 |
| BoardStateFile | currentStage | string | no | `WorkflowStage.id` 참조 | 현재 단계 |
| BoardStateFile | features | array | no | `FeatureSpec[]` | 기능 상태 목록 |
| BoardStateFile | activity | object | no | `ActivityState` | 최근 수정 내역 |
| BoardStateFile | updatedAt | string | yes | ISO 8601 | 마지막 갱신 시각 |
| ActivityState | focusFeature | object | yes | `{ id, title }` 또는 null | 최근 수정된 spec 파일 기준 기능 |
| ActivityState | recentFiles | array | no | 최신순 1개 이상 | 최근 수정 파일 목록 |
| SourceProject | name | string | no | 1자 이상 | 원본 프로젝트 이름 |
| SourceProject | path | string | no | 절대 경로 | 원본 프로젝트 경로 |
| SourceProject | isBoardProject | boolean | no | true 또는 false | 보드 자기 프로젝트 여부 |
| StructureState | valid | boolean | no | true 또는 false | 필수 템플릿 구조 충족 여부 |
| StructureState | missing | array | no | 파일 경로 목록 | 누락된 필수 파일 또는 폴더 |
| StructureState | warnings | array | no | 문자열 목록 | 권장 구조 또는 기능 문서 경고 |

## 키와 관계

- Primary key: `WorkflowStage.id`, `TemplateDocument.path`, `ChecklistItem.id`, `FeatureSpec.id`, `DocumentState.path`, `TaskState.id`
- Foreign key: `ChecklistItem.stageId`는 `WorkflowStage.id`를 참조한다.
- Foreign key: `TaskState.featureId`는 `FeatureSpec.id`를 참조한다.
- Unique key: 문서 경로는 중복될 수 없다.
- Index: 단계 순서는 `WorkflowStage.order`로 정렬한다.

## Downstream 영향

- 대시보드: 단계 상태와 체크리스트 완료율이 보드 진행률에 반영된다.
- AI 지시문: 선택한 단계와 관련 문서가 프롬프트에 포함된다.
- 리포트: `change-log.md` 초안과 완료 보고 형식에 사용된다.
- 모델 또는 파이프라인: 현재 없음.
- 문서 상태 동기화: `.control-board/state.json`이 있으면 내장 데이터보다 우선한다.
- 외부 프로젝트 연결: `scripts/board-sync.js --project <path>`는 `<path>`를 읽고 보드 프로젝트의 상태 JSON만 갱신한다.
- 외부 프로젝트 초기화: `scripts/board-init.js --project <path>`는 누락된 기본 문서만 생성하고 기존 파일은 덮어쓰지 않는다.
- 최근 수정 패널: `.control-board/state.json.activity.recentFiles`를 최신순 한 줄 목록으로 표시한다.
- 정적 서버 공개 범위가 `src/`로 제한될 때는 `.control-board/state.json`의 브라우저용 스냅샷인 `src/board-state.json`을 읽는다.
- fallback: 상태 파일이 없거나 필수 필드가 누락되면 `src/app.js`의 내장 데이터를 사용한다.

## 상태 파일 초안

```json
{
  "schemaVersion": "0.2.0",
  "sourceProject": {
    "name": "Sample Project",
    "path": "/Users/me/Documents/Sample Project",
    "isBoardProject": false
  },
  "structure": {
    "valid": true,
    "missing": [],
    "warnings": []
  },
  "currentStage": "tasks",
  "updatedAt": "2026-06-04T00:00:00+09:00",
  "documents": [
    {
      "key": "agents",
      "title": "AGENTS.md",
      "path": "AGENTS.md",
      "status": "done",
      "body": "AI coding agent가 따라야 할 작업 규칙이다.",
      "content": "# AGENTS.md\n\n## 목적\n\n...",
      "updatedAt": "2026-06-04T00:00:00.000Z"
    }
  ],
  "activity": {
    "focusFeature": {
      "id": "generated-docs-preview",
      "title": "Generated Docs Preview"
    },
    "recentFiles": [
      {
        "path": "specs/generated-docs-preview/change-log.md",
        "label": "Generated Docs Preview / change-log.md",
        "feature": {
          "id": "generated-docs-preview",
          "title": "Generated Docs Preview"
        },
        "updatedAt": "2026-06-04T00:00:00.000Z"
      }
    ]
  },
  "features": [
    {
      "id": "workflow-visualization",
      "path": "specs/workflow-visualization/",
      "title": "Workflow Visualization",
      "status": "review",
      "documents": [
        {
          "path": "specs/workflow-visualization/spec.md",
          "name": "spec.md",
          "status": "review",
          "required": true,
          "content": "# Spec\n\n## 배경\n\n..."
        }
      ],
      "tasks": [
        {
          "id": "screen-rendering",
          "featureId": "workflow-visualization",
          "title": "화면별 렌더링 구현",
          "status": "active",
          "source": "specs/workflow-visualization/tasks.md",
          "criteria": "왼쪽 탭 클릭 시 한 화면에 하나의 기능만 표시되어야 한다."
        }
      ]
    }
  ]
}
```

## 변경 절차

1. 변경 이유와 범위를 spec에 기록한다.
2. 데이터 필드 변경이 있으면 이 문서의 필드 계약을 갱신한다.
3. 화면, 프롬프트 생성기, 테스트를 함께 갱신한다.
4. `./scripts/run_tests.sh`로 계약 위반 가능성을 검증한다.
