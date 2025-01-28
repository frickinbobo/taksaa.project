const modalViewImage = document.getElementById("modal-view-image");
const imageView = document.getElementById("image-view");
const buttonEdit = document.querySelectorAll("#button-edit");
const inputCustomerId = document.getElementById("input-customer-id");
const inputCustomerName = document.getElementById("input-customer-name");
const inputCustomerPhone = document.getElementById("input-customer-phone");
const inputCustomerEmail = document.getElementById("input-customer-email");
const inputCustomerAddress = document.getElementById("input-customer-address");
const inputCustomerReceipt = document.getElementById("input-customer-receipt");
const formControlViewReceipt = document.getElementById(
  "form-control-view-receipt"
);
const buttonViewImage = document.getElementById("view-image");
const buttonShowModal = document.querySelectorAll("#show-modal");
const buttonForm = document.getElementById("button-form");
const buttonReset = document.getElementById("button-reset");
const buttonViewClothes = document.getElementById("button-view-clothes");
const modalViewClothes = document.getElementById("modal-view-clothes");

function updateOrdersListEdit(orders) {
  let yourOrder = document.getElementById("your-order");
  yourOrder.classList.remove("hidden");
  if (Object.keys(orders).length == 0) {
    yourOrder.classList.add("hidden");
  }
  let orderView = document.getElementById("order-view");
  orderView.replaceChildren();
  orderView.parentNode.parentNode.classList.remove("hidden");

  let i = 0;
  Object.keys(orders).forEach((orderKey) => {
    i = i + 1;
    const order = orders[orderKey];
    const price = order.price * order.quantity;

    let card = document.createElement("div");
    card.classList.add(
      "card",
      "bg-base-100",
      "shadow-xl",
      "overflow-y-auto",
      "mb-2"
    );

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "m-0", "p-2");

    let flex = document.createElement("div");
    flex.classList.add("flex", "items-center", "gap-4");

    let join = document.createElement("div");
    join.classList.add("join");

    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("join-item", "btn", "btn-error", "h-24", "p-0");
    buttonDelete.type = "button";
    buttonDelete.dataset.orderKey = orderKey;
    buttonDelete.addEventListener("click", (event) => {
      orders = deleteKeys(orders, [buttonDelete.dataset.orderKey]);
      updateOrdersListEdit(orders);
    });
    buttonDelete.insertAdjacentHTML(
      "beforeend",
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>'
    );

    let img = document.createElement("img");
    img.src = order.image;
    img.classList.add(
      "join-item",
      "min-w-24",
      "w-24",
      "h-24",
      "object-cover",
      "rounded"
    );
    img.alt = "";

    join.append(buttonDelete, img);

    let table = document.createElement("table");
    table.classList.add("w-auto");

    let tr1 = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.colspan = 3;
    td1.innerHTML = order.name;
    tr1.append(td1);

    let tr2 = document.createElement("tr");
    td1 = document.createElement("td");
    td1.classList.add("lg:w-2", "min-w-24");
    td1.innerHTML = "Size";
    let td2 = document.createElement("td");
    td2.classList.add("min-w-2");
    td2.innerHTML = ":";
    let td3 = document.createElement("td");
    td3.innerHTML = order.sizeText;
    tr2.append(td1, td2, td3);

    let tr3 = document.createElement("tr");
    td1 = document.createElement("td");
    td1.classList.add("lg:w-2", "min-w-24");
    td1.innerHTML = "Quantity";
    td2 = document.createElement("td");
    td2.classList.add("min-w-2");
    td2.innerHTML = ":";
    td3 = document.createElement("td");
    td3.innerHTML = order.quantity;
    tr3.append(td1, td2, td3);

    let tr4 = document.createElement("tr");
    td1 = document.createElement("td");
    td1.classList.add("lg:w-2", "min-w-24");
    td1.innerHTML = "Price/pcs";
    td2 = document.createElement("td");
    td2.classList.add("min-w-2");
    td2.innerHTML = ":";
    td3 = document.createElement("td");
    td3.innerHTML = order.price;
    tr4.append(td1, td2, td3);

    table.append(tr1, tr2, tr3, tr4);

    flex.append(join, table);
    cardBody.append(flex);
    let inputId = document.createElement("input");
    inputId.type = "hidden";
    inputId.name = "id-" + i;
    inputId.value = order.clotheId;

    let inputSize = document.createElement("input");
    inputSize.type = "hidden";
    inputSize.name = "size-" + i;
    inputSize.value = order.sizeText;

    let inputQuantity = document.createElement("input");
    inputQuantity.type = "hidden";
    inputQuantity.name = "quantity-" + i;
    inputQuantity.value = order.quantity;

    card.append(inputId, inputSize, inputQuantity, cardBody);
    orderView.append(card);
  });
}

function allowNumbersOnly(inputElement) {
  inputElement.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

allowNumbersOnly(inputCustomerPhone);

function viewEditImage(src) {
  imageView.src = src;
  modalViewImage.showModal();
}

modalViewImage.addEventListener("close", (event) => {
  imageView.src = "";
});

buttonReset.addEventListener("click", (event) => {
  event.preventDefault();
  inputCustomerId.value = "";
  buttonForm.value = "add";
  buttonForm.innerHTML = "Submit";
  formControlViewReceipt.classList.add("hidden");
  event.target.form.reset();
});

buttonEdit.forEach((button) => {
  button.addEventListener("click", (event) => {
    fetch("/api/get/order/" + button.dataset.id + "/items/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let clothes = data.clothes;
        clothes.forEach((clothe) => {
          clothe.clothe = JSON.parse(clothe.clothe)[0];
        });
        console.log(clothes);
        orders = {};
        clothes.forEach((clothe) => {
          const orderKey = `${clothe.clothe.fields.item}-${clothe.clothe.fields.size}`;
          if (orders[orderKey]) {
            orders[orderKey].quantity += clothe.quantity;
          } else {
            let id = clothe.clothe.fields.item;
            let clotheId = clothe.clothe.pk;
            let sizeText = clothe.clothe.fields.size;
            let name = clothe.name;
            let quantity = clothe.quantity;
            let price = clothe.clothe.fields.price;
            let image = clothe.image;
            orders[orderKey] = {
              id,
              clotheId,
              sizeText,
              name,
              quantity,
              price,
              image,
            };
          }
        });
        updateOrdersListEdit(orders);
        let order = data.order;
      });
    inputCustomerName.focus();
    inputCustomerId.value = event.currentTarget.dataset.id;
    inputCustomerName.value = event.currentTarget.dataset.name;
    inputCustomerPhone.value = event.currentTarget.dataset.phone;
    inputCustomerEmail.value = event.currentTarget.dataset.email;
    inputCustomerAddress.value = event.currentTarget.dataset.address;
    buttonViewImage.dataset.src = event.currentTarget.dataset.receipt;
    buttonViewImage.addEventListener("click", (e) => {
      viewEditImage(buttonViewImage.dataset.src);
    });
    formControlViewReceipt.classList.remove("hidden");
    buttonForm.value = "edit";
    buttonForm.innerHTML = "Edit";
  });
});

buttonShowModal.forEach((button) => {
  button.addEventListener("click", (event) => {
    viewEditImage(button.dataset.src);
  });
});

inputCustomerReceipt.addEventListener("change", (event) => {
  formControlViewReceipt.classList.remove("hidden");
  buttonViewImage.addEventListener("click", (e) => {
    imageView.src = URL.createObjectURL(event.target.files[0]);
    modalViewImage.showModal();
  });
});

buttonViewClothes.addEventListener("click", (event) => {
  modalViewClothes.showModal();
});

function updateQuantity(id, amount) {
  stockCount = document.getElementById("stock-count-" + id);
  stockCount.value = Math.max(0, parseInt(stockCount.value) + amount);
}
