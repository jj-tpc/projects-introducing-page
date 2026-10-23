---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["news-reading-helper.html","hr-plugin.html"]
---

# Surface brief: index.html (+ news-reading-helper.html, hr-plugin.html)

Scope: 프로젝트 허브 메인(index.html)과 프로젝트 1 상세(news-reading-helper.html). Visitor mode: Persuade (참석자가 프로젝트를 고르고 열거나 내려받는다).

Audience: 교육·발표 참석자, 발표 직후 휴대폰 또는 노트북. Job: 세 프로젝트를 몇 초 안에 구분하고 원하는 실물로 이동. Action: 행(row) 클릭 → zip 다운로드 / 외부 페이지 / (준비 중). Proof: 실제 SKILL.md 내용, 실제 서비스 URL. Constraints: 정적 HTML, 세로 3개 유지, 바이라인 없음, 프로젝트 3은 소개 페이지로 연결.

Chosen direction: 역 출발 안내판 (split-flap concourse), 사용자가 결정 페이지에서 선택. Memorable moment: 페이지가 열리면 제목 플레이트와 각 행의 종류·링크·상태 플레이트가 실제 분할 플랩처럼 위 절반이 접히며 넘어가 자리를 잡는다.

## Direction contract

THESIS: 이 페이지는 발표 뒤 참석자가 올려다보는 출발 안내판이다. 세 프로젝트는 번호·프로젝트·종류·행선지·상태 열이 고정된 세 행이고, 행 자체가 버튼이다. 거부하는 배치: 아바타 아래 둥근 알약 버튼 세 개, 카드 그리드, 그라데이션 히어로.

OWN-WORLD: 플랩 검정 #0B0B0D 보드, 스틸 프레임 #2A2D31 / 중간 #5B5E63 / 밝은 #A7AAAF 베젤, 글자 흰색 #F2F2F2, 준비중 황색 #FFB000, 취소 적색 #B00020. 플랩 플레이트는 단어(또는 값) 하나에 한 장이며 가로 분할선이 있다(사용자 결정: 낱자 칸은 가독성 때문에 폐기). 플레이트의 라틴·숫자는 Barlow Condensed, 한글은 Gothic A1 800. 행 이름은 플레이트 없이 Gothic A1 800 연속 활자, 설명은 Gothic A1 400 스틸라이트. 괘선은 1px 스틸. 둥근 모서리 없음, 그림자는 베젤의 오프셋 소프트 섀도 하나뿐. 버튼은 황색 면 위 검정 글자 플레이트.

STORY: 참석자는 "출발 안내판"을 보고 세 행이 세 프로젝트임을 바로 안다. 행선지 열이 무엇을 얻는지(ZIP 다운로드 / 외부 페이지 / 준비 중) 말해 주고, 상태 열이 지금 열 수 있는지 알려 준다. 행을 누르면 그곳으로 간다. 상세 페이지는 안내판의 "노선 상세 카드"로, 스킬의 사실과 다운로드 플레이트를 같은 문법으로 보여 준다.

FIRST VIEWPORT: 화면 가운데 스틸 베젤 안의 검정 보드, 최대 폭 960px. 맨 위 스틸 레일: 왼쪽 "MENU · 메뉴", 오른쪽 현재 시각 플레이트(HH:MM). 그 아래 제목 "프로젝트 소개"가 단어당 한 장의 큰 플레이트(높이 약 51~77px)로 놓인다. 그 아래 열 머리글 행(번호 · 프로젝트 · 종류 · 링크 · 상태), 그리고 세 행: 01 뉴스 보고서 PDF 생성 · SKILL · ZIP 다운로드 · 열람 / 02 동국대 챗봇 에이전트 · AGENT · 외부 페이지 · 열람 / 03 HR 리스크 분석 대시보드 · PLUGIN · ZIP 다운로드 · 열람. 하단 레일 없음(사용자 결정). 주 행동은 1·2행 자체이고, 행 오른쪽 끝 "›"로 클릭 가능함을 드러낸다. 1000px 미만에서는 종류·링크·상태 플레이트가 설명 아래 한 줄(nowrap)로 내려가고 번호·프로젝트·› 열만 남는다. UI 명칭은 은유를 따르지 않고 평이한 말을 쓴다(사용자 결정).

FORM: 역 출발 안내판 (challenger signals-instruments-split-flap-concourse, 사용자 선택; 내 그라운디드 목록 밖의 카드). seed:81cbee90ce7fd389

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: 로드 시 제목·종류·링크·상태 플레이트가 rotateX 접힘(190ms)으로 임의 문자열을 2~3번 거쳐 목표 글자에 멈추는 캐스케이드(플레이트마다 90ms 지연). 호버 시 해당 행의 플레이트가 한 번 더 접힌다. prefers-reduced-motion 이면 즉시 표시.

Unresolved: 없음. 프로젝트 3은 hr-plugin.html(같은 보드 문법)로 연결됨.
