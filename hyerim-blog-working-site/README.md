# hyerim-record.com

정혜림의 학교생활, 프로젝트, 개인 공부 기록을 담는 정적 웹사이트입니다.

## 구성

- `index.html`: GitHub Pages에서 바로 열리는 메인 페이지
- `styles.css`: 전체 디자인
- `src/main.js`: `site.config.js` 데이터를 읽어 화면을 구성하는 스크립트
- `site.config.js`: 프로필, 메뉴, 프로젝트, 공부 카테고리, 타임라인 데이터

## GitHub Pages 배포

1. GitHub 저장소의 `Settings`로 이동합니다.
2. `Pages` 메뉴를 선택합니다.
3. `Build and deployment`의 `Source`를 `Deploy from a branch`로 설정합니다.
4. Branch를 `main`, folder를 `/root`로 선택합니다.
5. 저장 후 제공되는 GitHub Pages 주소로 접속합니다.

## 글 추가 방법

처음에는 메인 페이지의 카드 내용을 `site.config.js`에서 관리하면 됩니다.
블로그 글을 별도 페이지로 늘리고 싶다면 `content/` 폴더와 Markdown 기반 빌드 도구를 추가하는 방식으로 확장할 수 있습니다.
