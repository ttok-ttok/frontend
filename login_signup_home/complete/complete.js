document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn");

  homeBtn.addEventListener("click", async () => {
    console.log("회원가입 완료 처리 시작");

    // 📌 로컬스토리지에서 데이터 수집
    const signupData = {
      name: localStorage.getItem("signupName"),
      username: localStorage.getItem("signupId"),
      password: localStorage.getItem("signupPw"),
      takeMedicine: localStorage.getItem("takeMedicine") === "true",
      userType: localStorage.getItem("selectedOption"), // senior | guardian
    };

    console.log("서버 전송 데이터:", signupData);

    try {
      // 📌 TODO: 백엔드 엔드포인트 연결 (회원가입 저장용)
      const res = await fetch("http://43.201.19.8:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await res.json();
      console.log("✅ 서버 응답:", data);

      // 성공 시 로컬스토리지 비우기
      localStorage.clear();

      // 홈으로 이동
      window.location.href = "../home/home.html";
    } catch (err) {
      console.error("❌ 회원가입 완료 처리 실패:", err);
      alert("회원가입 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  });
});
