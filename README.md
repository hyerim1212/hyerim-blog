# hyerim-blog

정혜림의 학교생활, 프로젝트, 개인 공부 기록을 담는 GitHub Pages 사이트입니다.

## 내용을 수정하는 파일

- `site.config.js`: 이름, 소개, 메뉴, 프로젝트 카드, 공부 카테고리, 타임라인
- `content/posts/`: 프로젝트 진행 과정과 공부 기록 Markdown 글
- `assets/images/`: 글에 넣을 사진
- `styles.css`: 색상, 글자 크기, 여백 등 디자인
- `index.html`: 첫 화면의 고정 문구와 페이지 구조

## 새 글 작성 방법

1. `content/posts/새-글-이름.md` 파일을 만듭니다.
2. `content/posts/index.js`에 글 정보를 추가합니다.
3. 사진은 `assets/images/simulation/`, `assets/images/robot-arm/`, `assets/images/study/` 등에 올립니다.
4. Markdown에서 `![사진 설명](./assets/images/simulation/photo.png)`처럼 사진을 넣습니다.

## 프로젝트 기록 추천 형식

```md
# 제목

## 오늘 한 일

## 사진과 결과

## 어려웠던 점

## 배운 점

## 다음에 할 일
```

## GitHub Pages 설정

저장소의 `Settings` → `Pages`에서 `gh-pages` 브랜치, `/root` 폴더를 선택하면 됩니다.
