# AI Workflow Control Board

AI Workflow Control Board는 `specs/`, `docs/`, `adr/`, `AGENTS.md`로 구성된 AI 프로젝트 템플릿을 비개발자도 따라갈 수 있도록 시각화한 로컬 웹앱이다.

보드는 새 기능을 시작할 때 필요한 요구사항, 구현 계획, 작업 목록, 완료 기준, 변경 기록을 한 화면에서 보여준다. 각 카드와 검토 항목은 실제 템플릿 파일 경로와 연결되어 있어, 사용자는 문서 구조를 몰라도 같은 워크플로우를 진행할 수 있다.

## 실행

브라우저에서 `src/index.html`을 연다.

## 구조

```text
.
├── AGENTS.md
├── README.md
├── docs/
├── specs/
│   └── ai-workflow-control-board/
├── adr/
├── scripts/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── tests/
```

## 기본 명령

```bash
./scripts/run_tests.sh
```

## 핵심 흐름

```text
프로젝트 기준 확인
  -> 요구사항 작성
  -> 구현 계획 작성
  -> 작업 분해
  -> AI 작업 지시문 생성
  -> 테스트와 수동 검증
  -> 변경 로그와 결정 기록
```
