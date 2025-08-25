document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const backBtn = document.querySelector(".icon-back");

  // 뒤로가기 버튼
  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  // 로그인 폼 제출
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userId = document.getElementById("user-id").value.trim();
    const userPw = document.getElementById("user-pw").value.trim();

    if (!userId || !userPw) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    // 실제 서버 연동은 여기서 fetch()로 처리
    // 지금은 테스트용
    console.log("로그인 시도:", { userId, userPw });

    if (userId === "test" && userPw === "1234") {
      alert("로그인 성공! 🎉");
      window.location.href = "../home/home.html"; // 메인 페이지로 이동 가정
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  });
});
