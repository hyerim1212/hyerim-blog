export default {
  title: "hyerim-record.com",
  description: "정혜림의 학교생활, 프로젝트, 개인 공부 기록",
  language: "ko",
  siteUrl: "https://hyerim1212.github.io/hyerim-blog/",
  ogImage: "./og-image.png",

  author: {
    name: "정혜림",
    nickname: "hyerim",
    stack: ["Python", "Simulation", "Robotics"],
    bio: {
      email: "hyerim12@dgist.ac.kr",
      residence: "Seoul, South Korea",
      school: "DGIST",
      grade: "1학년",
      interests: ["시뮬레이션", "로봇 팔", "Python", "개인 공부 기록"],
    },
    social: {
      github: "https://github.com/hyerim1212",
      linkedIn: "",
      resume: "",
    },
  },

  navigation: [
    {
      title: "School Life",
      path: "#school-life",
      description: "학기별 학교생활과 활동 기록",
    },
    {
      title: "Projects",
      path: "#projects",
      description: "시뮬레이션 구현, 로봇 팔 제작 등 프로젝트 기록",
    },
    {
      title: "Records",
      path: "#records",
      description: "프로젝트 진행 과정과 사진 기록",
    },
    {
      title: "Study Log",
      path: "#study-log",
      description: "개인적으로 공부한 내용 정리",
    },
    {
      title: "About",
      path: "#about",
      description: "소개와 타임라인",
    },
  ],

  featured: [
    {
      title: "1학년 1학기",
      category: "freshman-first-semester",
      description: "학교생활의 시작과 학기 중 활동을 차근차근 기록합니다.",
    },
    {
      title: "시뮬레이션 구현",
      category: "simulation",
      description: "문제 정의, 모델링, 구현 과정, 결과 분석을 정리합니다.",
    },
    {
      title: "로봇 팔 제작",
      category: "robot-arm",
      description: "설계, 제작, 제어, 테스트 과정을 프로젝트 로그로 남깁니다.",
    },
    {
      title: "개인 공부",
      category: "self-study",
      description: "Python, 수학, 공학 기초 등 개인 학습 내용을 정리합니다.",
    },
  ],

  timestamps: [
    {
      category: "Education",
      date: "2026.03 - NOW",
      en: "DGIST",
      kr: "DGIST 1학년",
      info: "학교생활 및 전공 기초 학습 기록",
      link: "",
    },
    {
      category: "Activity",
      date: "2026.03 - 2026.06",
      en: "Simulation Implementation",
      kr: "시뮬레이션 구현 활동",
      info: "문제 정의, 모델링, 구현 과정, 결과 분석 기록",
      link: "",
    },
    {
      category: "Activity",
      date: "2026.03 - 2026.06",
      en: "Robot Arm Project",
      kr: "로봇 팔 제작 활동",
      info: "설계, 부품 구성, 제어, 테스트 과정 기록",
      link: "",
    },
    {
      category: "Study",
      date: "2026.03 - NOW",
      en: "Personal Study",
      kr: "개인 공부",
      info: "Python, 수학, 공학 기초, 읽은 자료와 실습 정리",
      link: "",
    },
  ],

  projects: [
    {
      title: "시뮬레이션 구현 활동",
      slug: "simulation-implementation",
      description: "1학년 1학기 동안 진행한 시뮬레이션 구현 활동 기록",
      category: "simulation",
      semester: "2026-1",
      techStack: ["Python", "NumPy", "Matplotlib"],
      links: {
        post: "#simulation-implementation",
        github: "",
        demo: "",
      },
    },
    {
      title: "로봇 팔 제작 활동",
      slug: "robot-arm-project",
      description: "로봇 팔의 구조 설계, 제작, 제어 과정을 정리한 프로젝트",
      category: "robot-arm",
      semester: "2026-1",
      techStack: ["Python", "Arduino", "3D Modeling"],
      links: {
        post: "#robot-arm-project",
        github: "",
        demo: "",
      },
    },
  ],

  studyCategories: [
    {
      title: "Python",
      category: "python",
      description: "문법, 알고리즘, 데이터 처리, 실습 기록",
    },
    {
      title: "Mathematics",
      category: "mathematics",
      description: "미적분, 선형대수, 확률 등 공학 기초 수학 정리",
    },
    {
      title: "Engineering Basics",
      category: "engineering-basics",
      description: "물리, 회로, 제어, 실험 과정에서 배운 내용",
    },
    {
      title: "Reading Notes",
      category: "reading-notes",
      description: "논문, 책, 강의 자료를 읽고 정리한 메모",
    },
  ],
};
