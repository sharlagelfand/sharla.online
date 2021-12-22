// Open modals
function openModal(modalName) {
  document.getElementById(modalName.concat("-modal")).style.display = "block";
}

// Close modals
function closeModal(modalName) {
  document.getElementById(modalName.concat("-modal")).style.display = "none";
}

window.onclick = function(event) {
  var updateModal = document.getElementById("2021-update-modal")
  var talksModal = document.getElementById("talks-modal")
  var otherProjectsModal = document.getElementById("other-projects-modal")
  var keyboardModal = document.getElementById("keyboard-modal")
  var updateModal = document.getElementById("2021-update-modal")

  if (event.target == talksModal) {
    talksModal.style.display = "none";
   } else if (event.target == otherProjectsModal) {
    otherProjectsModal.style.display = "none";
   } else if (event.target == keyboardModal){
     keyboardModal.style.display = "none";
   } else if (event.target == keyboardModal){
     updateModal.style.display = "none";
  }
}

document.addEventListener('keydown', (event) => {

  var updateModal = document.getElementById("2021-update-modal")
  var talksModal = document.getElementById("talks-modal")
  var otherProjectsModal = document.getElementById("other-projects-modal")
  var keyboardModal = document.getElementById("keyboard-modal")

  if (event.key === 'Escape') {
    otherProjectsModal.style.display = "none";
    talksModal.style.display = "none";
    keyboardModal.style.display = "none";
    updateModal.style.display = "none";
  }
})
