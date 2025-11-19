// Для открытия модального окна
function _showModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "block";
  modal.classList.add("in");
  const backdrop = document.querySelector(".modal-backdrop");
  backdrop.style.display = "block";
  backdrop.classList.add("in");
}

// Для закрытия модального окна
function _hideModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  modal.classList.remove("in");
  const backdrop = document.querySelector(".modal-backdrop");
  backdrop.style.display = "none";
  backdrop.classList.remove("in");
}
