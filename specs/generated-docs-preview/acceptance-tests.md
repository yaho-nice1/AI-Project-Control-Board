# Acceptance Tests

## 완료 기준

- 요구사항 화면에서 홈과 문서 탭을 전환할 수 있다.
- 문서 생성 현황에 모든 문서가 표시되고 영역 안에서 스크롤할 수 있다.
- 각 문서 row에는 문서명과 상태가 함께 표시된다.
- 문서 row 또는 탭을 누르면 실제 Markdown 파일의 제목, 섹션, 목록, 표, 코드가 본문으로 표시된다.
- 기능 계획 카드 위에는 `specs/generated-docs-preview/` 경로가 보인다.
- 기능 카드 문서 pill은 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md`처럼 짧게 보인다.

## 자동 테스트

```bash
node --check src/app.js
./scripts/run_tests.sh
```

## 수동 검증

- 브라우저에서 문서 탭을 눌러 미리보기가 바뀌는지 확인한다.
- `docs/architecture.md`, `docs/data-contracts.md`가 요약 문장이 아니라 실제 문서 본문으로 보이는지 확인한다.
- 문서 생성 현황 스크롤이 가능한지 확인한다.
