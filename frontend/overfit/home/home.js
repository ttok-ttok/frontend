document.addEventListener("DOMContentLoaded", () => {
  const condBtns = document.querySelectorAll(".cond-btn");
  const micBtn = document.querySelector(".mic-btn");
  const aiBtn = document.querySelector(".ai-btn");

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
