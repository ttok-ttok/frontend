document.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('codeSheet');
  const openBtn = document.getElementById('btnOpenCode'); // 코드 입력하기 버튼
  const inviteBtn = document.getElementById('btnOpenInvite'); // 나의 초대코드 버튼
  const backdrop = document.getElementById('sheetBackdrop');
  const confirmBtn = document.getElementById('btnConfirm');

  const tabs = document.querySelectorAll('.tab-btn');
  const panels = {
    input: document.getElementById('panel-input'),
    invite: document.getElementById('panel-invite'),
  };

  const copyBtn = document.getElementById('copyBtn');
  const inviteCodeEl = document.getElementById('inviteCode');
  const codeInput = document.getElementById('familyCode');

  const username = localStorage.getItem('username') || 'testUser';
  // ⚠️ 실제 로그인된 유저 username으로 교체 필요

  /* ---------------- API 연동 함수 ---------------- */

  // 🚀 초대코드 발행 (내 코드 확인용)
  async function fetchInviteCode(username) {
    try {
      const res = await fetch(
        `http://43.201.19.8:8080/invite/issue?username=${username}&ttlHours=24`
      );
      if (!res.ok) throw new Error('API 호출 실패');
      const data = await res.json();

      // API 응답이 { code: "xxxx" } 라고 가정
      if (data.code) {
        if (inviteCodeEl) inviteCodeEl.textContent = data.code;
      }
    } catch (err) {
      console.error('초대코드 발급 실패:', err);
    }
  }

  // 🚀 코드 입력 → 보호자-노인 매칭
  async function acceptInvite(username, code) {
    try {
      const res = await fetch(
        `http://43.201.19.8:8080/invite/accept?username=${username}&code=${code}`
      );
      if (!res.ok) throw new Error('API 호출 실패');
      const data = await res.json();

      if (data.success) {
        alert('가족 매칭이 완료되었습니다!');
      } else {
        alert('코드가 유효하지 않습니다.');
      }
    } catch (err) {
      console.error('코드 매칭 실패:', err);
      alert('네트워크 오류가 발생했습니다.');
    }
  }

  /* ---------------- UI 동작 ---------------- */

  // 시트 열기 (코드 입력하기)
  openBtn?.addEventListener('click', () => {
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    switchTab('input');
  });

  // 시트 열기 (나의 초대코드)
  inviteBtn?.addEventListener('click', async () => {
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    switchTab('invite');

    // 🔥 초대코드 불러오기 (탭 열 때마다 API 호출)
    await fetchInviteCode(username);
  });

  // 초대 코드 복사
  copyBtn?.addEventListener('click', () => {
    const code = inviteCodeEl?.textContent.trim();
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          alert('초대 코드가 복사되었습니다!');
        })
        .catch((err) => {
          console.error('복사 실패:', err);
        });
    }
  });

  // 시트 닫기
  backdrop?.addEventListener('click', closeSheet);

  // ✅ 확인 버튼 → 코드 입력 후 accept API 호출
  confirmBtn?.addEventListener('click', async () => {
    const code = codeInput?.value.trim();
    if (!code) {
      alert('코드를 입력해주세요.');
      return;
    }

    await acceptInvite(username, code);
    closeSheet();
  });

  function closeSheet() {
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
  }

  // 탭 전환 함수
  function switchTab(tabName) {
    tabs.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
    panels.input.classList.toggle('is-hidden', tabName !== 'input');
    panels.invite.classList.toggle('is-hidden', tabName !== 'invite');
  }

  // 탭 클릭 시
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // 설정 페이지 이동
  const settingBtn = document.getElementById('btnSetting');
  settingBtn?.addEventListener('click', () => {
    window.location.href = './setting/setting.html';
  });
});
