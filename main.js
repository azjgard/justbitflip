import "./style.css";
import axios from "axios";

const BASE_URL = "https://api.justbitflip.com/v1/bits/";

const storeRequestKeyInput = document.getElementById(
  "store-request--key-input"
);
const storeRequestPayloadInput = document.getElementById(
  "store-request--payload-input"
);
const storeRequestSubmitButton = document.getElementById(
  "store-request--submit-button"
);
storeRequestSubmitButton.addEventListener("click", async () => {
  const key = storeRequestKeyInput.value;
  const payload = storeRequestPayloadInput.value;

  storeRequestSubmitButton.classList.add("loading");

  let payloadParsed = payload;
  try {
    payloadParsed = JSON.parse(payload);
  } catch {}

  try {
    await axios.post(`${BASE_URL}${key}`, payloadParsed);
    readRequestSubmitButton.classList.remove("loading");
  } catch (e) {
    console.error(e);
    storeRequestSubmitButton.classList.remove("loading");
    $("#error-toast .title").text("Failed to set bit");
    $("#error-toast .toast-body").text(e.message);
    $("#error-toast").toast("show");
  }
});

const readRequestKeyInput = document.getElementById("read-request--key-input");
const readRequestOutput = document.getElementById("read-request--output");
const readRequestSubmitButton = document.getElementById(
  "read-request--submit-button"
);
readRequestSubmitButton.addEventListener("click", async () => {
  const key = readRequestKeyInput.value;

  readRequestSubmitButton.classList.add("loading");

  try {
    const result = await axios.get(`${BASE_URL}${key}`);
    readRequestOutput.textContent = result.data;
    readRequestSubmitButton.classList.remove("loading");
  } catch (e) {
    console.error(e);
    readRequestSubmitButton.classList.remove("loading");
    $("#error-toast .title").text("Failed to get bit");
    $("#error-toast .toast-body").text(e.message);
    $("#error-toast").toast("show");
  }
});
