"use strict";

var ekonomModalContent = document.getElementById("ekonom-modal");
var standartModalContent = document.getElementById("standart-modal");
var premiumModalContent = document.getElementById("premium-modal");
var thrustModalContent = document.getElementById("footrest-modal");
var setModalOptions = {
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Close",
  cssClass: ["modal"]
};
var ekonomSetModal = new tingle.modal(setModalOptions);
var standartModal = new tingle.modal(setModalOptions);
var premiumModal = new tingle.modal(setModalOptions);
var thrustModal = new tingle.modal(setModalOptions);
ekonomSetModal.setContent(ekonomModalContent.outerHTML);
standartModal.setContent(standartModalContent.outerHTML);
premiumModal.setContent(premiumModalContent.outerHTML);
thrustModal.setContent(thrustModalContent.outerHTML);
var setModals = {
  "ekonom-modal": ekonomSetModal,
  "standart-modal": standartModal,
  "premium-modal": premiumModal,
  "footrest-modal": thrustModal
};
document.addEventListener("click", function (e) {
  var target = e.target.closest("[data-modal-id]");
  if (!target || e.target.closest("[data-modal-ignore]")) return;
  var modalId = target.dataset.modalId;
  setModals[modalId].open();
});