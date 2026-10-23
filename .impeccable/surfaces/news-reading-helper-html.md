---
version: 1
slug: "news-reading-helper-html"
primary_target: "news-reading-helper.html"
related_targets: ["hr-plugin.html"]
---

# Surface brief: news-reading-helper.html (+ hr-plugin.html)

Scope: 프로젝트 1·3 소개·다운로드 페이지. Visitor mode: Persuade (참석자가 무엇인지 이해하고 zip을 내려받는다). 메인 index.html은 별도 세계(사용자 결정: 처음의 링크트리 풍 유지)이며 이 브리프의 범위 밖이다.

Audience: 교육·발표 참석자, 발표 직후 휴대폰 또는 노트북. Job: 이 스킬/플러그인이 무엇이고 어떻게 쓰는지 몇 초 안에 알고 내려받기. Action: ZIP 다운로드(1번: news-reading-helper.zip 2.6MB / 3번: hr-attrition-plugin.zip 96KB + 스킬 zip 2개). Proof: SKILL.md·README의 실제 사실. Constraints: 정적 HTML, Google Fonts만 외부 자원, 바이라인 없음, UI 명칭은 평이한 말(사용자 결정), 가독성 우선(사용자 결정).

Chosen direction: 셰이더 포털 (webgl-shader-portal), 사용자가 결정 페이지에서 기각 후보를 직접 채택. Memorable moment: 화면 전체가 느리게 숨 쉬는 남색 셰이더이고, 커서가 지나간 자리의 빛이 비틀리며, 로더가 100까지 센 뒤 거대한 압축 활자가 떠오른다.

## Direction contract

THESIS: 이 페이지는 스튜디오의 포털이다. 살아 있는 픽셀이 바탕이고 인터페이스는 그 위에 떠 있는 얇은 활자다. 스킬/플러그인은 거대한 한 단어(NEWS READING HELPER / HR ATTRITION)로 선언되고, 작은 추적 라벨과 가는 테두리 패널이 사실을 나른다. 거부하는 배치: 흰 바탕 카드 그리드, 앱 스토어식 아이콘+받기, 이전의 안내판.

OWN-WORLD: 보이드 #0B0D1A 바탕 위에 WebGL 프래그먼트 셰이더가 라일락 #6A6CF6 필라멘트와 엠버 #FF6A3D 한 줄기를 느리게 흘린다. 잉크 #13162B / 나이트 #1A1D3A 는 패널 면, 미스트 #BFD2FF 는 활자색. 디스플레이는 Archivo(variable, wdth 70·wght 800)의 압축 대문자, 라벨은 Archivo 500 추적 +0.2em 대문자, 한국어 본문은 Noto Sans KR 400/700. 필름 그레인 오버레이. 버튼은 라일락 채움(주) / 미스트 1px 윤곽(보조), 활성·호버는 엠버 테두리. 모서리 6px. 그림자 없음(빛은 셰이더가 낸다).

STORY: 참석자는 거대한 이름과 한 줄 설명으로 무엇인지 알고, 첫 화면의 "ZIP 다운로드"를 누른다. 더 알고 싶으면 아래로 흘러 작동 순서·구성·설치를 읽는다. 커서가 바탕을 비트는 경험이 "살아 있는 도구"라는 인상을 남긴다.

FIRST VIEWPORT: 전체 화면 셰이더. 상단 왼쪽 "← 프로젝트 소개"(얇은 추적 라벨), 상단 오른쪽 "SKILL · v1.0" 상태 라벨. 왼쪽 세로 색인 01 소개 / 02 작동 / 03 구성 / 04 설치(앵커, 활성 점). 가운데-왼쪽에 압축 대문자 제목 2~3줄(데스크톱 160~200px, 모바일 72px), 그 아래 한국어 한 줄 설명(미스트, 18px), 그 아래 주 버튼 "ZIP 다운로드 →"(라일락)와 보조 "설치 방법 →"(윤곽). 왼쪽 아래 LOADER 카운터(0→100%). 오른쪽 세로 "SCROLL" 레일. 오른쪽 아래 환경 라벨 "● 산출물 PDF + MD". 휴대폰: 색인·스크롤 레일 숨김, 제목 72px, 버튼 전폭.

FORM: 셰이더 포털 (challenger webgl-shader-portal, 사용자 채택; 내 그라운디드 목록 밖의 카드). seed:186581f61bf0e3da

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: 마우스 위치 uniform으로 셰이더 필드가 커서 아래에서 비틀리고, 커서는 작은 링으로 바뀐다. 로드 시 로더가 0→100을 세는 동안 제목이 아래에서 떠오른다. 스크롤 양에 따라 셰이더 카메라가 관성으로 느리게 흐른다. 같은 사이트 링크를 누르면 셰이더가 용해(dissolve)된 뒤 이동한다. prefers-reduced-motion: 셰이더 정지 프레임, 커서 기본, 로더 즉시 100.

Unresolved: 없음.
