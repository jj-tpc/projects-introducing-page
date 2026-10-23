# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS (incumbent: two hand-written HTML pages, no framework, no build step)

## Users

교육·발표 참석자. 강의나 발표가 끝난 뒤 QR 코드나 공유 링크로 휴대폰 또는 노트북에서 들어와, 발표에서 본 결과물을 직접 열어 보거나 내려받아 가는 사람. 대체로 한 번 방문하며, 머무는 시간은 짧다.

## Product Purpose

발표자가 만든 세 개의 Claude 기반 프로젝트를 한 페이지에 모아 소개하고, 각 프로젝트의 실물(스킬 zip, 챗봇 페이지, 대시보드 플러그인)로 바로 보내는 허브. 성공은 참석자가 원하는 프로젝트를 몇 초 안에 찾아 열거나 내려받는 것.

## Positioning

세 프로젝트는 모두 "Claude에게 역할을 주어 일을 시키는" 방식(스킬·에이전트·플러그인)을 각각 다른 형태로 보여 준다. 이 페이지는 그 세 형태를 나란히 놓고 각각의 실물로 연결한다.

## Operating Context

- 메인 페이지(index.html): 프로젝트 세 개가 세로로 나열된 링크 허브. 이 세로 3개 구조는 사용자가 유지하기로 확정함.
- 프로젝트 1 "News Reading Helper" 소개 페이지(news-reading-helper.html): 스킬 설명과 zip 다운로드(downloads/news-reading-helper.zip, 2.6MB). 스킬 내용의 근거는 zip 안의 SKILL.md.
- 프로젝트 2 "동국대 챗봇 에이전트": 외부 페이지 https://dongguk.the-prompt.me/ 로 이동.
- 프로젝트 3 "HR 리스크 분석 및 예측 대시보드 플러그인" 소개 페이지(hr-plugin.html): 비공개 저장소 github.com/the-prompt-company/hr-plugin (v0.5.0, Proprietary)의 README·SKILL.md·plugin.json을 근거로 작성. 배포 zip 세 개(downloads/hr-attrition-plugin.zip, predict_attrition.zip, make_dashboard.zip)는 저장소의 make_skill_zip.py와 플러그인 폴더에서 생성.
- 열람 환경: 발표 직후 휴대폰, 또는 강의실 노트북. 조명은 통제되지 않음.

## Capabilities and Constraints

- 정적 파일만 사용. 서버, 빌드, 프레임워크 없음.
- 외부 리소스는 Google Fonts 정도만 허용.
- 작성자 이름·소속은 표기하지 않기로 확정함.
- 언어: 한국어 UI. 프로젝트 고유명(News Reading Helper 등)은 영문 유지.

## Brand Commitments

- 사용자가 지정한 시각 방향: "에디토리얼". 현재의 보라 그라데이션·글래스 카드 룩은 AI 생성물처럼 보인다고 거부됨. 이 룩은 안티레퍼런스.
- 메인 페이지 제목은 "프로젝트 소개" 한 줄만. 서브타이틀 없음.

## Evidence on Hand

- downloads/news-reading-helper.zip 과 그 안의 SKILL.md (실제 스킬 문서).
- 동국대 챗봇 실 서비스 URL.
- 프로젝트 3: 저장소 소스와 배포 zip. 대시보드 스크린샷은 없음(실제 HR 데이터 없이 생성하지 말 것).
- 사용자 사진, 로고, 소속 자산 없음.

## Product Principles

- 몇 초 안에 세 프로젝트를 구분하고 원하는 곳으로 보낸다.
- 각 프로젝트는 실물로 증명한다. 설명은 실제 문서(SKILL.md)에서 가져온다.
- 발표 자료의 연장선처럼 읽힌다. 광고 랜딩이 아니라 편집된 지면의 밀도.
- 휴대폰 한 손 열람이 기본이다.
