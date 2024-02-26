// price constructor

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-step-id]");

  if (!target) return;

  const stepId = target.dataset.stepId;

  const currentTab = document.querySelector(".price-constructor__step--active");
  const newActiveTab = document.querySelector(
    `.price-constructor__step[data-step-id="${stepId}"]`
  );
  const activeTabButton = document.querySelector(
    ".price-constructor__button--active"
  );
  const newActiveTabButton = document.querySelector(
    `.price-constructor__button[data-step-id="${stepId}"]`
  );

  currentTab.classList.remove("price-constructor__step--active");
  newActiveTab.classList.add("price-constructor__step--active");

  activeTabButton.classList.remove("price-constructor__button--active");
  newActiveTabButton.classList.add("price-constructor__button--active");
});

// initializing selects in price constructor

const carMakeSelectEl = document.getElementById("car-make");
const carModelSelectEl = document.getElementById("car-model");
const carYearSelectEl = document.getElementById("car-year");

const bgColorSelectEl = document.getElementById("rug-background-color");
const outlineColorSelectEl = document.getElementById("rug-outline-color");

const rugImage = document.querySelector(
  '[data-step-id="2"] .constructor-step__image img'
);

const carMakeSelect = NiceSelect.bind(carMakeSelectEl, {
  searchable: true,
});
const carModelSelect = NiceSelect.bind(carModelSelectEl, { searchable: true });
const carYearSelect = NiceSelect.bind(carYearSelectEl, { searchable: true });
const bgColorSelect = NiceSelect.bind(bgColorSelectEl);
const outlineColorSelect = NiceSelect.bind(outlineColorSelectEl);

bgColorSelect.update();
outlineColorSelect.update();

// global object of constructor answers

let counstructorUserData = {
  carMake: "",
  carModel: "",
  carYear: "",
  rugBackgroundColor: "beige",
  rugOutlineColor: "beige",
  setType: "",
  hasThrust: false,
};

// function for getting all the models by make id from API

const marksUrl = "https://api.auto.ria.com/categories/1/marks/";

async function getModelsByMake(modelId) {
  const res = await fetch(marksUrl + modelId + "/models");
  const models = await res.json();

  return models;
}

//preloading years

document.addEventListener("DOMContentLoaded", async () => {
  const now = new Date();
  const firstYear = 1990;
  const curentYear = +now.getFullYear();

  for (let i = firstYear; i <= curentYear; i++) {
    const yearOption = `<option value="${i}">${i}</option>`;
    carYearSelectEl.insertAdjacentHTML("beforeend", yearOption);
  }

  carYearSelect.update();
});

// handling different inputs in price constructor

function handleCarSelect(e) {
  const target = e.target;
  const propName = target.name;
  const propValue = target.value;

  counstructorUserData[propName] = propValue;
}

carMakeSelectEl.addEventListener("change", async (e) => {
  const target = e.target;

  const makeId = target.value;
  const makeName = target.options[target.selectedIndex].textContent;

  counstructorUserData.carMake = makeName;
  counstructorUserData.carModel = "";

  const models = await getModelsByMake(makeId);

  if (models) {
    carModelSelectEl.innerHTML = `<option selected="true" value="none" disabled="disabled">Car model</option>`;
    models.forEach((model) => {
      const modelOption = `<option value="${model.name}">${model.name}</option>`;
      carModelSelectEl.insertAdjacentHTML("beforeend", modelOption);
    });
    carModelSelect.update();
  }
});

carModelSelectEl.addEventListener("change", handleCarSelect);
carYearSelectEl.addEventListener("change", handleCarSelect);

function handleColorSelect(e) {
  handleCarSelect(e);
  rugImage.src = `../static/images/price-constructor/color-combinations/${counstructorUserData.rugBackgroundColor}-${counstructorUserData.rugOutlineColor}.jpg`;
}

bgColorSelectEl.addEventListener("change", handleColorSelect);
outlineColorSelectEl.addEventListener("change", handleColorSelect);

// handle set picking

const thrustBearerCheck = document.getElementById("thrust-bearer");

document.addEventListener("click", (e) => {
  const button = e.target.closest(".card-step__button");

  if (!button) return;

  const setType = button.value;

  counstructorUserData[button.name] = setType;

  if (setType !== "ekonom") {
    counstructorUserData.hasThrust = true;
    thrustBearerCheck.checked = false;
  }

  const activeSet = document.querySelector(".card-step--active");

  if (activeSet) activeSet.classList.remove("card-step--active");

  button.closest(".card-step").classList.add("card-step--active");
});

// handle thrust picking

thrustBearerCheck.addEventListener("change", (e) => {
  counstructorUserData.hasThrust = e.target.checked;
});

//handle submitting forms

const constructorForm = document.getElementById("price-constructor-form");
const giftForm = document.getElementById("gift-form");
const feedbackForm = document.getElementById("feedback-form");

const baseUrl = "http://127.0.0.1:5000";

const submitToast = {
  text: "Your message was sent successfully!",
  duration: 6000,
  close: true,
  gravity: "bottom",
  position: "right",
  stopOnFocus: true,
  className: "form-submit-toast",
};

async function sendPost(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else throw new Error("Something went wrong!");
  });
}

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = e.target["user-email"];
  const userName = e.target["user-name"];
  const userMessage = e.target["user-message"];

  // const res = await sendPost(
  //   {
  //     userEmail: userEmail,
  //     userName: userName.value,
  //     userMessage: userMessage.value,
  //   },
  //   baseUrl + "/questions"
  // );
  // console.log(res);
  Toastify({
    ...submitToast,
    text: "Your message was sent successfully!",
  }).showToast();

  userName.value = "";
  userEmail.value = "";
  userMessage.value = "";
});

giftForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userPhone = e.target["user-phone"];

  // const res = await sendPost(
  //   {
  //     userPhone: userPhone.value,
  //   },
  //   baseUrl + "/phone-number"
  // );
  // console.log(res);
  Toastify({
    ...submitToast,
  }).showToast();

  userPhone.value = "";
});

constructorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = e.target["user-name"];
  const userEmail = e.target["user-email"];
  const userPhone = e.target["user-phone"];

  counstructorUserData = {
    ...counstructorUserData,
    userName: userName.value,
    userEmail: userEmail.value,
    userPhone: userPhone.value,
  };

  // const res = await sendPost(counstructorUserData, baseUrl + "/order");
  // console.log(res);
  Toastify({
    ...submitToast,
  }).showToast();

  userName.value = "";
  userEmail.value = "";
  userPhone.value = "";
});
