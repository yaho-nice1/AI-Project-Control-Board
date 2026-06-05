# Acceptance Tests

## 완료 기준

- `specs/document-state-sync/`에 5개 기능 문서가 존재한다.
- `docs/data-contracts.md`에 `FeatureSpec`, `DocumentState`, `TaskState`, `BoardStateFile` 계약이 정의되어 있다.
- `.control-board/state.json` 필드 구조와 fallback 기준이 문서화되어 있다.
- `node scripts/board-sync.js`가 실제 Markdown 파일을 읽어 `.control-board/state.json`과 `src/board-state.json`을 생성한다.
- `AGENTS.md`, `docs/architecture.md`, `docs/coding-rules.md`, `docs/data-contracts.md`, `docs/testing-guide.md`가 `board-state.json`의 `documents`에 포함된다.
- `specs/<feature-name>/tasks.md` 체크박스가 `board-state.json`의 task 상태로 반영된다.
- 후속 구현 전에도 기존 정적 보드는 깨지지 않는다.

## 자동 테스트

```bash
node --check src/app.js
node scripts/board-sync.js
./scripts/run_tests.sh
```

## 수동 검증

- 기능 계획 화면의 `specs/<feature-name>/` 경로와 실제 폴더가 일치하는지 확인한다.
- 핵심 문서 5개 중 하나를 수정한 뒤 `node scripts/board-sync.js` 실행과 브라우저 새로고침으로 미리보기 내용이 바뀌는지 확인한다.
