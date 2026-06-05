# Acceptance Tests

## 완료 기준

- 테스트 탭에서 테스트 이름, 내용, 결과가 최신순으로 보인다.
- 변경 기록 탭에서 변경 요약, 검증, 위험이 최신순으로 보인다.
- 결정 기록 탭에서 ADR 코드, 상태, 결정 내용을 확인할 수 있다.
- 작업 후 제품 루트 change-log 또는 기능별 change-log가 갱신된다.
- 기능 계획 카드가 `specs/validation-and-handoff/` 경로를 표시한다.

## 자동 테스트

```bash
node --check src/app.js
./scripts/run_tests.sh
```

## 수동 검증

- 테스트, 변경 기록, 결정 기록 탭을 각각 열어 최신순 표시를 확인한다.
- 완료 보고에 변경 파일, 검증, 위험, 후속 작업이 포함되는지 확인한다.
