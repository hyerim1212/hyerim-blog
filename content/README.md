# 글 작성 위치

글은 `content/posts/` 폴더에 Markdown 파일로 작성합니다.

## 새 글 추가 방법

1. `content/posts/새-글-이름.md` 파일을 만듭니다.
2. `content/posts/index.js`에 글 정보를 추가합니다.
3. 사진은 `assets/images/프로젝트명/` 폴더에 넣습니다.
4. Markdown 본문에서 사진 경로를 적습니다.

## 글 목록 추가 예시

```js
{
  slug: "simulation-week-2",
  title: "시뮬레이션 구현 활동 2주차",
  date: "2026-03-22",
  category: "simulation",
  summary: "초기 모델을 구현하고 그래프로 결과를 확인했습니다.",
  file: "./content/posts/simulation-week-2.md",
}
```

## 사진 넣기 예시

```md
![결과 그래프](./assets/images/simulation/result-graph.png)
```

## 추천 기록 형식

```md
# 글 제목

## 오늘 한 일

- 

## 사진과 결과

![사진 설명](./assets/images/project-name/photo.png)

## 어려웠던 점

## 배운 점

## 다음에 할 일
```
