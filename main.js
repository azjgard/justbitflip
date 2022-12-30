import "./style.css";
import axios from "axios";
import bit0 from "./bit0.svg";
import bit1 from "./bit1.svg";

const BASE_URL = "https://api.justbitflip.com/v1/bits/";

const displayError = (e) => {
  const message = e.response && e.response.data ? e.response.data : e.message;
  console.error(e);
  $("#error-toast .title").text("Failed to set bit");
  $("#error-toast .toast-body").text(message);
  $("#error-toast").toast("show");
};

const displaySuccessMessage = (message) => {
  $("#success-toast .toast-body").html(message);
  $("#success-toast").toast("show");
};

//
// Functionality for the "store" request button
//
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

  const isJson = /^\{(.|\n)*\}$/.test(payload);
  const contentTypeHeader = isJson ? "application/json" : "text/plain";

  let payloadParsed = payload;
  if (isJson) {
    try {
      payloadParsed = JSON.parse(payload);
    } catch {}
  }

  try {
    await axios.post(`${BASE_URL}${key}`, payloadParsed, {
      headers: {
        "Content-Type": contentTypeHeader,
      },
    });
    displaySuccessMessage(
      "<span>Data stored successfully in <strong>" + key + "</strong> "
    );
  } catch (e) {
    displayError(e);
  }

  storeRequestSubmitButton.classList.remove("loading");
});

//
// Functionality for the "read" request button
//
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
    readRequestOutput.textContent = JSON.stringify(result.data);
  } catch (e) {
    displayError(e);
  }

  readRequestSubmitButton.classList.remove("loading");
});

//
// Generate random values to populate the demo inputs with
//
const getRandomValue = (size) =>
  btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(size))))
    .replaceAll("+", "x")
    .replaceAll("/", "I")
    .slice(0, size);

const randomValue = getRandomValue(8);
storeRequestKeyInput.value = randomValue;
readRequestKeyInput.value = randomValue;

storeRequestKeyInput.addEventListener("input", (e) => {
  const value = e.target.value;
  readRequestKeyInput.value = value;
});
readRequestKeyInput.addEventListener("input", (e) => {
  const value = e.target.value;
  storeRequestKeyInput.value = value;
});

//
// Functionality for the logo to bit flip
//
const bitIcon = document.querySelector("#logo img");
let currentBit = 0;
setInterval(() => {
  currentBit = currentBit === 0 ? 1 : 0;
  bitIcon.src = currentBit === 0 ? bit0 : bit1;
}, 1500);
