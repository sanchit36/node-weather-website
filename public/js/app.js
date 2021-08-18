const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "";
  messageTwo.textContent = "";

  const location = search.value;
  messageOne.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        return;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
