document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const radios = form.querySelectorAll("input[type='radio']");
  const nextBtn = document.getElementById("nextBtn");

  // 라디오 선택 시 → 버튼 활성화
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });

  // 진행바 단계 (2단계)
  function setProgress(step) {
    const underline = document.querySelector(".topbar-underline");
    underline.classList.remove("step1", "step2", "step3");
    underline.classList.add(`step${step}`);
  }
  setProgress(2);

  // 제출 시 (다음 단계 이동)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = form.querySelector("input[type='radio']:checked");
    if (selected) {
      console.log("선택된 값:", selected.value);
      window.location.href = "../signup_s2/signup_s2.html";
    }
  });
});
