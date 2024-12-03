const inputBandId = document.getElementById("input-band-id");
const inputBandName = document.getElementById("input-band-name");
const inputBandDescription = document.getElementById("input-band-description");
const inputBandSpotify = document.getElementById("input-band-spotify");
const inputBandInstagram = document.getElementById("input-band-instagram");
const inputBandCover = document.getElementById("input-band-cover");
const editImage = document.getElementById("edit-image");
const modalImageView = document.getElementById("image-view");
const modalImage = document.getElementById("modal-image");
const buttonHideModal = document.getElementById("hide-modal");
const buttonShowModal = document.querySelectorAll("#show-modal");
const buttonReset = document.getElementById("button-reset");
const buttonForm = document.getElementById("button-form");
const buttonEdit = document.querySelectorAll("#button-edit");
const contaienr = document.getElementById("container");

inputBandCover.addEventListener("change", (event) => {
  editImage.replaceChildren();
  let image = document.createElement("img");
  image.classList.add("max-w-44");
  image.classList.add("aspect-auto");
  image.classList.add("mx-auto");
  image.classList.add("mt-10");
  image.src = URL.createObjectURL(event.target.files[0]);
  editImage.appendChild(image);
});

buttonEdit.forEach((e) => {
  e.addEventListener("click", (event) => {
    inputBandId.value = event.currentTarget.dataset.id;
    inputBandName.value = event.currentTarget.dataset.name;
    inputBandName.focus();
    inputBandDescription.value = event.currentTarget.dataset.description;
    inputBandSpotify.value = event.currentTarget.dataset.spotify;
    inputBandInstagram.value = event.currentTarget.dataset.instagram;
    editImage.replaceChildren();
    let image = document.createElement("img");
    image.src = "/" + event.currentTarget.dataset.cover;
    image.classList.add("max-w-60");
    image.classList.add("aspect-auto");
    image.classList.add("mx-auto");
    image.classList.add("mt-10");
    editImage.appendChild(image);
    buttonForm.value = "edit";
    buttonForm.innerHTML = "Edit";
  });
});

buttonReset.addEventListener("click", (event) => {
  event.preventDefault();
  editImage.replaceChildren();
  inputBandId.value = "";
  buttonForm.value = "";
  buttonForm.innerHTML = "Submit";
  event.target.form.reset();
});

buttonShowModal.forEach((e) => {
  e.addEventListener("click", (event) => {
    modalImage.src = event.currentTarget.dataset.src;
    modalImageView.classList.remove("hidden");
    container.classList.add("overflow-hidden");
  });
});

buttonHideModal.addEventListener("click", (event) => {
  modalImageView.classList.add("hidden");
  container.classList.remove("overflow-hidden");
});
