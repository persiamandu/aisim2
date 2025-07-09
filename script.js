document.addEventListener("DOMContentLoaded", function () {
function switchLanguage(lang) {
  document.documentElement.setAttribute('data-lang', lang);
}

function showStep(stepId) {
  const currentStep = document.querySelector('.step.active');
  if (currentStep) {
    stepHistory.push(currentStep.id);
    currentStep.classList.remove('active');
  }
  document.getElementById(stepId).classList.add('active');
}

function goBack() {
  if (stepHistory.length > 0) {
    const previousStep = stepHistory.pop();
    const currentStep = document.querySelector('.step.active');
    if (currentStep) currentStep.classList.remove('active');
    document.getElementById(previousStep).classList.add('active');
  }
}

const stepHistory = [];
const form = document.getElementById('surveyForm');
const nextBtn = document.getElementById('nextBtn');

form.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', checkFormStatus);
  el.addEventListener('change', checkFormStatus);
});

function checkFormStatus() {
  const formData = new FormData(form);
  const requiredFields = [
    formData.get('income'),
    formData.get('crisis'),
    formData.get('housing'),
    formData.get('alone'),
    formData.get('insurance'),
    formData.get('hospital'),
    formData.get('support'),
    formData.get('urgent')
  ];
  const isComplete = requiredFields.every(val => val && val.length > 0);
  nextBtn.disabled = !isComplete;
}

nextBtn.onclick = function () {
  if (!nextBtn.disabled) {
    document.getElementById('loadingOverlay').style.display = 'flex';
    setTimeout(() => {
      document.getElementById('loadingOverlay').style.display = 'none';
      showStep('step3');
      renderRecommendation();
    }, 1200);
  }
};

function renderRecommendation() {
  const formData = new FormData(form);
  const urgent = formData.get('urgent');
  const support = formData.get('support');
  const income = formData.get('income');
  const recommendationArea = document.getElementById('recommendationArea');
  recommendationArea.innerHTML = '';

  const services = [];
  if (urgent === '생계') {
    services.push(`<div class="card">
      <strong>긴급복지지원 (생계비)</strong>
      <ul><li>지원: 월 473,000원</li><li>기관: ○○동 주민센터</li></ul>
    </div>`);
  }
  if (support === '예') {
    services.push(`<div class="card">
      <strong>방문건강관리서비스</strong>
      <ul><li>지원: 간호사 방문, 복약지도</li><li>기관: ○○보건소</li></ul>
    </div>`);
  }
  if (income === '없음') {
    services.push(`<div class="card">
      <strong>식료품 지원 (푸드뱅크)</strong>
      <ul><li>지원: 식료품 월 1회</li><li>기관: ○○사회복지관</li></ul>
    </div>`);
  }

  if (services.length === 0) {
    recommendationArea.innerHTML = '<div class="card" style="background:#fff3cd;">해당 조건에 맞는 복지서비스가 현재 없습니다.</div>';
  } else {
    recommendationArea.innerHTML = services.join('');
  }
}

function generatePDF() {
  const step4Content = document.querySelector('#step4 .card')?.outerHTML || '';
  const selectHTML = document.querySelector('#step4 select')?.outerHTML || '';
  const textareaHTML = document.querySelector('#step4 textarea')?.outerHTML || '';

  const popup = window.open('', 'popup', 'width=800,height=600');

  popup.document.write(`
    <html>
    <head>
      <title>상담 결과</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          padding: 20px;
          background-color: #f9f9f9;
        }
        textarea {
          width: 100%;
          height: 120px;
          margin-top: 1rem;
        }
        select {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.5rem;
        }
        .popup-btn-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 2rem;
        }
        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
      </style>
    </head>
    <body>
      <h2>STEP 4: 상담사 연계조치</h2>
      ${step4Content}
      <div style="margin-top:1rem">
        <label>연계기관 선택</label><br>
        ${selectHTML}
      </div>
      <div style="margin-top:1rem">
        <label>상담자 의견</label><br>
        ${textareaHTML}
      </div>
      <div class="popup-btn-container">
        <button type="button" onclick="submitPopupForm()">제출 및 저장</button>
        <button type="button" onclick="history.back()">← 뒤로가기</button>
        <button type="button" onclick="alert('자료가 정상적으로 저장 및 전송되었습니다.')">전송</button>
      </div>
      <script>
        function submitPopupForm() {
          alert("자료가 정상적으로 저장되었습니다.");
          window.close();
        }
      <\/script>
    </body>
    </html>
  `);

  popup.document.close();
}
}); // DOMContentLoaded 끝
