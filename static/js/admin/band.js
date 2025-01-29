const inputBandId = document.getElementById("input-band-id");
const inputBandName = document.getElementById("input-band-name");
const inputBandDescription = document.getElementById("input-band-description");
const inputBandSpotify = document.getElementById("input-band-spotify");
const inputBandInstagram = document.getElementById("input-band-instagram");
const inputBandCover = document.getElementById("input-band-cover");
const inputBandLogo = document.getElementById("input-band-logo");
const viewImageCover = document.getElementById("view-image-cover");
const viewImageLogo = document.getElementById("view-image-logo");
const modalViewImage = document.getElementById("modal-view-image");
const buttonForm = document.getElementById("button-form");
const imageView = document.getElementById("image-view");
const buttonHideModal = document.getElementById("hide-modal");
const buttonReset = document.getElementById("button-reset");
const buttonEdit = document.querySelectorAll("#button-edit");
const contaienr = document.getElementById("container");
const formControlViewCover = document.getElementById("form-control-view-cover");
const formControlViewLogo = document.getElementById("form-control-view-logo");
const showImage = document.querySelectorAll("#show-image");

inputBandCover.addEventListener("change", (event) => {
  formControlViewCover.classList.remove("hidden");
  viewImageCover.addEventListener("click", (e) => {
    imageView.src = URL.createObjectURL(event.target.files[0]);
    modalViewImage.showModal();
  });
});

inputBandLogo.addEventListener("change", (event) => {
  formControlViewLogo.classList.remove("hidden");
  viewImageLogo.addEventListener("click", (e) => {
    imageView.src = URL.createObjectURL(event.target.files[0]);
    modalViewImage.showModal();
  });
});

buttonEdit.forEach((e) => {
  e.addEventListener("click", (event) => {
    inputBandId.value = event.currentTarget.dataset.id;
    inputBandName.value = event.currentTarget.dataset.name;
    inputBandName.focus();
    inputBandDescription.value = event.currentTarget.dataset.description;
    inputBandSpotify.value = event.currentTarget.dataset.spotify;
    inputBandInstagram.value = event.currentTarget.dataset.instagram;

    formControlViewCover.classList.remove("hidden");
    viewImageCover.addEventListener("click", (a) => {
      imageView.src = e.dataset.cover;
      modalViewImage.showModal();
    });

    formControlViewLogo.classList.remove("hidden");
    viewImageLogo.addEventListener("click", (a) => {
      imageView.src = e.dataset.logo;
      modalViewImage.showModal();
    });

    buttonForm.value = "edit";
    buttonForm.innerHTML = "Edit";
  });
});

buttonReset.addEventListener("click", (event) => {
  event.preventDefault();
  formControlViewCover.classList.add("hidden");
  formControlViewLogo.classList.add("hidden");
  inputBandId.value = "";
  buttonForm.value = "";
  buttonForm.innerHTML = "Submit";
  event.target.form.reset();
});

// showImage.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     imageView.src = button.dataset.src;
//     modalViewImage.showModal();
//   });
// });

modalViewImage.addEventListener("close", (event) => {
  imageView.src = "";
});
