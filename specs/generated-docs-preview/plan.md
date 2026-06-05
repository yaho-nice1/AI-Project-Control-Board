# Plan

## 구현 전략

1. 기존 문서 탭 렌더링을 유지한다.
2. 문서 생성 현황은 1열 row UI와 세로 스크롤로 표시한다.
3. 기능 카드에서는 위쪽에 기능 경로를 표시하고, 문서 pill은 `spec.md`처럼 짧게 표시한다.
4. 문서 상태 색상은 완료, 검토 필요, 대기 중 상태별 class로 관리한다.

## Allowed Files

- `src/app.js`
- `src/styles.css`
- `specs/generated-docs-preview/`
- `specs/ai-workflow-control-board/change-log.md`

## 리스크

- 현재 문서 내용은 내장 데이터라 원본 Markdown 변경과 자동 동기화되지 않는다.
- 문서 상태는 실제 파일 생성 여부를 자동 판정하지 않는다.

## 롤백 계획

- 문서 pill과 문서 생성 현황 렌더링을 이전 단순 표시로 되돌린다.
