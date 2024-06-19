import "./../css/reset.css";
import "./../css/admin/fonts.css";
import "./../css/admin/global.css";

import ExcursionsAPI from "./ExcursionsAPI";
const excursionsAPI = new ExcursionsAPI();

console.log("admin");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const { excursionsList } = await excursionsAPI.loadExcursions();
  showExcursions(excursionsList);

  const form = document.querySelector(".form");
  form.addEventListener("submit", addExcursion);

  const editBtnList = document.querySelectorAll(
    ".excursions__field-input--update"
  );
  editBtnList.forEach((button) => {
    button.addEventListener("click", editExcursion);
  });

  const deleteBtnList = document.querySelectorAll(
    ".excursions__field-input--remove"
  );
  deleteBtnList.forEach((button) => {
    button.addEventListener("click", removeExcursion);
  });
}

function showExcursions(excursionsList) {
  const panelExcursions = document.querySelector(".panel__excursions");

  excursionsList.forEach((excursion) => {
    const { excursionTemplate, name, description, adultsPrice, childrenPrice } =
      useExcursionTemplate();

    excursionTemplate.setAttribute("id", excursion.id);
    name.innerText = excursion.name;
    description.innerText = excursion.description;
    adultsPrice.innerText = excursion.adultsPrice;
    childrenPrice.innerText = excursion.childrenPrice;

    panelExcursions.appendChild(excursionTemplate);
  });
}

function useExcursionTemplate() {
  const excursionTemplate = document
    .querySelector(".excursions__item--prototype")
    .cloneNode(true);
  excursionTemplate.classList.remove("excursions__item--prototype");
  const name = excursionTemplate.querySelector(".excursions__name");
  const description = excursionTemplate.querySelector(
    ".excursions__description"
  );
  const price = excursionTemplate.querySelectorAll(".excursions__price");
  const [adultsPrice, childrenPrice] = price;

  return { excursionTemplate, name, description, adultsPrice, childrenPrice };
}

async function addExcursion(evt) {
  evt.preventDefault();
  const formValidationResult = formValidation(evt);
  if (formValidationResult === false) {
    return;
  }

  const form = evt.currentTarget;
  const name = form.querySelector("input[name = 'name']").value;
  const adultsPrice = form.querySelector("input[name = 'adults']").value;
  const childrenPrice = form.querySelector("input[name = 'children']").value;
  const description = form.querySelector(
    "textarea[name = 'description']"
  ).value;

  const newExcursion = {
    name: name,
    adultsPrice: adultsPrice,
    childrenPrice: childrenPrice,
    description: description,
  };

  await excursionsAPI.postData(newExcursion, "excursions");
  alert(`Dodano wycieczkę!`);
  location.reload();
}

function formValidation(evt) {
  const form = evt.currentTarget;
  const formFieldList = Array.from(form.querySelectorAll(".form__field"));

  const isFormFieldEmpty = isFormFieldEmptyValidation(formFieldList);
  if (isFormFieldEmpty) {
    return false;
  }

  const isFormFieldPriceValid = formFieldPriceValidation(form);
  if (!isFormFieldPriceValid) {
    return false;
  }

  return true;
}

function isFormFieldEmptyValidation(formFieldList) {
  let isFormFieldEmpty = false;

  formFieldList.forEach((formField) => {
    if (!formField.value) {
      isFormFieldEmpty = true;

      const formRow = formField.parentElement.parentElement;
      const error = formRow.querySelector(".form__row-error");
      error.innerText = "Fill up the blank space!";
    }
  });

  return isFormFieldEmpty;
}

function formFieldPriceValidation(form) {
  let isValid = true;
  const formFieldPriceList = Array.from(
    form.querySelectorAll(".form__field--price")
  );
  const regexValidator = /^\d+$/;

  formFieldPriceList.forEach((formField) => {
    if (!regexValidator.test(formField.value)) {
      isValid = false;
      const formRow = formField.parentElement.parentElement;
      const error = formRow.querySelector(".form__row-error");
      error.innerText = "Invalid data!";
    }
  });

  return isValid;
}

function editExcursion(evt) {
  evt.preventDefault();
  const excursionsItem = evt.target.closest(".excursions__item");

  const editContentList = Array.from(
    excursionsItem.querySelectorAll(
      ".excursions__name, .excursions__description, .excursions__price"
    )
  );

  const isContentEditable = editContentList.every((ele) => {
    return ele.isContentEditable;
  });
  console.log(isContentEditable);
  if (isContentEditable) {
    updateExcursion(editContentList, excursionsItem);
    disableContentEdit(editContentList);
    hideEditable(editContentList);
  } else {
    enableContentEdit(editContentList);
    showEditable(editContentList);
  }
}

function updateExcursion(editContentList, excursionItem) {
  const { excursionObj } = createExcursionObj(editContentList);
  excursionsAPI.putData(excursionObj, "excursions", excursionItem.id);
}

function createExcursionObj(editContentList) {
  const [name, description, adultsPrice, childrenPrice] = editContentList;

  const excursionObj = {
    name: name.innerText,
    description: description.innerText,
    adultsPrice: adultsPrice.innerText,
    childrenPrice: childrenPrice.innerText,
  };

  return { excursionObj };
}

function disableContentEdit(editContentList) {
  editContentList.forEach((ele) => {
    ele.contentEditable = false;
  });
}

function hideEditable(editContentList) {
  editContentList.forEach((ele) => {
    ele.style.backgroundColor = "initial";
  });
}

function enableContentEdit(editContentList) {
  editContentList.forEach((ele) => {
    ele.contentEditable = true;
  });
}

function showEditable(editContentList) {
  editContentList.forEach((ele) => {
    ele.style.backgroundColor = "var(--secondary-color)";
  });
}

async function removeExcursion(evt) {
  evt.preventDefault();
  const excursionsItem = evt.target.closest(".excursions__item");

  await excursionsAPI.deleteData('excursions', excursionsItem.id);
  alert('Usunięto wycieczkę');
  location.reload();
}