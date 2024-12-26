function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

function createNewSizeFormGroup(event, size) {
  let formSize = undefined;
  if (size) {
    formSize = document.getElementById("form-sizes-edit");
  } else {
    formSize = document.getElementById("form-sizes");
  }
  const num = formSize.childElementCount / 2 + 1;
  let divGroupParent = document.createElement("div");
  divGroupParent.classList.add(
    "card",
    "card-compact",
    "card-bordered",
    "bg-base-100",
    "w-full"
  );
  divGroupParent.id = "size-" + num;

  let divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body");

  let divCardActions = document.createElement("div");
  divCardActions.classList.add("card-actions", "justify-end");

  let buttonClose = document.createElement("button");
  buttonClose.classList.add("btn", "btn-square", "btn-ghost", "btn-xs");
  buttonClose.dataset.id = "size-" + num;
  buttonClose.id = "button-remove-size";
  buttonClose.type = "button";
  buttonClose.addEventListener("click", (event) => {
    const group = document.getElementById(buttonClose.dataset.id);
    let currentIndex = [...group.parentNode.children].indexOf(group);
    group.parentNode.children[currentIndex + 1].remove();
    group.parentNode.removeChild(group);
  });

  buttonClose.insertAdjacentHTML(
    "beforeend",
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" id="close-svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
  );
  divCardActions.appendChild(buttonClose);

  let divGrid = document.createElement("div");
  divGrid.classList.add(
    "grid",
    "lg:grid-flow-col",
    "sm:grid-flow-row",
    "gap-4",
    "rounded-lg",
    "mb-4"
  );

  let labelSize = document.createElement("label");
  labelSize.classList.add("form-control", "w-full");

  let divLabelSize = document.createElement("div");
  divLabelSize.classList.add("label");

  let spanLabelSize = document.createElement("span");
  spanLabelSize.classList.add("label-text");
  spanLabelSize.innerHTML = "Size";

  divLabelSize.appendChild(spanLabelSize);

  let selectSize = document.createElement("select");
  setAttributes(selectSize, {
    class: "select select-bordered w-full",
    id: "input-clothes-size-" + num,
    name: "size-" + num,
    required: true,
  });

  let optionPlaceholder = document.createElement("option");
  setAttributes(optionPlaceholder, { value: "", selected: true });
  optionPlaceholder.innerHTML = "Choose size";

  let optionXS = document.createElement("option");
  optionXS.value = "XS";
  optionXS.innerHTML = "XS (Extra Small)";
  let optionS = document.createElement("option");
  optionS.value = "S";
  optionS.innerHTML = "S (Small)";
  let optionM = document.createElement("option");
  optionM.value = "M";
  optionM.innerHTML = "M (Medium)";
  let optionL = document.createElement("option");
  optionL.value = "L";
  optionL.innerHTML = "L (Large)";
  let optionXL = document.createElement("option");
  optionXL.value = "XL";
  optionXL.innerHTML = "XL (Extra Large)";
  let optionXXL = document.createElement("option");
  optionXXL.value = "XXL";
  optionXXL.innerHTML = "XXL (Double Extra Large)";
  let optionXXXL = document.createElement("option");
  optionXXXL.value = "XXXL";
  optionXXXL.innerHTML = "XXXL (Triple Extra Large)";
  let optionXXXXL = document.createElement("option");
  optionXXXXL.value = "XXXXL";
  optionXXXXL.innerHTML = "XXXXL (Quadruple Extra Large)";
  let optionXXXXXL = document.createElement("option");
  optionXXXXXL.value = "XXXXXL";
  optionXXXXXL.innerHTML = "XXXXXL (Quintuple Extra Large)";

  selectSize.append(
    optionPlaceholder,
    optionXS,
    optionS,
    optionM,
    optionL,
    optionXL,
    optionXXL,
    optionXXXL,
    optionXXXXL,
    optionXXXXXL
  );
  if (size) {
    selectSize.value = size.fields.size;
  }

  labelSize.append(divLabelSize, selectSize);

  let labelPrice = document.createElement("label");
  labelPrice.classList.add("form-control", "w-full");

  let divLabelPrice = document.createElement("div");
  divLabelPrice.classList.add("label");

  let spanLabelPrice = document.createElement("span");
  spanLabelPrice.classList.add("label-text");
  spanLabelPrice.innerHTML = "Price";

  divLabelPrice.appendChild(spanLabelPrice);

  let labelInputPrice = document.createElement("label");
  labelInputPrice.classList.add(
    "input",
    "input-bordered",
    "flex",
    "items-center",
    "gap-2"
  );

  let spanRp = document.createElement("span");
  spanRp.innerHTML = "Rp.";

  let inputPrice = document.createElement("input");
  setAttributes(inputPrice, {
    type: "number",
    id: "input-clothes-price-" + num,
    class: "grow w-full",
    name: "price-" + num,
    placeholder: "Price",
    required: true,
  });

  if (size) {
    inputPrice.value = size.fields.price;
  }

  let spanPerPcs = document.createElement("span");
  spanPerPcs.innerHTML = "/pcs";

  labelInputPrice.append(spanRp, inputPrice, spanPerPcs);
  labelPrice.append(divLabelPrice, labelInputPrice);

  let labelStock = document.createElement("label");
  labelStock.classList.add("form-control", "w-full");

  let divLabelStock = document.createElement("div");
  divLabelStock.classList.add("label");

  let spanLabelStock = document.createElement("span");
  spanLabelStock.classList.add("label-text");
  spanLabelStock.innerHTML = "Stock";

  divLabelStock.appendChild(spanLabelStock);

  let labelInputStock = document.createElement("label");
  labelInputStock.classList.add(
    "input",
    "input-bordered",
    "flex",
    "items-center",
    "gap-2"
  );

  let inputStock = document.createElement("input");
  setAttributes(inputStock, {
    type: "number",
    id: "input-clothes-stock-" + num,
    class: "grow w-full",
    name: "stock-" + num,
    placeholder: "Stock",
    required: true,
  });

  if (size) {
    inputStock.value = size.fields.stock;
  }

  let spanPcs = document.createElement("span");
  spanPcs.innerHTML = "pcs";

  labelInputStock.append(inputStock, spanPcs);
  labelStock.append(divLabelStock, labelInputStock);

  divGrid.append(labelSize, labelPrice, labelStock);
  divCardBody.append(divCardActions, divGrid);
  divGroupParent.appendChild(divCardBody);
  let divider = document.createElement("div");
  divider.classList.add("divider", "mb-4");
  formSize.append(divGroupParent, divider);
}

const buttonAddSize = document.getElementById("button-add-size");
buttonAddSize.addEventListener("click", createNewSizeFormGroup);
const modalEditSize = document.getElementById("modal-edit-size");
const modalShowSize = document.getElementById("modal-show-size");
const modalEditItem = document.getElementById("modal-edit-item");
const modalShowImage = document.getElementById("modal-show-image");
const modalEditImage = document.getElementById("modal-edit-image");
const buttonEdit = document.querySelectorAll("#button-edit");
const buttonEditSize = document.querySelectorAll("#button-edit-size");
const buttonSizeEdit = document.querySelectorAll("#button-size-edit");
const buttonEditImage = document.querySelectorAll("#button-edit-image");
const sizeTable = document.getElementById("size-table");
const imageTable = document.getElementById("image-table");
const titleEditSize = document.getElementById("title-edit-size");
const contentEditSize = document.getElementById("content-edit-size");
const imagesEdit = document.getElementById("images-edit");
const buttonItem = document.getElementById("button-item");
const buttonImage = document.getElementById("button-image");
let inputClothesIdSizeEdit = document.getElementById(
  "input-clothes-id-size-edit"
);
let inputClothesSizeEdit = document.getElementById("input-clothes-size-edit");
let inputClothesPriceEdit = document.getElementById("input-clothes-price-edit");
let inputClothesStockEdit = document.getElementById("input-clothes-stock-edit");

let inputClothesIdEdit = document.getElementById("input-clothes-id-edit");
let inputClothesNameEdit = document.getElementById("input-clothes-name-edit");
let inputClothesDescriptionEdit = document.getElementById(
  "input-clothes-description-edit"
);
let inputClothesUseStockEdit = document.getElementById(
  "input-clothes-use-stock-edit"
);

let inputClothesImagesEdit = document.getElementById(
  "input-clothes-images-edit"
);

function appendSizeToTable(e) {
  fetch("/api/get/item-data/size/" + e.dataset.itemId)
    .then((response) => response.json())
    .then((data) => {
      data["item"] = JSON.parse(data["item"]);
      data["sizes"] = JSON.parse(data["sizes"]);
      let i = 0;
      sizeTable.replaceChildren();
      data.sizes.forEach((size) => {
        i = i + 1;
        let tr = document.createElement("tr");
        let tdNum = document.createElement("td");
        tdNum.innerHTML = i;
        let tdSize = document.createElement("td");
        tdSize.innerHTML = size.fields.size;
        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = size.fields.price;
        let tdStock = document.createElement("td");
        tdStock.innerHTML = size.fields.stock;
        let tdAction = document.createElement("td");
        let divJoin = document.createElement("div");
        divJoin.classList.add("join");
        let buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btn", "btn-primary", "join-item");
        buttonEdit.id = "button-size-edit";
        buttonEdit.insertAdjacentHTML(
          "beforeend",
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>'
        );
        buttonEdit.addEventListener("click", (event) => {
          inputClothesIdSizeEdit.value = size.pk;
          inputClothesSizeEdit.value = size.fields.size;
          inputClothesPriceEdit.value = size.fields.price;
          inputClothesStockEdit.value = size.fields.stock;
          buttonItem.dataset.itemId = e.dataset.itemId;
          modalEditSize.showModal();
        });
        let formDelete = document.createElement("form");
        formDelete.action = "#";
        formDelete.method = "POST";
        let inputId = document.createElement("input");
        inputId.type = "hidden";
        inputId.name = "id";
        inputId.value = size.pk;
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-error", "join-item");
        buttonDelete.name = "button-form";
        buttonDelete.value = "delete-size";
        buttonDelete.insertAdjacentHTML(
          "beforeend",
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>'
        );
        buttonDelete.addEventListener("click", (event) => {
          event.preventDefault();
          fetch("/api/delete/item-data/size/" + inputId.value, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              sizeTable.replaceChildren();
              appendSizeToTable(e);
            });
        });
        formDelete.append(inputId, buttonDelete);
        divJoin.append(buttonEdit, formDelete);
        tdAction.append(divJoin);
        tr.append(tdNum, tdSize, tdPrice, tdStock, tdAction);
        sizeTable.append(tr);
      });
      modalShowSize.showModal();
    });
}
buttonEditSize.forEach((e) => {
  e.addEventListener("click", (event) => {
    const addNewSize = document.getElementById("add-new-size");
    addNewSize.dataset.itemId = e.dataset.itemId;
    appendSizeToTable(e);
  });
});

modalShowSize.addEventListener("close", (e) => {
  sizeTable.replaceChildren();
});

buttonItem.addEventListener("click", (e) => {
  e.preventDefault();
  if (buttonItem.dataset.type == "put") {
    fetch("/api/put/item-data/size/" + inputClothesIdSizeEdit.value + "/", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        size: inputClothesSizeEdit.value,
        price: inputClothesPriceEdit.value,
        stock: inputClothesStockEdit.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sizeTable.replaceChildren();
        appendSizeToTable(buttonItem);
        modalEditSize.close();
      });
  } else if (buttonItem.dataset.type == "post") {
    fetch("/api/post/item-data/size/" + inputClothesIdSizeEdit.value + "/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        size: inputClothesSizeEdit.value,
        price: inputClothesPriceEdit.value,
        stock: inputClothesStockEdit.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sizeTable.replaceChildren();
        appendSizeToTable(buttonItem);
        modalEditSize.close();
      });
  }
});

buttonEdit.forEach((button) => {
  button.addEventListener("click", (event) => {
    inputClothesIdEdit.value = button.dataset.id;
    inputClothesNameEdit.value = button.dataset.name;
    inputClothesDescriptionEdit.value = button.dataset.description;
    inputClothesUseStockEdit.checked =
      button.dataset.useStock == "on" ? "checked" : "";
    modalEditItem.showModal();
  });
});

function appendImageToTable(e) {
  fetch("/api/get/item-data/image/" + e.dataset.itemId)
    .then((response) => response.json())
    .then((data) => {
      modalShowImage.showModal();
      data["item"] = JSON.parse(data["item"]);
      data["images"] = JSON.parse(data["images"]);
      let i = 0;
      imageTable.replaceChildren();
      data.images.forEach((image) => {
        i = i + 1;
        let tr = document.createElement("tr");
        let tdNum = document.createElement("td");
        tdNum.innerHTML = i;
        let tdImage = document.createElement("td");
        let buttonViewImage = document.createElement("button");
        buttonViewImage.classList.add("btn", "btn-primary");
        buttonViewImage.insertAdjacentHTML(
          "beforeend",
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>'
        );
        buttonViewImage.addEventListener("click", (event) => {
          const modalViewImage = document.getElementById("modal-view-image");
          const imageView = document.getElementById("image-view");
          imageView.src = "/" + image.fields.image;
          modalViewImage.showModal();
        });
        tdImage.appendChild(buttonViewImage);
        let tdAction = document.createElement("td");
        let divJoin = document.createElement("div");
        divJoin.classList.add("join");
        let buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btn", "btn-primary", "join-item");
        buttonEdit.id = "button-image-edit";
        buttonEdit.insertAdjacentHTML(
          "beforeend",
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>'
        );
        buttonEdit.addEventListener("click", (event) => {
          const buttonViewOldImage = document.getElementById(
            "button-view-old-image"
          );
          const inputClothesIdImageEdit = document.getElementById(
            "input-clothes-id-image-edit"
          );
          inputClothesIdImageEdit.value = image.pk;
          buttonViewOldImage.addEventListener("click", (event) => {
            const modalViewImage = document.getElementById("modal-view-image");
            const imageView = document.getElementById("image-view");
            imageView.src = "/" + image.fields.image;
            modalViewImage.showModal();
          });

          modalEditImage.showModal();
        });
        let formDelete = document.createElement("form");
        formDelete.action = "#";
        formDelete.method = "POST";
        let inputId = document.createElement("input");
        inputId.type = "hidden";
        inputId.name = "id";
        inputId.value = image.pk;
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-error", "join-item");
        buttonDelete.name = "button-form";
        buttonDelete.value = "delete-image";
        buttonDelete.insertAdjacentHTML(
          "beforeend",
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>'
        );
        buttonDelete.addEventListener("click", (event) => {
          event.preventDefault();
          fetch("/api/delete/item-data/image/" + inputId.value, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              imageTable.replaceChildren();
              appendImageToTable(e);
            });
        });
        formDelete.append(inputId, buttonDelete);
        divJoin.append(buttonEdit, formDelete);
        tdAction.append(divJoin);
        tr.append(tdNum, tdImage, tdAction);
        imageTable.append(tr);
      });
      modalShowImage.showModal();
    });
}

buttonEditImage.forEach((e) => {
  e.addEventListener("click", (event) => {
    const addNewImage = document.getElementById("add-new-image");
    addNewImage.dataset.itemId = e.dataset.itemId;
    appendImageToTable(e);
  });
});

inputClothesImagesEdit.addEventListener("change", (event) => {
  let buttonViewNewImage = document.getElementById("button-view-new-image");
  buttonViewNewImage.addEventListener("click", (e) => {
    const modalViewImage = document.getElementById("modal-view-image");
    const imageView = document.getElementById("image-view");
    imageView.src = URL.createObjectURL(event.target.files[0]);
    modalViewImage.showModal();
  });
  let newImage = document.getElementById("new-image");
  newImage.classList.remove("hidden");
});

const modalViewImage = document.getElementById("modal-view-image");
modalViewImage.addEventListener("close", (event) => {
  const imageView = document.getElementById("image-view");
  imageView.src = "";
});

modalEditImage.addEventListener("close", (event) => {
  const formEditImage = document.getElementById("form-edit-image");
  formEditImage.reset();
  let newImage = document.getElementById("new-image");
  newImage.classList.add("hidden");
});

const addNewImage = document.getElementById("add-new-image");
addNewImage.addEventListener("click", (event) => {
  const inputClothesIdImageAdd = document.getElementById(
    "input-clothes-id-image-add"
  );
  inputClothesIdImageAdd.value = addNewImage.dataset.itemId;
  const modalAddImage = document.getElementById("modal-add-image");
  modalAddImage.showModal();
});

const addNewSize = document.getElementById("add-new-size");
addNewSize.addEventListener("click", (event) => {
  const modalEditSizeLabel = document.getElementById("modal-edit-size-label");
  inputClothesIdSizeEdit.value = addNewSize.dataset.itemId;
  modalEditSizeLabel.innerHTML = "Add Size";
  inputClothesSizeEdit.name = "size-add";
  inputClothesPriceEdit.name = "price-add";
  inputClothesStockEdit.name = "stock-add";
  buttonItem.innerHTML = "Submit";
  buttonItem.dataset.type = "post";
  buttonItem.dataset.itemId = addNewSize.dataset.itemId;
  modalEditSize.showModal();
});

modalEditSize.addEventListener("close", (event) => {
  const modalEditSizeLabel = document.getElementById("modal-edit-size-label");
  inputClothesIdSizeEdit.value = "";
  modalEditSizeLabel.innerHTML = "Edit Size";
  inputClothesSizeEdit.name = "size-edit";
  inputClothesSizeEdit.value = "";
  inputClothesPriceEdit.name = "price-edit";
  inputClothesPriceEdit.value = "";
  inputClothesStockEdit.name = "stock-edit";
  inputClothesStockEdit.value = "";
  buttonItem.innerHTML = "Edit";
  buttonItem.dataset.type = "put";
  buttonItem.dataset.itemId = "";
});
