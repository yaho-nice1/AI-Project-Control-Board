# Change Log

## 2026-06-05

### 변경 내용

- `board-sync.js --project <path>`로 외부 Codex 프로젝트를 읽어 보드 상태에 반영하도록 확장했다.
- `board-init.js --project <path>`를 추가해 외부 프로젝트에 누락된 기본 템플릿 문서와 `specs/`, `adr/` 폴더만 생성하도록 했다.
- 상태 파일에 `sourceProject`와 `structure`를 추가해 원본 프로젝트와 템플릿 구조 검사 결과를 기록한다.
- 외부 프로젝트 init/sync를 검증하는 `tests/external-project.js`를 추가했다.

### 변경 이유

- 보드 앱을 프로젝트마다 복사하지 않고도, 다른 Codex 프로젝트를 같은 템플릿 구조로 초기화하고 관제판에서 읽을 수 있어야 한다.

### 테스트 결과

- `./scripts/run_tests.sh` 통과.
- 임시 외부 프로젝트를 생성해 init, sync, 구조 검사, 원본 프로젝트 복구 흐름을 검증했다.
- 신규 프로젝트 초기 상태에서는 placeholder 기능 spec을 만들지 않고 빈 `specs/`를 정상 구조로 검증했다.

### 남은 작업

- 여러 프로젝트를 등록하고 UI에서 전환하는 registry 기반 흐름은 후속 범위로 남긴다.

## 2026-06-04

### 변경 내용

- 실제 `specs/<feature-name>/` 문서 구조와 보드 상태를 연결하기 위한 document-state-sync 기능 spec을 추가했다.
- `.control-board/state.json` 기반 상태 동기화 계약을 설계 범위로 정의했다.
- `.control-board/state.json` 예시 파일을 추가하고 기존 기능 3개의 문서/태스크 상태를 담았다.
- smoke test가 상태 파일 JSON과 필수 기능 id를 검증하도록 보강했다.
- `src/app.js`가 `.control-board/state.json`을 읽어 기능 계획과 작업 맵 데이터로 매핑하도록 연결했다.
- 상태 파일을 읽지 못하면 기존 내장 데이터로 표시되도록 fallback을 유지했다.
- `src/` 정적 서버에서도 상태를 읽을 수 있도록 `src/board-state.json` 브라우저용 스냅샷을 추가하고 앱의 상태 파일 탐색 경로에 포함했다.
- `scripts/board-sync.js`가 실제 Markdown 파일을 읽어 `.control-board/state.json`과 `src/board-state.json`을 생성하도록 구현했다.
- 핵심 문서 5개와 모든 `specs/<feature-name>/` 폴더를 자동 스캔하도록 연결했다.
- `tasks.md` 체크박스를 task 상태로 변환하고, 문서의 `미정`, `TODO`, 미완료 체크박스를 검토 필요 상태로 판단하도록 했다.
- `AGENTS.md`에 작업 완료 전 board-sync 실행 규칙을 추가했다.

### 변경 이유

- 현재 보드는 내장 데이터 기반이라 실제 Markdown 문서 준비 상태와 화면 상태가 자동으로 일치하지 않는다.

### 테스트 결과

- `node --check src/app.js`와 `./scripts/run_tests.sh`로 기존 정적 앱이 깨지지 않는지 검증한다.
- `node --check src/app.js`, `./scripts/run_tests.sh`, 상태 파일 JSON 파싱 검증을 통과했다.
- `node scripts/board-sync.js` 실행 결과 핵심 문서 5개와 기능 spec 5개가 동기화됐다.
- `./scripts/run_tests.sh`가 board-sync 실행을 포함해 통과했다.

### 남은 작업

- 파일 변경 감시 watcher와 자동 브라우저 reload는 후속 범위로 남긴다.
