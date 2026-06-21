# 글 작성 위치

글은 `content/posts/` 아래에 글마다 폴더를 만들고, 그 안의 `index.md`에 Markdown으로 작성합니다.

이 방식은 `danmin20/danmin-gatsby-blog-template`처럼 글 폴더 이름이 글 주소가 되고, 글에 쓰는 사진도 같은 폴더 안에 둘 수 있는 구조입니다.

## 새 글 추가 방법

1. `content/posts/새-글-이름/` 폴더를 만듭니다.
2. 그 안에 `index.md` 파일을 만듭니다.
3. 사진은 같은 폴더에 넣습니다.
4. `content/posts/index.js`에 `"새-글-이름"`을 추가합니다.

## 글 목록 추가 예시

```js
export default ["simulation-week-1", "robot-arm-week-1", "simulation-week-2"];
```

## index.md 예시

```md
---
emoji: 🧪
title: 시뮬레이션 구현 활동 2주차
date: '2026-03-22'
categories: simulation freshman-first-semester
summary: 초기 모델을 구현하고 그래프로 결과를 확인했습니다.
---

# 시뮬레이션 구현 활동 2주차

## 오늘 한 일

- 

## 사진과 결과

![결과 그래프](result-graph.png)

## 어려웠던 점

## 배운 점

## 다음에 할 일

```toc
```
```

## 사진 넣기

글 폴더 안에 사진을 같이 넣으면 짧은 경로로 사용할 수 있습니다.

```txt
content/posts/simulation-week-2/
  index.md
  result-graph.png
```
