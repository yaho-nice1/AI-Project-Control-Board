# Plan

## 구현 전략

1. 테스트, 변경 기록, ADR 화면을 최신순 기록형 UI로 유지한다.
2. 작업 후 변경 내용은 각 기능 spec의 `change-log.md`와 제품 루트 change-log에 기록한다.
3. 기능 계획 카드에서는 검증과 전달 상태를 `specs/validation-and-handoff/` 경로로 표시한다.
4. 완료 보고는 AGENTS.md의 형식을 따른다.

## Allowed Files

- `src/app.js`
- `src/styles.css`
- `AGENTS.md`
- `specs/validation-and-handoff/`
- `specs/ai-workflow-control-board/change-log.md`

## 리스크

- 현재 테스트 실행은 CLI에서 수행하며 UI에서 직접 실행하지 않는다.
- Codex 작업 요청 생성은 후속 동적 연동에서 다시 설계해야 한다.

## 롤백 계획

- 테스트/로그/ADR 화면을 이전 정적 기록 렌더링으로 되돌린다.
- 기능 spec 분리 문서를 제거하고 제품 루트 spec만 사용한다.
