(() => {

  const form = document.getElementById('profileForm');

  const name = document.getElementById('name');
  const birth = document.getElementById('birth');
  const email = document.getElementById('email');
  const blog = document.getElementById('blog');

  const phone1 = document.getElementById('phone1');
  const phone2 = document.getElementById('phone2');
  const phone3 = document.getElementById('phone3');

  const height = document.getElementById('height');
  const weight = document.getElementById('weight');
  const memo = document.getElementById('memo');

  const weightValue = document.getElementById('weightValue');

  const previewName = document.getElementById('previewName');
  const previewMeta = document.getElementById('previewMeta');
  const previewMemo = document.getElementById('previewMemo');

  const heightChip = document.getElementById('heightChip');
  const weightChip = document.getElementById('weightChip');
  const contactChip = document.getElementById('contactChip');

  const avatar = document.getElementById('avatar');

  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  const status = document.getElementById('status');
  const toast = document.getElementById('toast');

  function showToast(message){

    toast.textContent = message;

    toast.classList.add('show');

    clearTimeout(showToast.timer);

    showToast.timer =
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2200);

  }

  function getGender(){

    const checked =
      document.querySelector('input[name="gender"]:checked');

    return checked ? checked.value : '';

  }

  function formatDate(value){

    if(!value) return '생년월일';

    const [y,m,d] = value.split('-');

    return `${y}.${m}.${d}`;

  }

  function update(){

    const n = name.value.trim();
    const g = getGender();
    const b = birth.value;

    const phone =
      [phone1.value, phone2.value.trim(), phone3.value.trim()]
      .filter(Boolean)
      .join('-');

    weightValue.textContent =
      `${weight.value} kg`;

    previewName.textContent =
      n || '이름을 입력하세요';

    avatar.textContent =
      n ? n.charAt(0).toUpperCase() : 'P';

    previewMeta.textContent =
      `${formatDate(b)} · ${g || '성별'}`;

    heightChip.textContent =
      `신장 ${height.value || '--'} cm`;

    weightChip.textContent =
      `몸무게 ${weight.value} kg`;

    contactChip.textContent =
      phone2.value.trim() && phone3.value.trim()
      ? `연락처 ${phone}`
      : '연락처 미입력';

    previewMemo.textContent =
      memo.value.trim() ||
      '참고사항이 여기에 표시됩니다.';

    const checks = [
      !!n,
      !!g,
      !!b,
      !!email.value.trim(),
      !!blog.value.trim(),
      !!phone2.value.trim() && !!phone3.value.trim(),
      !!height.value,
      !!memo.value.trim()
    ];

    const percent =
      Math.round(
        checks.filter(Boolean).length /
        checks.length * 100
      );

    progressBar.style.width =
      `${percent}%`;

    progressText.textContent =
      `${percent}%`;

    status.textContent =
      percent === 100
      ? '입력 완료'
      : '입력 중';

  }

  function data(){

    return {
      name:name.value,
      gender:getGender(),
      birth:birth.value,
      email:email.value,
      blog:blog.value,
      phone1:phone1.value,
      phone2:phone2.value,
      phone3:phone3.value,
      height:height.value,
      weight:weight.value,
      memo:memo.value
    };

  }

  function save(){

    localStorage.setItem(
      'profileAssignmentData',
      JSON.stringify(data())
    );

    showToast(
      '현재 입력 내용이 브라우저에 저장되었습니다.'
    );

  }

  function load(){

    const raw =
      localStorage.getItem(
        'profileAssignmentData'
      );

    if(!raw){

      showToast(
        '저장된 내용이 없습니다.'
      );

      return;

    }

    const d = JSON.parse(raw);

    name.value =
      d.name || '';

    document
      .querySelectorAll('input[name="gender"]')
      .forEach(r => {
        r.checked =
          r.value === d.gender;
      });

    birth.value =
      d.birth || '';

    email.value =
      d.email || '';

    blog.value =
      d.blog || '';

    phone1.value =
      d.phone1 || '010';

    phone2.value =
      d.phone2 || '';

    phone3.value =
      d.phone3 || '';

    height.value =
      d.height || '178';

    weight.value =
      d.weight || '70';

    memo.value =
      d.memo || '';

    update();

    showToast(
      '저장된 프로필을 불러왔습니다.'
    );

  }

  document
    .querySelectorAll(
      '#profileForm input, #profileForm select, #profileForm textarea'
    )
    .forEach(el => {

      el.addEventListener(
        'input',
        update
      );

      el.addEventListener(
        'change',
        update
      );

    });

  document
    .getElementById('saveBtn')
    .addEventListener(
      'click',
      save
    );

  document
    .getElementById('loadBtn')
    .addEventListener(
      'click',
      load
    );

  document
    .getElementById('completeBtn')
    .addEventListener(
      'click',
      () => {

        if(!form.reportValidity()){

          showToast(
            '필수 입력 항목을 확인해 주세요.'
          );

          return;

        }

        update();

        save();

        showToast(
          '프로필 입력이 완료되었습니다.'
        );

      }
    );

  form.addEventListener(
    'reset',
    () => {

      setTimeout(
        () => {

          update();

          showToast(
            '입력 내용이 초기화되었습니다.'
          );

        },
        0
      );

    }
  );

  [phone2, phone3].forEach(
    input => {

      input.addEventListener(
        'input',
        () => {

          input.value =
            input.value
              .replace(/\D/g,'')
              .slice(0,4);

          update();

        }
      );

    }
  );

  update();

})();
