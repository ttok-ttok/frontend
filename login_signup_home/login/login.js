document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const backBtn = document.querySelector(".icon-back");

  // 뒤로가기 버튼
  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  // 로그인 폼 제출
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("user-id").value.trim();
    const userPw = document.getElementById("user-pw").value.trim();

    if (!userId || !userPw) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      // 📌 POST 요청 (서버와 연동)
      const res = await fetch("https://www.ttokttok.n-e.kr/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId, // 서버에서 요구하는 key (username/userId 확인 필요)
          password: userPw,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`서버 오류: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ 로그인 성공:", data);

      // 📌 토큰 저장
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("📦 accessToken 저장 완료:", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("📦 refreshToken 저장 완료:", data.refreshToken);
      }
      if (data.tokenType) {
        localStorage.setItem("tokenType", data.tokenType);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("로그인 성공! 🎉");
      window.location.href = "../home/home.html"; // 홈으로 이동
    } catch (err) {
      console.error("❌ 로그인 실패:", err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  });
});
