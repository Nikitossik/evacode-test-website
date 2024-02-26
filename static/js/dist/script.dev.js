"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// price constructor
document.addEventListener("click", function (e) {
  var target = e.target.closest("[data-step-id]");
  if (!target) return;
  var stepId = target.dataset.stepId;
  var currentTab = document.querySelector(".price-constructor__step--active");
  var newActiveTab = document.querySelector(".price-constructor__step[data-step-id=\"".concat(stepId, "\"]"));
  var activeTabButton = document.querySelector(".price-constructor__button--active");
  var newActiveTabButton = document.querySelector(".price-constructor__button[data-step-id=\"".concat(stepId, "\"]"));
  currentTab.classList.remove("price-constructor__step--active");
  newActiveTab.classList.add("price-constructor__step--active");
  activeTabButton.classList.remove("price-constructor__button--active");
  newActiveTabButton.classList.add("price-constructor__button--active");
}); // initializing selects in price constructor

var carMakeSelectEl = document.getElementById("car-make");
var carModelSelectEl = document.getElementById("car-model");
var carYearSelectEl = document.getElementById("car-year");
var bgColorSelectEl = document.getElementById("rug-background-color");
var outlineColorSelectEl = document.getElementById("rug-outline-color");
var rugImage = document.querySelector('[data-step-id="2"] .constructor-step__image img');
var carMakeSelect = NiceSelect.bind(carMakeSelectEl, {
  searchable: true
});
var carModelSelect = NiceSelect.bind(carModelSelectEl, {
  searchable: true
});
var carYearSelect = NiceSelect.bind(carYearSelectEl, {
  searchable: true
});
var bgColorSelect = NiceSelect.bind(bgColorSelectEl);
var outlineColorSelect = NiceSelect.bind(outlineColorSelectEl);
bgColorSelect.update();
outlineColorSelect.update(); // global object of constructor answers

var counstructorUserData = {
  carMake: "",
  carModel: "",
  carYear: "",
  rugBackgroundColor: "beige",
  rugOutlineColor: "beige",
  setType: "",
  hasThrust: false
}; // function for getting all the models by make id from API

var marksUrl = "https://api.auto.ria.com/categories/1/marks/";

function getModelsByMake(modelId) {
  var res, models;
  return regeneratorRuntime.async(function getModelsByMake$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(marksUrl + modelId + "/models"));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          models = _context.sent;
          return _context.abrupt("return", models);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
} //preloading years


document.addEventListener("DOMContentLoaded", function _callee() {
  var now, firstYear, curentYear, i, yearOption;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          now = new Date();
          firstYear = 1990;
          curentYear = +now.getFullYear();

          for (i = firstYear; i <= curentYear; i++) {
            yearOption = "<option value=\"".concat(i, "\">").concat(i, "</option>");
            carYearSelectEl.insertAdjacentHTML("beforeend", yearOption);
          }

          carYearSelect.update();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // handling different inputs in price constructor

function handleCarSelect(e) {
  var target = e.target;
  var propName = target.name;
  var propValue = target.value;
  counstructorUserData[propName] = propValue;
}

carMakeSelectEl.addEventListener("change", function _callee2(e) {
  var target, makeId, makeName, models;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          target = e.target;
          makeId = target.value;
          makeName = target.options[target.selectedIndex].textContent;
          counstructorUserData.carMake = makeName;
          counstructorUserData.carModel = "";
          _context3.next = 7;
          return regeneratorRuntime.awrap(getModelsByMake(makeId));

        case 7:
          models = _context3.sent;

          if (models) {
            carModelSelectEl.innerHTML = "<option selected=\"true\" value=\"none\" disabled=\"disabled\">Car model</option>";
            models.forEach(function (model) {
              var modelOption = "<option value=\"".concat(model.name, "\">").concat(model.name, "</option>");
              carModelSelectEl.insertAdjacentHTML("beforeend", modelOption);
            });
            carModelSelect.update();
          }

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
carModelSelectEl.addEventListener("change", handleCarSelect);
carYearSelectEl.addEventListener("change", handleCarSelect);

function handleColorSelect(e) {
  handleCarSelect(e);
  rugImage.src = "../static/images/price-constructor/color-combinations/".concat(counstructorUserData.rugBackgroundColor, "-").concat(counstructorUserData.rugOutlineColor, ".jpg");
}

bgColorSelectEl.addEventListener("change", handleColorSelect);
outlineColorSelectEl.addEventListener("change", handleColorSelect); // handle set picking

var thrustBearerCheck = document.getElementById("thrust-bearer");
document.addEventListener("click", function (e) {
  var button = e.target.closest(".card-step__button");
  if (!button) return;
  var setType = button.value;
  counstructorUserData[button.name] = setType;

  if (setType !== "ekonom") {
    counstructorUserData.hasThrust = true;
    thrustBearerCheck.checked = false;
  }

  var activeSet = document.querySelector(".card-step--active");
  if (activeSet) activeSet.classList.remove("card-step--active");
  button.closest(".card-step").classList.add("card-step--active");
}); // handle thrust picking

thrustBearerCheck.addEventListener("change", function (e) {
  counstructorUserData.hasThrust = e.target.checked;
}); //handle submitting constructor form

var constructorForm = document.getElementById("price-constructor-form");
var baseUrl = "http://127.0.0.1:5000";
constructorForm.addEventListener("submit", function _callee3(e) {
  var userName, userEmail, userPhone;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          e.preventDefault();
          userName = e.target["user-name"].value;
          userEmail = e.target["user-email"].value;
          userPhone = e.target["user-phone"].value;
          counstructorUserData = _objectSpread({}, counstructorUserData, {
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone
          });
          fetch("".concat(baseUrl, "/order"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // mode: "no-cors",
              // credentials: "include",
              // "Access-Control-Allow-Origin": baseUrl,

            },
            body: JSON.stringify(counstructorUserData)
          }).then(function (res) {
            if (res.ok) {
              console.log(res);
              return res.json();
            } else throw new Error("Kakaja-to huinia");
          }).then(function (data) {
            return console.log(data);
          })["catch"](function (err) {
            return console.log(err);
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});