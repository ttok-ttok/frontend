document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const checkboxes = form.querySelectorAll("input[type='checkbox']");
  const labels = form.querySelectorAll(".toggle-btn");
  const doneBtn = document.getElementById("doneBtn");

  function updateSelection() {
    const checked = Array.from(checkboxes).filter((cb) => cb.checked);
    // 선택된 갯수에 따라 스타일 반영
    labels.forEach((label) => {
      const input = label.querySelector("input");
      if (input.checked) {
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
    });
    // 조건: 최소 1개, 최대 3개
    if (checked.length >= 1 && checked.length <= 3) {
      doneBtn.disabled = false;
    } else {
      doneBtn.disabled = true;
    }
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const checked = Array.from(checkboxes).filter((c) => c.checked);
      if (checked.length > 3) {
        // 4개 이상 선택 방지: 방금 클릭한 것 해제
        e.target.checked = false;
        alert("최대 3개까지 선택할 수 있습니다.");
      }
      updateSelection();
    });
  });

  // ===== 폼 제출 =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    if (selected.length) {
      // ✅ 로컬스토리지에 저장
      localStorage.setItem("healthConditions", JSON.stringify(selected));
      console.log("✅ 저장된 건강상태:", selected);

      // 다음 단계로 이동
      window.location.href = "../need_alarm/need_alarm.html";
    }
  });
});
