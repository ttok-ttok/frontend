document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn");

  homeBtn.addEventListener("click", () => {
    console.log("홈으로 이동");
    // TODO: 실제 홈 URL 연결
    alert("홈으로 이동합니다!");
    // window.location.href = "/home.html"; // 실제 홈 경로 지정
  });
});
