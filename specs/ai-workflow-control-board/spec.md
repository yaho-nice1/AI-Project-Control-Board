# Spec

## 배경

AI 프로젝트 템플릿은 `AGENTS.md`, `docs/`, `specs/`, `adr/`, `scripts/`를 통해 AI coding agent가 안전하게 작업하도록 돕는다. 하지만 비개발자는 Markdown 문서, 파일 경로, 터미널 명령, 테스트 절차를 직접 따라가기 어렵다.

AI Workflow Control Board는 이 템플릿의 실제 문서와 절차를 시각화해, 비개발자가 Codex 작업 중 프로젝트 상태, 기능 진행도, 최근 수정 파일을 한눈에 확인할 수 있게 만든다.

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
- 홈 화면은 최근 수정 파일을 최신순으로 보여주고 자동 생성 상태 파일은 제외해야 한다.
- 진행률과 작업 보드는 실제 문서 상태와 `tasks.md` 체크박스 상태를 반영해야 한다.
- 브라우저에서 바로 열 수 있어야 하며, 첫 버전은 빌드와 서버 실행을 요구하지 않는다.

## 범위

- 포함:
  - 로컬 정적 웹앱
  - 템플릿 문서 기반 워크플로우 보드
  - 문서 라이브러리
  - 최근 수정 내역 표시
  - 기능별 진행률과 작업 상태 표시
  - smoke test 스크립트
- 제외:
  - 실제 GitHub API 연동
  - Markdown 파일 직접 저장
  - 사용자 인증
  - 다중 사용자 실시간 협업

## 사용자 또는 downstream 영향

- 비개발자는 파일 구조를 몰라도 Codex 작업 중 어떤 기능과 문서가 바뀌었는지 확인할 수 있다.
- AI coding agent는 실제 spec 폴더와 상태 동기화 결과를 기준으로 작업 범위를 추적할 수 있다.
- 프로젝트 리더는 변경 범위, 위험, 검증 기준을 문서와 보드 양쪽에서 확인할 수 있다.

## 데이터 계약 영향

- 테이블: 없음
- 컬럼: 없음
- 키: `WorkflowStage.id`, `TemplateDocument.path`, `ChecklistItem.id`
- 허용값: 단계 상태는 `ready`, `active`, `review`, `done`만 허용한다.
