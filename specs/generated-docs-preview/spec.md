# Spec

## 배경

AI 템플릿은 `AGENTS.md`, `docs/architecture.md`, `docs/data-contracts.md` 같은 문서를 기준으로 작업한다. 사용자는 파일 경로보다 문서의 목적, 상태, 검토 필요 여부를 먼저 이해해야 한다.

## 요구사항

- 요구사항 화면의 상단 작은 탭에서 홈과 주요 문서를 전환할 수 있어야 한다.
- 문서 생성 현황은 모든 문서를 한 줄 row로 표시하고 상태를 색과 텍스트로 구분해야 한다.
- 문서 미리보기는 Markdown 문서처럼 제목, 본문, 검토 질문을 보여줘야 한다.
- 계획 탭 기능 카드의 문서 pill은 해당 기능 폴더의 `spec.md`, `plan.md`, `tasks.md`, `acceptance-tests.md`, `change-log.md`와 연결되어야 한다.

## 범위

- 포함:
  - 문서 탭
  - 문서 생성 현황 row
  - Markdown 스타일 미리보기
  - 기능 카드의 문서 pill 표시
- 제외:
  - 브라우저에서 Markdown 파일 직접 저장
  - 실제 파일 시스템 자동 스캔

## 사용자 또는 downstream 영향

- 비개발자는 어떤 문서가 완료됐고 어떤 문서가 검토 필요한지 홈에서 확인할 수 있다.
- AI coding agent는 기능 카드의 문서 경로를 통해 작업 전 확인 문서를 찾을 수 있다.

## 데이터 계약 영향

- `TemplateDocument.path`, 문서 상태 표시 데이터와 연결된다.
- 새 저장 방식은 추가하지 않는다.
