"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function navigateTo(e) {
  document.querySelector(".price-constructor__nav--active").classList.remove("price-constructor__nav--active");
  document.querySelector(".price-constructor__mobile-nav--active").classList.remove("price-constructor__mobile-nav--active");
  document.querySelector(".price-constructor__nav[data-step-id=\"".concat(e, "\"]")).classList.add("price-constructor__nav--active");
  document.querySelector(".price-constructor__mobile-nav[data-step-id=\"".concat(e, "\"]")).classList.add("price-constructor__mobile-nav--active");
}

function slideNext() {
  var e = document.querySelector(".price-constructor__step--active").dataset.stepId;
  e >= 4 || slideTo(+e + 1);
}

function slidePrev() {
  var e = document.querySelector(".price-constructor__step--active").dataset.stepId;
  e <= 1 || slideTo(+e - 1);
}

function slideTo(e) {
  var t = document.querySelector(".price-constructor__step--active"),
      r = document.querySelector(".price-constructor__step[data-step-id=\"".concat(e, "\"]"));
  t.classList.remove("price-constructor__step--active"), r.classList.add("price-constructor__step--active"), r.scrollIntoView({
    behavior: "smooth"
  }), navigateTo(e);
}

var counstructorUserData = {
  carMake: "",
  carModel: "",
  carYear: "",
  rugBackgroundColor: "beige",
  rugOutlineColor: "beige",
  setType: ""
};
var globalPristineConfig = {
  classTo: "form-field",
  errorClass: "form-field--error",
  errorTextParent: "form-field",
  errorTextTag: "p",
  errorTextClass: "form-help"
},
    stepForms = document.querySelectorAll(".price-constructor__step[data-step-id]"),
    pristineStepForms = {};
stepForms && stepForms.forEach(function (e) {
  var t = _objectSpread({}, globalPristineConfig);

  3 == e.dataset.stepId && (t.classTo = "constructor-step__title", t.errorTextParent = "constructor-step__title"), pristineStepForms[e.dataset.stepId] = new Pristine(e, t), e.addEventListener("submit", function (t) {
    t.preventDefault();
    pristineStepForms[e.dataset.stepId].validate() && slideNext();
  });
});
var mobileNextButton = document.querySelector(".price-constructor__mobile-button--right"),
    mobilePrevButton = document.querySelector(".price-constructor__mobile-button--left"),
    navButtons = document.querySelectorAll(".price-constructor__nav");
mobileNextButton.addEventListener("click", function (e) {
  var t = document.querySelector(".price-constructor__step--active");
  pristineStepForms[t.dataset.stepId].validate() && slideNext();
}), mobilePrevButton.addEventListener("click", function (e) {
  slidePrev();
}), navButtons && navButtons.forEach(function (e) {
  e.addEventListener("click", function (e) {
    var t = document.querySelector(".price-constructor__step--active").dataset.stepId,
        r = e.target.dataset.stepId,
        o = pristineStepForms[t];

    if (t < r) {
      if (!o.validate()) return;
    }

    slideTo(r);
  });
});
var carMakeSelectEl = document.getElementById("car-make"),
    carModelSelectEl = document.getElementById("car-model"),
    carYearSelectEl = document.getElementById("car-year"),
    bgColorSelectEl = document.getElementById("rug-background-color"),
    outlineColorSelectEl = document.getElementById("rug-outline-color"),
    rugImage = document.querySelector('[data-step-id="2"] .constructor-step__image img'),
    carMakeSelect = NiceSelect.bind(carMakeSelectEl, {
  searchable: !0
}),
    carModelSelect = NiceSelect.bind(carModelSelectEl, {
  searchable: !0
}),
    carYearSelect = NiceSelect.bind(carYearSelectEl, {
  searchable: !0
}),
    bgColorSelect = NiceSelect.bind(bgColorSelectEl),
    outlineColorSelect = NiceSelect.bind(outlineColorSelectEl);
bgColorSelect.update(), outlineColorSelect.update();
var marksUrl = "https://api.auto.ria.com/categories/1/marks/";

function getModelsByMake(e) {
  var t;
  return regeneratorRuntime.async(function getModelsByMake$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(marksUrl + e + "/models"));

        case 2:
          t = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(t.json());

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function handleCarSelect(e) {
  var t = e.target,
      r = t.name,
      o = t.value;
  counstructorUserData[r] = o;
}

function handleColorSelect(e) {
  handleCarSelect(e), rugImage.src = "./static/images/price-constructor/color-combinations/".concat(counstructorUserData.rugBackgroundColor, "-").concat(counstructorUserData.rugOutlineColor, ".jpg");
}

document.addEventListener("DOMContentLoaded", function _callee() {
  var e, t, _e;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e = +new Date().getFullYear();

          for (t = 1990; t <= e; t++) {
            _e = "<option value=\"".concat(t, "\">").concat(t, "</option>");
            carYearSelectEl.insertAdjacentHTML("beforeend", _e);
          }

          carYearSelect.update();

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}), carMakeSelectEl.addEventListener("change", function _callee2(e) {
  var t, r, o, a;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          t = e.target, r = t.value, o = t.options[t.selectedIndex].textContent;
          counstructorUserData.carMake = o, counstructorUserData.carModel = "";
          _context3.next = 4;
          return regeneratorRuntime.awrap(getModelsByMake(r));

        case 4:
          a = _context3.sent;
          a && (carModelSelectEl.innerHTML = "<option selected value disabled>Car model</option>", a.forEach(function (e) {
            var t = "<option value=\"".concat(e.name, "\">").concat(e.name, "</option>");
            carModelSelectEl.insertAdjacentHTML("beforeend", t);
          }), carModelSelect.update());

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}), carModelSelectEl.addEventListener("change", handleCarSelect), carYearSelectEl.addEventListener("change", handleCarSelect), bgColorSelectEl.addEventListener("change", handleColorSelect), outlineColorSelectEl.addEventListener("change", handleColorSelect), document.addEventListener("click", function (e) {
  var t = e.target.closest(".card-step__button");
  if (!t) return;
  var r = t.value;
  counstructorUserData[t.name] = r, t.closest(".constructor-step").setTypeInput.setAttribute("value", r);
  var o = document.querySelector(".card-step--active");
  o && o.classList.remove("card-step--active"), t.closest(".card-step").classList.add("card-step--active");
});
var constructorForm = document.querySelector(".price-constructor__step[data-step-id='4']"),
    giftForm = document.getElementById("gift-form"),
    giftPristine = new Pristine(giftForm, globalPristineConfig),
    feedbackForm = document.getElementById("feedback-form"),
    feedbackPristine = new Pristine(feedbackForm, globalPristineConfig),
    submitToast = {
  text: "Your message was sent successfully!",
  duration: 1e5,
  close: !0,
  gravity: "bottom",
  position: "center",
  stopOnFocus: !0,
  offset: {
    y: 50
  },
  className: "form-submit-toast"
};

function sendPost(e, t) {
  return regeneratorRuntime.async(function sendPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", fetch(t, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
          }).then(function (e) {
            if (e.ok) return e.json();
            throw new Error("Something went wrong!");
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getCurrentDate() {
  var e = new Date();
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Toronto"
  }).format(e);
}

feedbackForm.addEventListener("submit", function _callee3(e) {
  var t, r, o, a;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          e.preventDefault();

          if (feedbackPristine.validate()) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return");

        case 3:
          t = e.target["user-email"];
          r = e.target["user-name"];
          o = e.target["user-message"];
          _context5.next = 8;
          return regeneratorRuntime.awrap(sendPost({
            userEmail: t,
            userName: r.value,
            userMessage: o.value,
            date: getCurrentDate()
          }, "/questions"));

        case 8:
          a = _context5.sent;
          Toastify(_objectSpread({}, submitToast, {
            text: a.message
          })).showToast(), r.value = "", t.value = "", o.value = "";

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}), giftForm.addEventListener("submit", function _callee4(e) {
  var t, r;
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          e.preventDefault();

          if (giftPristine.validate()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return");

        case 3:
          t = e.target["user-phone"];
          _context6.next = 6;
          return regeneratorRuntime.awrap(sendPost({
            userPhone: t.value,
            date: getCurrentDate()
          }, "/phone-number"));

        case 6:
          r = _context6.sent;
          Toastify(_objectSpread({}, submitToast, {
            text: r.message
          })).showToast(), t.value = "";

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
}), constructorForm.addEventListener("submit", function _callee5(e) {
  var t, r, o, a;
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          e.preventDefault();
          t = e.target["user-name"], r = e.target["user-email"], o = e.target["user-phone"];
          counstructorUserData = _objectSpread({}, counstructorUserData, {
            userName: t.value,
            userEmail: r.value,
            userPhone: o.value,
            date: getCurrentDate()
          });
          _context7.next = 5;
          return regeneratorRuntime.awrap(sendPost(counstructorUserData, "/order"));

        case 5:
          a = _context7.sent;
          Toastify(_objectSpread({}, submitToast, {
            text: a.message
          })).showToast(), t.value = "", r.value = "", o.value = "";

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
});