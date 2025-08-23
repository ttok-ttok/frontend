document.addEventListener("DOMContentLoaded", () => {
  const condBtns = document.querySelectorAll(".cond-btn");
  const micBtn = document.querySelector(".mic-btn");
  const aiBtn = document.querySelector(".ai-btn");
  const questionText = document.querySelector(".question");

  // 질문 텍스트 설정
  const questionString = [
    "오늘의 컨디션은 어떠신가요?",
    "오늘 식사는 맛있게 하셨어요?",
    "어제 잠은 잘 주무셨어요?",
    "오늘 몸은 어떠세요?",
    "오늘 움직이는데 불편함은 없으셨나요?",
  ];
  const randomIndex = Math.floor(Math.random() * questionString.length);
  questionText.textContent = questionString[randomIndex];

  // 컨디션 버튼 선택
  condBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      condBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      console.log("선택한 컨디션:", btn.dataset.value);
    });
  });

  // 음성 버튼
  micBtn.addEventListener("click", () => {
    alert("🎤 음성 입력 시작 (실제 구현은 Web Speech API 연결)");
  });

  // AI 상담 버튼
  aiBtn.addEventListener("click", () => {
    alert("🤖 AI 똑똑 상담으로 이동합니다.");
    // 실제라면 페이지 이동
    // window.location.href = "ai_chat.html";
  });
});
