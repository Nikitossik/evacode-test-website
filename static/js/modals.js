const ekonomModalContent = document.getElementById("ekonom-modal");
const standartModalContent = document.getElementById("standart-modal");
const premiumModalContent = document.getElementById("premium-modal");
const thrustModalContent = document.getElementById("footrest-modal");

const setModalOptions = {
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Close",
  cssClass: ["modal"],
};

const ekonomSetModal = new tingle.modal(setModalOptions);
const standartModal = new tingle.modal(setModalOptions);
const premiumModal = new tingle.modal(setModalOptions);
const thrustModal = new tingle.modal(setModalOptions);

ekonomSetModal.setContent(ekonomModalContent.outerHTML);
standartModal.setContent(standartModalContent.outerHTML);
premiumModal.setContent(premiumModalContent.outerHTML);
thrustModal.setContent(thrustModalContent.outerHTML);

const setModals = {
  "ekonom-modal": ekonomSetModal,
  "standart-modal": standartModal,
  "premium-modal": premiumModal,
  "footrest-modal": thrustModal,
};

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-modal-id]");

  if (!target || e.target.closest("[data-modal-ignore]")) return;

  const modalId = target.dataset.modalId;

  setModals[modalId].open();
});
