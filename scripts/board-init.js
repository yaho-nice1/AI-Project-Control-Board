#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = resolveProjectRoot();
const projectName = path.basename(projectRoot);

const templateFiles = new Map([
  [
    "AGENTS.md",
    `# AGENTS.md

## 목적

이 문서는 ${projectName} 프로젝트에서 AI coding agent가 따라야 할 작업 규칙이다.

## 작업 전 확인

1. README.md를 읽고 프로젝트 목적과 실행 방법을 확인한다.
2. docs/architecture.md, docs/coding-rules.md, docs/data-contracts.md를 확인한다.
3. 기능 작업은 specs/<feature-name>/ 문서를 먼저 확인한다.

## 작업 규칙

- 변경 범위는 현재 요청과 관련 spec의 Allowed Files로 제한한다.
- 큰 구조 변경은 spec 없이 진행하지 않는다.
- 완료 전 테스트 또는 검증 결과를 남긴다.

## 완료 보고 형식

- 변경한 파일
- 실행한 테스트 또는 검증
- 남은 위험 요소
- 필요한 후속 작업
`,
  ],
  [
    "README.md",
    `# ${projectName}

## 목적

이 프로젝트의 목적을 작성한다.

## 실행

실행 방법을 작성한다.

## 구조

주요 폴더와 문서의 역할을 작성한다.
`,
  ],
  [
    "docs/architecture.md",
    `# 아키텍처

## 목적

시스템 구조, 계층, 데이터 흐름을 설명한다.

## 시스템 개요

- 사용자:
- 주요 애플리케이션:
- 데이터 저장소:
- 외부 연동:
`,
  ],
  [
    "docs/coding-rules.md",
    `# 코딩 규칙

## 목적

코드 작성, 네이밍, 리뷰 기준을 정의한다.

## 규칙

- 기존 구조와 스타일을 우선한다.
- 불필요한 추상화를 추가하지 않는다.
- 변경 범위를 작게 유지한다.
`,
  ],
  [
    "docs/data-contracts.md",
    `# 데이터 계약

## 목적

프로젝트에서 사용하는 주요 데이터 구조와 필드 계약을 정의한다.

## 엔티티 목록

| 엔티티 | 목적 | 소유자 | downstream |
| --- | --- | --- | --- |

## 변경 절차

데이터 구조가 바뀌면 이 문서를 함께 갱신한다.
`,
  ],
  [
    "docs/testing-guide.md",
    `# 테스트 가이드

## 목적

변경 유형별 필수 테스트와 수동 검증 기준을 정의한다.

## 기본 검증

- 자동 테스트:
- 수동 확인:
`,
  ],
]);

function resolveProjectRoot() {
  const projectFlagIndex = process.argv.indexOf("--project");
  const projectPath = projectFlagIndex === -1 ? process.argv[2] : process.argv[projectFlagIndex + 1];
  if (!projectPath) {
    throw new Error('Usage: node scripts/board-init.js --project "/path/to/project"');
  }
  return path.resolve(projectPath);
}

function writeIfMissing(relativePath, content) {
  const fullPath = path.join(projectRoot, relativePath);
  if (fs.existsSync(fullPath)) {
    return false;
  }
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  return true;
}

fs.mkdirSync(projectRoot, { recursive: true });
fs.mkdirSync(path.join(projectRoot, "adr"), { recursive: true });
fs.mkdirSync(path.join(projectRoot, "specs"), { recursive: true });

const created = [];
const skipped = [];
for (const [relativePath, content] of templateFiles.entries()) {
  if (writeIfMissing(relativePath, content)) {
    created.push(relativePath);
  } else {
    skipped.push(relativePath);
  }
}

console.log(`Initialized template structure for ${projectName}.`);
console.log(`Created ${created.length} files.`);
created.forEach((file) => console.log(`+ ${file}`));
if (skipped.length) {
  console.log(`Skipped ${skipped.length} existing files.`);
}
