const inputBandId = document.getElementById("input-band-id");
const inputBandName = document.getElementById("input-band-name");
const inputBandDescription = document.getElementById("input-band-description");
const inputBandSpotify = document.getElementById("input-band-spotify");
const inputBandInstagram = document.getElementById("input-band-instagram");
const inputBandCover = document.getElementById("input-band-cover");
const inputBandLogo = document.getElementById("input-band-logo");
const editImageCover = document.getElementById("edit-image-cover");
const editImageLogo = document.getElementById("edit-image-logo");
const modalImageView = document.getElementById("image-view");
const modalImage = document.getElementById("modal-image");
const buttonHideModal = document.getElementById("hide-modal");
const buttonShowModal = document.querySelectorAll("#show-modal");
const buttonReset = document.getElementById("button-reset");
const buttonForm = document.getElementById("button-form");
const buttonEdit = document.querySelectorAll("#button-edit");
const contaienr = document.getElementById("container");

inputBandCover.addEventListener("change", (event) => {
  editImageCover.replaceChildren();
  let image = document.createElement("img");
  image.classList.add("max-w-44");
  image.classList.add("aspect-auto");
  image.classList.add("mx-auto");
  image.classList.add("mt-10");
  image.src = URL.createObjectURL(event.target.files[0]);
  editImageCover.appendChild(image);
});

inputBandLogo.addEventListener("change", (event) => {
  editImageLogo.replaceChildren();
  let image = document.createElement("img");
  image.classList.add("max-w-44");
  image.classList.add("aspect-auto");
  image.classList.add("mx-auto");
  image.classList.add("mt-10");
  image.src = URL.createObjectURL(event.target.files[0]);
  editImageLogo.appendChild(image);
});

buttonEdit.forEach((e) => {
  e.addEventListener("click", (event) => {
    inputBandId.value = event.currentTarget.dataset.id;
    inputBandName.value = event.currentTarget.dataset.name;
    inputBandName.focus();
    inputBandDescription.value = event.currentTarget.dataset.description;
    inputBandSpotify.value = event.currentTarget.dataset.spotify;
    inputBandInstagram.value = event.currentTarget.dataset.instagram;
    editImageCover.replaceChildren();
    editImageLogo.replaceChildren();
    let imageCover = document.createElement("img");
    imageCover.src = "/" + event.currentTarget.dataset.cover;
    imageCover.classList.add("max-w-60");
    imageCover.classList.add("aspect-auto");
    imageCover.classList.add("mx-auto");
    imageCover.classList.add("mt-10");
    editImageCover.appendChild(imageCover);
    let imageLogo = document.createElement("img");
    imageLogo.src = "/" + event.currentTarget.dataset.logo;
    imageLogo.classList.add("max-w-60");
    imageLogo.classList.add("aspect-auto");
    imageLogo.classList.add("mx-auto");
    imageLogo.classList.add("mt-10");
    editImageLogo.appendChild(imageLogo);
    buttonForm.value = "edit";
    buttonForm.innerHTML = "Edit";
  });
});

buttonReset.addEventListener("click", (event) => {
  event.preventDefault();
  editImageCover.replaceChildren();
  editImageLogo.replaceChildren();
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
