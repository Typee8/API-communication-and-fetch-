import "./../css/reset.css";
import "./../css/client/fonts.css";
import "./../css/client/global.css";
import "./../css/client/mobile.css";
import "./../css/client/desktop.css";
import "./../css/client/basket/basket-fonts.css";
import "./../css/client/basket/basket.css";

import FirebaseFetch from "./FirebaseFetch";
import Validation from "./Validation";
import NavbarCSS from "./navbarCSS";

const basket = [];

const firebaseFetch = new FirebaseFetch();
const validation = new Validation(basket);
const navbarCSS = new NavbarCSS();

console.log("client");
document.addEventListener("DOMContentLoaded", init);

async function init() {
  navbarCSS.manageNavbar();

  const excursionsList = await firebaseFetch.fetchData();
  showExcursions(excursionsList);

  const excursionsContainer = document.querySelector(".excursions");
  excursionsContainer.addEventListener("submit", manageBasket);

  const basketOrder = document.querySelector(".basket__order");
  basketOrder.addEventListener("submit", placeOrder);
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

async function manageBasket(evt) {
  await addItemToBasket(evt);
  showItemsQuantity();
  showBasketItems();
  clearTicketsInput();
  showOrderTotalPrice();
  basketItemRemoval();
}

async function addItemToBasket(evt) {
  evt.preventDefault();

  const { basketValidation } = validation;
  const basketValidationResult = basketValidation(evt);
  if (basketValidationResult === false) {
    return;
  } else {
    hideSubmitTicketsError();
  }

  const { selectedExcursion } = await matchExcursionsID(evt);

  const { adultsTicketAmount, childrenTicketAmount } = getTicketAmount(evt);

  if (isExcursionInBasket(selectedExcursion)) {
    updateBasket(selectedExcursion, adultsTicketAmount, childrenTicketAmount);
  } else {
    addNewItemToBasket(
      selectedExcursion,
      adultsTicketAmount,
      childrenTicketAmount
    );
  }
}

function showItemsQuantity() {
  const basketBtnQuantity = document.querySelector(".basket-btn__quantity");

  if (basket.length > 0) {
    basketBtnQuantity.style.display = "flex";
  } else {
    basketBtnQuantity.style.display = "none";
  }

  const itemsQuantity = basket.length;
  basketBtnQuantity.innerText = `${itemsQuantity}`;
}

function showBasketItems() {
  const itemsList = document.querySelector(".items-list");

  clearShownSummary(itemsList);

  basket.forEach((basketItem) => {
    const {
      itemListItemTemplate,
      name,
      pricesAdults,
      pricesChildren,
      itemTotalPrice,
    } = useItemListItemTemplate();

    itemListItemTemplate.setAttribute("id", basketItem.id);
    name.innerText = basketItem.name;
    showItemPrices(basketItem, pricesAdults, pricesChildren);
    showItemTotalPrice(basketItem, itemTotalPrice);
    itemsList.appendChild(itemListItemTemplate);
  });
}

function orderTotalPrice() {
  let totalPrice = 0;

  basket.forEach((basketItem) => {
    const {
      adultsTicketAmount,
      childrenTicketAmount,
      adultsPrice,
      childrenPrice,
    } = parseIntBasketData(basketItem);

    totalPrice +=
      adultsTicketAmount * adultsPrice + childrenTicketAmount * childrenPrice;
  });

  return { totalPrice };
}

function createOrderObj(basket, name, email) {
  const orderObj = {
    userName: name,
    userEmail: email,
    basket: basket,
  };
  return { orderObj };
}

function showOrderTotalPrice() {
  const { totalPrice } = orderTotalPrice();

  const totalPricePlace = document.querySelector(".total-price__value");

  totalPricePlace.innerText = totalPrice + " PLN";
}

function clearShownSummary(itemsList) {
  while (itemsList.children[1]) {
    itemsList.removeChild(itemsList.children[1]);
  }
}

function useItemListItemTemplate() {
  const itemListItemTemplate = document
    .querySelector(".item-list__item--prototype")
    .cloneNode(true);
  itemListItemTemplate.classList.remove("item-list__item--prototype");
  const name = itemListItemTemplate.querySelector(".item__name");
  const itemPrices = itemListItemTemplate.querySelector(".item__prices");

  const pricesAdults = itemPrices.querySelector(".prices__adults");
  const pricesChildren = itemPrices.querySelector(".prices__children");

  const itemTotalPrice =
    itemListItemTemplate.querySelector(".item__total-price");

  return {
    itemListItemTemplate,
    name,
    pricesAdults,
    pricesChildren,
    itemTotalPrice,
  };
}

function showItemPrices(basketItem, pricesAdults, pricesChildren) {
  const { adultsTicketAmount, childrenTicketAmount } =
    parseIntBasketData(basketItem);
  const { adultsTicketText, childrenTicketText } =
    itemPricesTxtTemplate(basketItem);

  if (adultsTicketAmount && childrenTicketAmount) {
    pricesAdults.innerText = adultsTicketText;
    pricesChildren.innerText = childrenTicketText;
  } else if (adultsTicketAmount) {
    pricesAdults.innerText = adultsTicketText;
    pricesChildren.innerText = "";
  } else if (childrenTicketAmount) {
    pricesChildren.innerText = childrenTicketText;
    pricesAdults.innerText = "";
  }
}

function parseIntBasketData(basketItem) {
  let { adultsTicketAmount, childrenTicketAmount, adultsPrice, childrenPrice } =
    basketItem;

  adultsTicketAmount = parseInt(adultsTicketAmount);
  childrenTicketAmount = parseInt(childrenTicketAmount);
  adultsPrice = parseInt(adultsPrice);
  childrenPrice = parseInt(childrenPrice);

  return {
    adultsTicketAmount,
    childrenTicketAmount,
    adultsPrice,
    childrenPrice,
  };
}

function itemPricesTxtTemplate(basketItem) {
  const {
    adultsTicketAmount,
    childrenTicketAmount,
    adultsPrice,
    childrenPrice,
  } = basketItem;

  const adultsTicketText = `adults:
   ${adultsTicketAmount} x ${adultsPrice} PLN`;
  const childrenTicketText = `children:
   ${childrenTicketAmount} x ${childrenPrice} PLN`;

  return { adultsTicketText, childrenTicketText };
}

function showItemTotalPrice(basketItem, itemTotalPrice) {
  const {
    adultsTicketAmount,
    childrenTicketAmount,
    adultsPrice,
    childrenPrice,
  } = parseIntBasketData(basketItem);
  itemTotalPrice.innerText =
    adultsTicketAmount * adultsPrice +
    childrenTicketAmount * childrenPrice +
    " PLN";
}

function basketItemRemoval() {
  const itemsList = document.querySelector(".items-list");
  const deleteBtn = itemsList.querySelectorAll(".item__btn-remove");

  deleteBtn.forEach((ele) => {
    ele.addEventListener("click", (evt) => {
      evt.preventDefault();
      removeBasketItem(evt);
    });
  });
}

async function placeOrder(evt) {
  evt.preventDefault();
  const { orderValidation, createPlaceOrderVariables } = validation;
  const orderValidationResult = orderValidation();
  if (orderValidationResult === false) {
    return;
  }

  const { name, email } = createPlaceOrderVariables();
  const { totalPrice } = orderTotalPrice();
  const { orderObj } = createOrderObj(basket, name, email);

  //  place for saving data
  //  await firebaseFetch.pushData(orderObj);

  alert(
    `Thank you for placing an order worth ${totalPrice} PLN. The order details have been sent to the following email address: ${email}.
    
    This is a demo. No personal data was collected.
    `
  );
  location.reload();
}

function removeBasketItem(evt) {
  const summaryItem = evt.target.parentElement;
  const itemsList = summaryItem.parentElement;

  const basketItemIndex = basket.findIndex((basketItem) => {
    return summaryItem.id === basketItem.id;
  });

  basket.splice(basketItemIndex, 1);
  itemsList.removeChild(summaryItem);
  showItemsQuantity();
  showOrderTotalPrice();
}

async function matchExcursionsID(evt) {
  const excursionsList = await firebaseFetch.fetchData();

  const excursionId = evt.target.parentElement.id;
  const selectedExcursion = excursionsList.find((excursion) => {
    return excursion.id === excursionId;
  });
  return { selectedExcursion };
}

function getTicketAmount(evt) {
  let adultsTicketAmount = evt.target.querySelector(
    `input[name = "adults"]`
  ).value;
  let childrenTicketAmount = evt.target.querySelector(
    `input[name = "children"]`
  ).value;

  if (!adultsTicketAmount) {
    return { childrenTicketAmount };
  }
  if (!childrenTicketAmount) {
    return { adultsTicketAmount };
  }

  return { adultsTicketAmount, childrenTicketAmount };
}

function isExcursionInBasket(selectedExcursion) {
  return basket.some((excursion) => {
    return excursion.id === selectedExcursion.id;
  });
}

function updateBasket(
  selectedExcursion,
  adultsTicketAmount = "0",
  childrenTicketAmount = "0"
) {
  basket.forEach((basketItem) => {
    if (basketItem.id === selectedExcursion.id) {
      addAdultsTickets(basketItem, adultsTicketAmount);
      addChildrenTickets(basketItem, childrenTicketAmount);
    }
  });
}

function addNewItemToBasket(
  selectedExcursion,
  adultsTicketAmount = "0",
  childrenTicketAmount = "0"
) {
  const newItem = {
    id: selectedExcursion.id,
    name: selectedExcursion.name,
    adultsPrice: selectedExcursion.adultsPrice,
    adultsTicketAmount: adultsTicketAmount,
    childrenPrice: selectedExcursion.childrenPrice,
    childrenTicketAmount: childrenTicketAmount,
  };
  basket.push(newItem);
}

function addAdultsTickets(basketItem, adultsTicketAmount) {
  basketItem.adultsTicketAmount = (
    parseInt(basketItem.adultsTicketAmount) + parseInt(adultsTicketAmount)
  ).toString();
}

function addChildrenTickets(basketItem, childrenTicketAmount) {
  basketItem.childrenTicketAmount = (
    parseInt(basketItem.childrenTicketAmount) + parseInt(childrenTicketAmount)
  ).toString();
}

function hideSubmitTicketsError() {
  const panelExcursions = document.querySelector(".panel__excursions");
  const excursionErrorList = Array.from(
    panelExcursions.querySelectorAll(".excursions__field-error")
  );

  excursionErrorList.forEach((error) => {
    error.innerText = "";
  });
}

function clearTicketsInput() {
  const panelExcursions = document.querySelector(".panel__excursions");
  const ticketInputList = panelExcursions.querySelectorAll(
    "input:not([type = 'submit'])"
  );

  ticketInputList.forEach((input) => {
    input.value = "";
  });
}
