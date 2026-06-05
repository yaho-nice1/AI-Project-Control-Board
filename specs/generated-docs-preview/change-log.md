# Change Log

## 2026-06-03

### 변경 내용

- 문서 탭, 문서 생성 현황, Markdown 미리보기, 기능 카드 문서 pill을 generated docs preview 기능 spec으로 분리했다.
- `board-sync.js`가 주요 Markdown 파일의 원문을 상태 JSON에 포함하고, 문서 탭이 실제 본문을 렌더링하도록 변경했다.

### 변경 이유

- 문서 상태와 미리보기 기능은 화면 시각화와 별도로 추적되어야 한다.

### 테스트 결과

- 마이그레이션 후 `node --check src/app.js`와 `./scripts/run_tests.sh`로 검증한다.
- 실제 Markdown 본문 포함 여부를 smoke test에 추가했다.

### 남은 작업

- 브라우저에서 주요 문서별 본문 표시를 수동 검증한다.
