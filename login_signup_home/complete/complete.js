document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn");

  homeBtn.addEventListener("click", () => {
    console.log("홈으로 이동");
    window.location.href = "../home/home.html"; // 실제 홈 경로 지정
  });
});
