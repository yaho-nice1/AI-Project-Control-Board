# Spec

## 배경

AI 프로젝트 템플릿은 `AGENTS.md`, `docs/`, `specs/`, `adr/`, `scripts/`를 통해 AI coding agent가 안전하게 작업하도록 돕는다. 하지만 비개발자는 Markdown 문서, 파일 경로, 터미널 명령, 테스트 절차를 직접 따라가기 어렵다.

AI Workflow Control Board는 이 템플릿의 실제 문서와 절차를 시각화해, 비개발자가 요구사항을 정리하고 AI에게 작업을 맡기고 완료 기준을 검토할 수 있게 만든다.

이 폴더는 제품 전체 기준 문서다. 개별 기능 구현은 `specs/<feature-name>/` 아래에서 별도 관리한다.

## 기능 spec 목록

- `specs/workflow-visualization/`: 화면 전환, 홈 상태 요약, 칸반 보드, 작업 태스크 맵
- `specs/generated-docs-preview/`: 문서 탭, 문서 생성 현황, Markdown 미리보기, 문서 pill 표시
- `specs/validation-and-handoff/`: 테스트 기록, 변경 기록, ADR, Codex 작업 완료 보고 흐름
- `specs/document-state-sync/`: 실제 spec 폴더와 `.control-board/state.json` 기반 상태 동기화

## 요구사항

- 템플릿의 핵심 문서인 `AGENTS.md`, `docs/architecture.md`, `docs/coding-rules.md`, `docs/data-contracts.md`, `docs/testing-guide.md`를 보드에서 확인할 수 있어야 한다.
- 기능 단위 흐름은 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md` 순서를 따라야 한다.
- 새 기능은 `specs/<feature-name>/` 폴더 아래에서 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md`로 관리되어야 한다.
- 각 보드 카드는 연결된 템플릿 파일 경로, 목적, 검토 질문, 완료 조건을 보여줘야 한다.
- 비개발자가 체크리스트를 클릭해 진행 상태를 표시할 수 있어야 한다.
- 현재 단계와 관련 문서를 바탕으로 AI coding agent에게 전달할 작업 지시문을 생성해야 한다.
- 브라우저에서 바로 열 수 있어야 하며, 첫 버전은 빌드와 서버 실행을 요구하지 않는다.

## 범위

- 포함:
  - 로컬 정적 웹앱
  - 템플릿 문서 기반 워크플로우 보드
  - 문서 라이브러리
  - 체크리스트 상태 저장
  - AI 작업 지시문 생성
  - smoke test 스크립트
- 제외:
  - 실제 GitHub API 연동
  - Markdown 파일 직접 저장
  - 사용자 인증
  - 다중 사용자 실시간 협업

## 사용자 또는 downstream 영향

- 비개발자는 파일 구조를 몰라도 템플릿 흐름을 따라 기능을 진행할 수 있다.
- AI coding agent는 생성된 지시문에서 작업 전 확인 문서, Allowed Files, 완료 보고 형식을 받을 수 있다.
- 프로젝트 리더는 변경 범위, 위험, 검증 기준을 문서와 보드 양쪽에서 확인할 수 있다.

## 데이터 계약 영향

- 테이블: 없음
- 컬럼: 없음
- 키: `WorkflowStage.id`, `TemplateDocument.path`, `ChecklistItem.id`
- 허용값: 단계 상태는 `ready`, `active`, `review`, `done`만 허용한다.
