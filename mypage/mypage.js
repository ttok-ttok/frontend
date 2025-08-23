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

  // 시트 열기 (코드 입력하기)
  openBtn?.addEventListener('click', () => {
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    switchTab('input');
  });

  // 시트 열기 (나의 초대코드)
  inviteBtn?.addEventListener('click', () => {
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    switchTab('invite');
  });

  // 초대 코드 복사
  const copyBtn = document.getElementById('copyBtn');
  const inviteCodeEl = document.getElementById('inviteCode');

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
  confirmBtn?.addEventListener('click', closeSheet);

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
  const settingBtn = document.getElementById('btnSetting');
  settingBtn?.addEventListener('click', () => {
    window.location.href = './setting/setting.html';
  });
});
