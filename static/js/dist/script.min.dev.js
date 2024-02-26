"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener("click", function (e) {
  var t = e.target.closest("[data-step-id]");
  if (!t) return;
  var r = t.dataset.stepId,
      a = document.querySelector(".price-constructor__step--active"),
      o = document.querySelector(".price-constructor__step[data-step-id=\"".concat(r, "\"]")),
      c = document.querySelector(".price-constructor__button--active"),
      s = document.querySelector(".price-constructor__button[data-step-id=\"".concat(r, "\"]"));
  a.classList.remove("price-constructor__step--active"), o.classList.add("price-constructor__step--active"), c.classList.remove("price-constructor__button--active"), s.classList.add("price-constructor__button--active");
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
var counstructorUserData = {
  carMake: "",
  carModel: "",
  carYear: "",
  rugBackgroundColor: "beige",
  rugOutlineColor: "beige",
  setType: "",
  hasThrust: !1
};
var marksUrl = "https://api.auto.ria.com/categories/1/marks/";

function getModelsByMake(e) {
  var t, r;
  return regeneratorRuntime.async(function getModelsByMake$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.auto.ria.com/categories/1/marks/" + e + "/models"));

        case 2:
          t = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(t.json());

        case 5:
          r = _context.sent;
          return _context.abrupt("return", r);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function handleCarSelect(e) {
  var t = e.target,
      r = t.name,
      a = t.value;
  counstructorUserData[r] = a;
}

function handleColorSelect(e) {
  handleCarSelect(e), rugImage.src = "../static/images/price-constructor/color-combinations/".concat(counstructorUserData.rugBackgroundColor, "-").concat(counstructorUserData.rugOutlineColor, ".jpg");
}

document.addEventListener("DOMContentLoaded", function _callee() {
  var e, t, r, a, o;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e = new Date(), t = 1990, r = +e.getFullYear();

          for (a = t; a <= r; a++) {
            o = "<option value=\"".concat(a, "\">").concat(a, "</option>");
            carYearSelectEl.insertAdjacentHTML("beforeend", o);
          }

          carYearSelect.update();

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}), carMakeSelectEl.addEventListener("change", function _callee2(e) {
  var t, r, a, o;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          t = e.target, r = t.value, a = t.options[t.selectedIndex].textContent;
          counstructorUserData.carMake = a, counstructorUserData.carModel = "";
          _context3.next = 4;
          return regeneratorRuntime.awrap(getModelsByMake(r));

        case 4:
          o = _context3.sent;
          o && (carModelSelectEl.innerHTML = '<option selected="true" value="none" disabled="disabled">Car model</option>', o.forEach(function (e) {
            var t = "<option value=\"".concat(e.name, "\">").concat(e.name, "</option>");
            carModelSelectEl.insertAdjacentHTML("beforeend", t);
          }), carModelSelect.update());

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}), carModelSelectEl.addEventListener("change", handleCarSelect), carYearSelectEl.addEventListener("change", handleCarSelect), bgColorSelectEl.addEventListener("change", handleColorSelect), outlineColorSelectEl.addEventListener("change", handleColorSelect);
var thrustBearerCheck = document.getElementById("thrust-bearer");
document.addEventListener("click", function (e) {
  var t = e.target.closest(".card-step__button");
  if (!t) return;
  var r = t.value;
  counstructorUserData[t.name] = r, "ekonom" !== r && (counstructorUserData.hasThrust = !0, thrustBearerCheck.checked = !1);
  var a = document.querySelector(".card-step--active");
  a && a.classList.remove("card-step--active"), t.closest(".card-step").classList.add("card-step--active");
}), thrustBearerCheck.addEventListener("change", function (e) {
  counstructorUserData.hasThrust = e.target.checked;
});
var constructorForm = document.getElementById("price-constructor-form"),
    giftForm = document.getElementById("gift-form"),
    feedbackForm = document.getElementById("feedback-form"),
    baseUrl = "http://127.0.0.1:5000",
    submitToast = {
  text: "Your message was sent successfully!",
  duration: 6e3,
  close: !0,
  gravity: "bottom",
  position: "right",
  stopOnFocus: !0,
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
            throw Error("Something went wrong!");
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

feedbackForm.addEventListener("submit", function _callee3(e) {
  var t, r, a;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          e.preventDefault();
          t = e.target["user-email"], r = e.target["user-name"], a = e.target["user-message"];
          Toastify(_objectSpread({}, submitToast, {
            text: "Your message was sent successfully!"
          })).showToast(), r.value = "", t.value = "", a.value = "";

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}), giftForm.addEventListener("submit", function _callee4(e) {
  var t;
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          e.preventDefault();
          t = e.target["user-phone"];
          Toastify(_objectSpread({}, submitToast)).showToast(), t.value = "";

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}), constructorForm.addEventListener("submit", function _callee5(e) {
  var t, r, a;
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          e.preventDefault();
          t = e.target["user-name"], r = e.target["user-email"], a = e.target["user-phone"];
          counstructorUserData = _objectSpread({}, counstructorUserData, {
            userName: t.value,
            userEmail: r.value,
            userPhone: a.value
          }), Toastify(_objectSpread({}, submitToast)).showToast(), t.value = "", r.value = "", a.value = "";

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});