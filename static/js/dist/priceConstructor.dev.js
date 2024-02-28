"use strict";

// price constructor
function navigateTo(nextId) {
  var currentNav = document.querySelector(".price-constructor__nav--active");
  currentNav.classList.remove("price-constructor__nav--active");
  var currentMobileNav = document.querySelector(".price-constructor__mobile-nav--active");
  currentMobileNav.classList.remove("price-constructor__mobile-nav--active");
  var nextNav = document.querySelector(".price-constructor__nav[data-step-id=\"".concat(nextId, "\"]"));
  nextNav.classList.add("price-constructor__nav--active");
  var nextMobileNav = document.querySelector(".price-constructor__mobile-nav[data-step-id=\"".concat(nextId, "\"]"));
  nextMobileNav.classList.add("price-constructor__mobile-nav--active");
}

function slideNext() {
  var currentTab = document.querySelector(".price-constructor__step--active");
  var currentStepId = currentTab.dataset.stepId;
  if (currentStepId >= 4) return;
  slideTo(+currentStepId + 1);
}

function slidePrev() {
  var currentTab = document.querySelector(".price-constructor__step--active");
  var currentStepId = currentTab.dataset.stepId;
  if (currentStepId <= 1) return;
  slideTo(+currentStepId - 1);
}

function slideTo(toStepId) {
  var currentTab = document.querySelector(".price-constructor__step--active");
  var newActiveTab = document.querySelector(".price-constructor__step[data-step-id=\"".concat(toStepId, "\"]"));
  currentTab.classList.remove("price-constructor__step--active");
  newActiveTab.classList.add("price-constructor__step--active");
  navigateTo(toStepId);
}