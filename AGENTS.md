# AGENTS.md

## 목적

이 문서는 AI Workflow Control Board 프로젝트에서 AI coding agent가 반드시 따라야 할 작업 규칙이다. 모든 변경은 템플릿 문서 구조에 근거해야 하며, 비개발자가 검토할 수 있는 형태로 범위, 이유, 검증 결과를 남겨야 한다.

## 작업 전 확인

1. `README.md`를 읽고 프로젝트 목적과 실행 방법을 확인한다.
2. `docs/architecture.md`, `docs/coding-rules.md`, `docs/data-contracts.md`를 확인한다.
3. 기능 또는 변경 작업이 있다면 `specs/<feature-name>/`의 문서를 먼저 확인한다.
4. 중요한 기술 결정과 충돌할 수 있는 변경은 `adr/`를 확인한다.

## 작업 규칙

- 변경 범위는 현재 spec 또는 요청에 필요한 파일로 제한한다.
- `specs/<feature-name>/plan.md`의 Allowed Files 범위를 우선한다.
- 새 기능을 구현할 때는 먼저 `specs/<feature-name>/` 폴더를 만들고 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md`를 작성한다.
- `specs/ai-workflow-control-board/`는 제품 전체 기준 문서로 사용하고, 개별 UI/데이터/검증 기능 작업을 직접 누적하지 않는다.
- 계획 화면에 표시되는 기능 카드는 실제 `specs/<feature-name>/` 경로와 1:1로 연결되어야 한다.
- 보드에 표시되는 모든 단계는 실제 템플릿 파일 또는 문서 섹션과 연결한다.
- 비개발자용 문구는 명령어보다 의사결정, 완료 기준, 검토 질문 중심으로 작성한다.
- 데이터 모델, 저장 방식, downstream 영향이 바뀌면 `docs/data-contracts.md`와 관련 spec을 갱신한다.
- 테스트 기준이 바뀌면 `docs/testing-guide.md`와 `specs/<feature-name>/acceptance-tests.md`를 갱신한다.
- 배포나 운영 절차가 바뀌면 `docs/deployment.md` 또는 `docs/troubleshooting.md`를 갱신한다.
- 중요한 기술적 의사결정은 `adr/`에 ADR로 기록한다.
- 작업 완료 전 `node scripts/board-sync.js`를 실행해 `.control-board/state.json`과 `src/board-state.json`을 최신 문서 상태로 갱신한다.

## 금지 사항

- 명시적 승인 없이 사용자 변경사항을 되돌리지 않는다.
- spec 없이 큰 구조 변경을 진행하지 않는다.
- 화면만 만들고 실제 템플릿 문서와 연결하지 않은 상태로 완료했다고 보고하지 않는다.
- 테스트 또는 검증 없이 완료했다고 보고하지 않는다.
- 데이터 계약 위반 가능성을 무시하지 않는다.
- 실제 문서를 바꿨는데 보드 상태 파일 갱신을 누락하지 않는다.

## 완료 보고 형식

작업 완료 시 다음 내용을 보고한다.

- 변경한 파일
- 실행한 테스트 또는 검증
- 남은 위험 요소
- 필요한 후속 작업
