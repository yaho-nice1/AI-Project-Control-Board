# Change Log

## 2026-06-03

### 변경 내용

- 문서 탭, 문서 생성 현황, Markdown 미리보기, 기능 카드 문서 pill을 generated docs preview 기능 spec으로 분리했다.

### 변경 이유

- 문서 상태와 미리보기 기능은 화면 시각화와 별도로 추적되어야 한다.

### 테스트 결과

- 마이그레이션 후 `node --check src/app.js`와 `./scripts/run_tests.sh`로 검증한다.

### 남은 작업

- 실제 Markdown 파일 자동 읽기와 상태 동기화는 후속 설계가 필요하다.
