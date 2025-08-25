document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const nextBtn = document.getElementById("nextBtn");

  const nameInput = document.getElementById("user-name");
  const idInput = document.getElementById("user-id");
  const pwInput = document.getElementById("user-pw");
  const pwConfirmInput = document.getElementById("user-pw-confirm");

  const nameError = document.getElementById("name-error");
  const idError = document.getElementById("id-error");
  const pwError = document.getElementById("pw-error");
  const checkIdBtn = document.getElementById("checkIdBtn");

  let isNameValid = false;
  let isIdValid = false;
  let isPwValid = false; // 비밀번호 규칙 체크
  let isPwMatch = false; // 비밀번호 일치 여부

  // ===== 비밀번호 눈 버튼 =====
  document.querySelectorAll(".eye-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // ===== 이름: 한글만 허용 =====
  nameInput.addEventListener("input", () => {
    const regex = /^[ㄱ-힣]+$/;
    if (!regex.test(nameInput.value)) {
      nameError.textContent = "한글만 입력 가능합니다.";
      isNameValid = false;
    } else {
      nameError.textContent = "";
      isNameValid = true;
    }
    checkFormValid();
  });

  // ===== 아이디: 6~12자, 영문/숫자 허용 =====
  idInput.addEventListener("input", () => {
    const regex = /^[A-Za-z0-9]{6,12}$/; // ← 여기 $$ 오타 수정
    if (!regex.test(idInput.value)) {
      idError.textContent = "아이디는 6~12자의 영문/숫자만 가능합니다.";
      idError.className = "error-message";
      isIdValid = false;
    } else {
      idError.textContent = "";
      idError.className = "";
      isIdValid = true;
    }
    checkFormValid();
  });

  // ===== 아이디: 서버 중복 검사 =====
  checkIdBtn.addEventListener("click", async () => {
    const idValue = idInput.value.trim();
    if (idValue.length < 6) {
      idError.textContent = "아이디는 6자 이상이어야 합니다.";
      idError.className = "error-message";
      isIdValid = false;
      checkFormValid();
      return;
    }

    try {
      // TODO: 서버 API 엔드포인트 교체
      const res = await fetch(`/api/check-id?userId=${idValue}`);
      const data = await res.json();

      if (data.exists) {
        idError.textContent = "중복된 아이디입니다. 다른 아이디를 입력하세요.";
        idError.className = "error-message";
        isIdValid = false;
      } else {
        idError.textContent = "사용 가능한 아이디입니다.";
        idError.className = "success-message";
        isIdValid = true;
      }
    } catch (err) {
      idError.textContent = "서버 오류가 발생했습니다.";
      idError.className = "error-message";
      isIdValid = false;
    }
    checkFormValid();
  });

  // ===== 비밀번호: 8자 이상, 영문/숫자만 허용 =====
  pwInput.addEventListener("input", () => {
    const regex = /^[A-Za-z0-9]{8,}$/;
    if (!regex.test(pwInput.value)) {
      pwError.textContent =
        "비밀번호는 8자 이상이어야 하며, 영문/숫자를 포함해야 합니다.";
      pwError.className = "error-message";
      isPwValid = false;
    } else {
      pwError.textContent = "";
      pwError.className = "";
      isPwValid = true;
    }
    validatePasswords();
  });

  // ===== 비밀번호 확인 =====
  function validatePasswords() {
    if (
      pwInput.value.trim() &&
      pwConfirmInput.value.trim() &&
      pwInput.value !== pwConfirmInput.value
    ) {
      pwError.textContent = "비밀번호가 다릅니다. 다시 확인해 주세요.";
      pwError.className = "error-message";
      isPwMatch = false;
    } else if (pwInput.value && pwConfirmInput.value) {
      isPwMatch = true;
    } else {
      isPwMatch = false;
    }
    checkFormValid();
  }

  pwInput.addEventListener("input", validatePasswords);
  pwConfirmInput.addEventListener("input", validatePasswords);

  // ===== 모든 조건 확인 후 버튼 활성화 =====
  function checkFormValid() {
    if (isNameValid && isIdValid && isPwValid && isPwMatch) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  }

  const userType = localStorage.getItem("selectedOption");

  // ===== 폼 제출 =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!nextBtn.disabled) {
      // ✅ 로컬스토리지에 저장
      localStorage.setItem("signupName", nameInput.value.trim());
      localStorage.setItem("signupId", idInput.value.trim());
      localStorage.setItem("signupPw", pwInput.value.trim());

      console.log("✅ 회원가입 정보 저장 완료:", {
        name: nameInput.value.trim(),
        id: idInput.value.trim(),
        pw: pwInput.value.trim(),
      });

      // 회원 유형에 따라 다음 페이지 이동
      if (userType === "senior") {
        window.location.href = "../signup_s/signup_s.html";
      } else if (userType === "guardian") {
        window.location.href = "../signup_g/signup_g.html";
      }
    }
  });
});
