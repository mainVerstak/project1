// SMS modal
// NOTE: No copy! It just for show
function codeInput(formId, maxLenght = 6, rightValue = "123456") {
  const form = document.getElementById(formId);
  const smsInput = form.querySelector(".sms-input");
  const codeBoxes = form.querySelectorAll(".code-box");

  smsInput.value = "";

  const resendSmsCodeButton = form.querySelector(".resend-sms-code-trigger");
  const smsCodeCountdown = form.querySelector(".sms-code-countdown");

  const smsCodeFeedbackError = form.querySelector(".sms-code-feedback-error");

  smsInput.addEventListener("input", function (e) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    // Update boxes
    codeBoxes.forEach((box, index) => {
      box.textContent = value[index] || "";
      box.classList.toggle("filled", index < value.length);
      box.classList.toggle("active", index === value.length);
    });

    if (e.target.value.length === maxLenght) {
      // waiting for UX
      setTimeout(() => {
        smsCodeFeedbackError.classList.add("hidden");
        smsCodeCountdown.classList.add("hidden");
        resendSmsCodeButton.classList.add("hidden");
        // sent code
        submitCode(e.target.value);
      }, 300);
    }
  });
  smsInput.addEventListener("click", (e) => {
    smsInput.focus();
  });

  smsInput.addEventListener("focus", function () {
    const currentLength = this.value.length;
    codeBoxes.forEach((box, index) => {
      box.classList.toggle("active", index === currentLength);
    });
  });
  smsInput.addEventListener("paste", function (e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const code = paste.replace(/[^0-9]/g, "").slice(0, maxLenght);

    this.value = code;
    this.dispatchEvent(new Event("input")); // Trigger input event
  });

  function submitCode(code) {
    const codeInputContainer = form.querySelector(".sms-code-input");
    codeInputContainer.classList.add("has-feedback");
    codeInputContainer.classList.remove("has-error");
    codeInputContainer.classList.remove("has-success");
    smsCodeFeedbackError.classList.add("hidden");

    if (code === rightValue) {
      codeInputContainer.classList.add("has-success");
    } else {
      codeInputContainer.classList.add("has-error");
      smsCodeFeedbackError.classList.remove("hidden");
    }
  }
}

function startCountdown(formId) {
  const form = document.getElementById(formId);
  const countdown = form.querySelector(".countdown");
  const resendSmsCodeButton = form.querySelector(".resend-sms-code-trigger");
  const smsCodeCountdown = form.querySelector(".sms-code-countdown");

  resendSmsCodeButton.style.display = "none";
  smsCodeCountdown.style.display = "inline-block";
  let timeLeft = 5;
  countdown.textContent = timeLeft;
  const promise = new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      timeLeft--;
      countdown.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        resolve();
      }
    }, 1000);
  });
  promise.then(() => {
    resendSmsCodeButton.style.display = "inline-block";
    smsCodeCountdown.style.display = "none";
  });
}

codeInput("form_code_sms");
codeInput("form_code_call", 4, "1234");
