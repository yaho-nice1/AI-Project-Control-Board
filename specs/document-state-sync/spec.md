# Spec

## 배경

현재 보드는 `src/app.js` 안의 내장 데이터로 기능, 문서, 태스크, 기록 상태를 표시한다. 하지만 실제 프로젝트 진행도를 보려면 `specs/<feature-name>/` 폴더와 각 Markdown 문서의 존재 여부, 검토 상태, 태스크 상태가 화면에 반영되어야 한다.

이 기능은 정적 시각화 보드를 실제 템플릿 문서 구조와 연결하는 첫 단계다.

## 요구사항

- 보드는 `specs/<feature-name>/` 폴더를 기능 단위로 인식해야 한다.
- 각 기능 폴더의 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md` 존재 여부를 문서 상태로 표시해야 한다.
- 문서 상태는 완료, 검토 필요, 대기 중, 누락으로 구분해야 한다.
- 태스크 상태는 기능별 `tasks.md` 또는 상태 파일에서 읽어 보드에 반영할 수 있어야 한다.
- 동적 상태는 `.control-board/state.json` 같은 명시적 상태 파일로 저장할 수 있어야 한다.
- `src/`만 정적 서버로 공개하는 환경에서는 `src/board-state.json` 스냅샷을 읽어 같은 상태를 표시할 수 있어야 한다.
- 상태 파일이 없어도 기존 정적 내장 데이터로 앱이 표시되어야 한다.
- `AGENTS.md`, `docs/architecture.md`, `docs/coding-rules.md`, `docs/data-contracts.md`, `docs/testing-guide.md`는 실제 파일 내용에서 요약과 상태를 생성해야 한다.
- Codex 작업 후 `node scripts/board-sync.js`를 실행하면 브라우저 새로고침으로 최신 문서 상태를 볼 수 있어야 한다.

## 범위

- 포함:
  - 실제 spec 폴더와 보드 데이터의 연결 계약 정의
  - `.control-board/state.json` 초안 설계
  - 실제 Markdown 파일을 읽는 `scripts/board-sync.js`
  - 핵심 문서 5개와 기능별 spec 폴더 상태 스냅샷 생성
  - 문서 상태와 태스크 상태의 화면 반영 기준
  - fallback 동작 정의
- 제외:
  - 브라우저에서 Markdown 파일 직접 저장
  - GitHub API 연동
  - 여러 프로젝트 동시 관리
  - 자동 파일 감시 watcher

## 사용자 또는 downstream 영향

- 비개발자는 실제 문서가 준비됐는지, 어떤 문서가 검토 필요한지 보드에서 확인할 수 있다.
- AI coding agent는 기능별 spec 폴더와 상태 파일을 기준으로 작업 전 범위를 판단할 수 있다.
- 이후 Codex 작업 요청 생성 기능은 선택된 기능과 태스크의 실제 문서 경로를 포함할 수 있다.

## 데이터 계약 영향

- `FeatureSpec`, `DocumentState`, `TaskState`, `BoardStateFile` 엔티티가 추가된다.
- 상태 파일 경로는 `.control-board/state.json`을 기본값으로 한다.
- 상태 파일 변경은 계획, 작업, 문서 생성 현황, 작업 맵, Codex 작업 요청 생성 흐름에 영향을 준다.
