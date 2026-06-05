# ADR-0002: 기능별 spec 폴더 사용

## 상태

채택됨

## 맥락

초기 구현에서는 `AI Workflow Control Board` 제품 전체를 하나의 기능처럼 보고 `specs/ai-workflow-control-board/` 아래에 요구사항, 계획, 작업, 테스트 기준, 변경 기록을 누적했다.

이후 계획 화면에서 `workflow-visualization`, `generated-docs-preview`, `validation-and-handoff` 같은 실제 기능 단위를 보여주기 시작하면서 화면의 기능 카드와 실제 문서 구조가 어긋났다. 화면용 `F-001` 코드도 실제 템플릿 경로와 연결되지 않아 비개발자가 어떤 기능 문서를 검토해야 하는지 알기 어려웠다.

## 결정

제품 전체 기준 문서는 `specs/ai-workflow-control-board/`에 둔다.

개별 기능 구현은 반드시 `specs/<feature-name>/` 폴더 아래에서 관리한다. 각 기능 폴더는 다음 문서를 가진다.

- `spec.md`
- `plan.md`
- `tasks.md`
- `acceptance-tests.md`
- `change-log.md`

현재 기능 spec은 다음처럼 분리한다.

- `specs/workflow-visualization/`
- `specs/generated-docs-preview/`
- `specs/validation-and-handoff/`

계획 화면의 기능 카드는 임의 번호 대신 실제 `specs/<feature-name>/` 경로를 표시한다.

## 결과

긍정적 영향:

- 기능 카드와 실제 문서 경로가 1:1로 연결된다.
- AI coding agent가 작업 전 확인해야 할 spec 범위를 더 명확히 찾을 수 있다.
- 기능별 변경 로그와 수용 기준을 제품 전체 문서와 분리해 추적할 수 있다.

부정적 영향 또는 트레이드오프:

- 기능이 늘어날수록 spec 폴더와 문서 수가 증가한다.
- 제품 전체 기준 문서와 기능별 문서 사이의 중복을 주기적으로 정리해야 한다.
- 기존에 제품 전체 spec에 누적된 작업은 기능별 spec으로 마이그레이션해야 한다.

## 검토한 대안

- `specs/ai-workflow-control-board/` 하나에 모든 기능을 계속 누적
- 기능별 문서는 만들지 않고 UI 내부 데이터로만 기능 상태 관리
- `docs/` 아래에 기능별 계획 문서를 별도로 추가
