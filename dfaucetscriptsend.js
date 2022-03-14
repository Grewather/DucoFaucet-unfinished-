let form = document.querySelector("#owo");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#username").value;
  const captcha = document.querySelector("#g-recaptcha-response").value;
  sendItemToBackend(name, captcha);
});

function sendItemToBackend(name, captcha) {
  return fetch("http://127.0.0.1:8888/username", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, captcha }),
  });
}
