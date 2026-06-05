# Plan

## 구현 전략

1. 템플릿 내용을 반영한 프로젝트 기준 문서를 루트에 작성한다.
2. 제품 전체 기준 문서는 `specs/ai-workflow-control-board/`에 두고, 개별 기능은 `specs/<feature-name>/`로 분리한다.
3. 빌드 없는 정적 웹앱을 `src/`에 구현한다.
4. `src/app.js`에 템플릿 문서 요약, 워크플로우 단계, 검증 기준, AI 지시문 생성 데이터를 넣는다.
5. 체크리스트 상태는 `localStorage`에 저장한다.
6. `scripts/run_tests.sh`와 `tests/smoke.js`로 기본 파일 구조와 JavaScript 구문을 검증한다.

## Allowed Files

이 작업에서 변경할 수 있는 파일 또는 디렉터리를 명시한다.

- `AGENTS.md`
- `README.md`
- `docs/`
- `specs/ai-workflow-control-board/`
- `specs/workflow-visualization/`
- `specs/generated-docs-preview/`
- `specs/validation-and-handoff/`
- `specs/document-state-sync/`
- `adr/`
- `scripts/`
- `src/`
- `tests/`
- `.gitignore`

## 리스크

- 정적 앱은 실제 Markdown 파일을 자동 저장하지 못한다.
- 보드에 내장된 템플릿 요약이 원본 문서 변경과 달라질 수 있다.
- 브라우저 파일 실행 환경에서는 Clipboard API가 제한될 수 있다.

## 롤백 계획

- 앱 구현 파일은 `src/` 단위로 되돌린다.
- 템플릿 문서 변경은 관련 spec과 함께 되돌린다.
- 브라우저 로컬 상태 문제는 보드의 초기화 버튼으로 해결한다.
