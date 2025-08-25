document.addEventListener("DOMContentLoaded", () => {
  const condBtns = document.querySelectorAll(".cond-btn");
  const micBtn = document.querySelector(".mic-btn");
  const aiBtn = document.querySelector(".ai-btn");
  const questionText = document.querySelector(".question");
  const conditionIcons = document.querySelector(".condition-icons");

  const selectedOption = localStorage.getItem("selectedOption"); // senior | guardian

  // guardian / senior 모드 분기
  if (selectedOption === "guardian") {
    questionText.textContent = "안녕하세요, 무엇을 도와드릴까요?";
    conditionIcons.style.display = "none"; // 감정 버튼 숨김
  } else {
    // ===== senior 모드 (설문 진행) =====

    // 하루 초기화 체크
    function resetIfNeeded() {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const lastSavedDay = localStorage.getItem("lastSavedDay");

      const resetTime = new Date();
      resetTime.setHours(7, 0, 0, 0);

      if (!lastSavedDay || (now >= resetTime && lastSavedDay !== today)) {
        localStorage.removeItem("dailyAnswers");
        localStorage.removeItem("surveyCompletedDay");
        localStorage.setItem("lastSavedDay", today);
        console.log("✅ dailyAnswers 초기화 완료:", today);
      }
    }
    resetIfNeeded();

    const today = new Date().toISOString().split("T")[0];
    const completedDay = localStorage.getItem("surveyCompletedDay");

    if (completedDay === today) {
      questionText.textContent = "오늘 설문을 이미 완료하셨습니다. 감사합니다!";
      conditionIcons.style.display = "none";
    } else {
      // 기본 질문 목록
      let questionString = [
        "오늘의 컨디션은 어떠신가요?",
        "오늘 식사는 맛있게 하셨어요?",
        "어제 잠은 잘 주무셨어요?",
        "오늘 몸은 어떠세요?",
        "오늘 움직이는데 불편함은 없으셨나요?",
      ];

      // 약 복용 여부에 따라 질문 삽입
      const takeMedicine = localStorage.getItem("takeMedicine") === "true";
      if (takeMedicine) {
        questionString.splice(1, 0, "오늘 약은 드셨나요?");
      }

      let currentIndex = 0;
      const answers = JSON.parse(localStorage.getItem("dailyAnswers") || "[]");

      // 질문 표시
      function showQuestion() {
        if (currentIndex < questionString.length) {
          questionText.textContent = questionString[currentIndex];
        } else {
          questionText.textContent = "모든 질문이 완료되었습니다. 감사합니다!";
          conditionIcons.style.display = "none";
          localStorage.setItem("surveyCompletedDay", today);
        }
      }

      showQuestion();

      // 컨디션 버튼 이벤트
      condBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (currentIndex < questionString.length) {
            const answer = {
              question: questionString[currentIndex],
              response: btn.dataset.value,
              timestamp: new Date().toISOString(),
            };

            answers.push(answer);
            localStorage.setItem("dailyAnswers", JSON.stringify(answers));

            console.log("저장된 답변:", answer);

            currentIndex++;
            showQuestion();
          }
        });
      });
    }
  }

  // ===== 공통 기능 (guardian / senior 모두 사용) =====
  // 음성 버튼
  micBtn.addEventListener("click", () => {
    alert("🎤 음성 입력 시작 (실제 구현은 Web Speech API 연결)");
  });

  // AI 상담 버튼
  aiBtn.addEventListener("click", () => {
    window.location.href = "../chat/chat.html";
  });
});

function alarm_func() {
  try {
    // 로컬스토리지에서 user 객체 꺼내기
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || !userData.type) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // type 값에 따라 페이지 이동
    if (userData.type === "GUARDIAN") {
      window.location.href = "/alarm/alarm_g/alarm_g.html";
    } else if (userData.type === "ELDER") {
      window.location.href = "/alarm/alarm_s/alarm_s.html";
    } else {
      alert("알 수 없는 사용자 유형입니다.");
    }
  } catch (err) {
    console.error("❌ alarm_func 실행 오류:", err);
    alert("사용자 정보를 불러오는데 실패했습니다.");
  }
}
