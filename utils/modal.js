// Selectors
const modal = document.getElementById("modal");
const modalText = document.querySelector("p");

// Function to show modal with given text
const showModal = (text) => {
  modalText.innerText = text;
  modal.style.display = "flex";
};

// Function to hide modal
const removeModal = () => {
  modal.style.display = "none";
};

export { showModal, removeModal };
