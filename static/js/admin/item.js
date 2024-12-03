function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

function createNewSizeFormGroup(event) {
  const formSize = document.getElementById("form-sizes");
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
  spanLabelStock.innerHTML = "Price";

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
