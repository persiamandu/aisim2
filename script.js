​function generatePDF() {
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
