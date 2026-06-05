# Plan

## 구현 전략

1. `docs/data-contracts.md`에 실제 문서 상태 동기화를 위한 엔티티를 추가한다.
2. `.control-board/state.json`의 필드와 fallback 규칙을 정의한다.
3. 정적 앱 구조를 유지하면서 `scripts/board-sync.js`가 실제 Markdown 파일을 읽어 상태 스냅샷을 생성한다.
4. `src/app.js`의 내장 feature/docs/tasks 데이터를 상태 파일 기반 모델로 교체한다.
5. 상태 파일이 없거나 일부 필드가 누락되면 현재 내장 데이터를 fallback으로 사용한다.
6. `src/board-state.json`은 브라우저가 읽는 스냅샷이고 `.control-board/state.json`은 원본 상태 파일로 둔다.

## Allowed Files

- `docs/data-contracts.md`
- `specs/document-state-sync/`
- `specs/ai-workflow-control-board/`
- `scripts/`
- `tests/`
- `src/`
- `.control-board/`
- `src/board-state.json`
- `AGENTS.md`

## 리스크

- 정적 브라우저 앱은 보안 제한 때문에 로컬 파일 시스템을 직접 스캔하기 어렵다.
- 상태 파일을 자동으로 읽으려면 로컬 서버 또는 빌드/프리프로세스 단계가 필요할 수 있다.
- Markdown 문서를 파싱해 태스크 상태를 추출하는 규칙이 불명확하면 화면 상태가 흔들릴 수 있다.
- `board-sync` 실행 전에는 브라우저 새로고침만으로 최신 Markdown 변경이 반영되지 않는다.

## 롤백 계획

- `.control-board/state.json` 사용을 중단하고 기존 `src/app.js` 내장 데이터로 되돌린다.
- 데이터 계약 변경은 `FeatureSpec`, `DocumentState`, `TaskState`, `BoardStateFile` 항목을 제거해 되돌린다.
