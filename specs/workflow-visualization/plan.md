# Plan

## 구현 전략

1. 기존 정적 앱 구조를 유지하고 `src/app.js`의 화면별 렌더링 함수를 사용한다.
2. 요구사항 홈은 compact summary strip과 칸반 보드를 중심으로 구성한다.
3. 작업 화면은 기능 그룹과 태스크를 연결선이 있는 태스크 맵으로 표시한다.
4. 상태 색상은 CSS class로만 구분하고 텍스트 라벨을 함께 제공한다.
5. 기능 경로는 `specs/workflow-visualization/`로 표시한다.

## Allowed Files

- `src/app.js`
- `src/styles.css`
- `specs/workflow-visualization/`
- `specs/ai-workflow-control-board/change-log.md`

## 리스크

- 현재 데이터는 정적 샘플이므로 실제 Codex 작업 진행도와 자동 동기화되지 않는다.
- 태스크 맵 노드 클릭 상세 전환은 후속 범위다.

## 롤백 계획

- `src/app.js`의 관련 렌더링 함수를 이전 카드/리스트 구조로 되돌린다.
- `src/styles.css`의 태스크 맵, 칸반, summary strip 스타일을 이전 상태로 되돌린다.
