class Validation {
  constructor(basket) {
    this.basket = basket;
  }

  basketValidation = (evt) => {
    const adultsTicketAmount = evt.target.querySelector(
      `input[name = "adults"]`
    ).value;
    const childrenTicketAmount = evt.target.querySelector(
      `input[name = "children"]`
    ).value;

    const isTicketInputValid = this.validateSubmitTickets(
      evt,
      adultsTicketAmount,
      childrenTicketAmount
    );

    const isBasketFull = this.validateBasketSize(
      evt,
      adultsTicketAmount,
      childrenTicketAmount
    );

    if (!isTicketInputValid || isBasketFull) {
      return false;
    }

    return true;
  };

  validateSubmitTickets(evt, adultsTicketAmount, childrenTicketAmount) {
    let isValid = true;
    const regexValidator = /^([1-9]|[1-9][0-9]|100)$/;
    const adultsInputError = evt.target.querySelector(`div[name = "adults"]`);
    const childrenInputError = evt.target.querySelector(
      `div[name = "children"]`
    );

    if (adultsTicketAmount === "" && childrenTicketAmount === "") {
      adultsInputError.innerText = "Fill up the blank space!";
      isValid = false;
    }

    if (adultsTicketAmount && !regexValidator.test(adultsTicketAmount)) {
      adultsInputError.innerText = "Invalid data!";
      isValid = false;
    }

    if (childrenTicketAmount && !regexValidator.test(childrenTicketAmount)) {
      childrenInputError.innerText = "Invalid data!";
      isValid = false;
    }

    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  validateBasketSize(evt, adultsTicketAmount, childrenTicketAmount) {
    let isBasketFull = false;
    const submitTripID = evt.target.parentElement.getAttribute("id");

    this.basket.forEach((basketItem) => {
      if (basketItem.id === submitTripID) {
        const maxTickets = 100;
        let sum = 0;
        const toSumList = [];

        if (basketItem.adultsTicketAmount) {
          toSumList.push(parseInt(basketItem.adultsTicketAmount));
        }
        if (basketItem.childrenTicketAmount) {
          toSumList.push(parseInt(basketItem.childrenTicketAmount));
        }
        if (adultsTicketAmount) {
          toSumList.push(parseInt(adultsTicketAmount));
        }
        if (childrenTicketAmount) {
          toSumList.push(parseInt(childrenTicketAmount));
        }

        for (let i = 0; i < toSumList.length; i++) {
          sum += toSumList[i];
        }

        if (sum > maxTickets) {
          isBasketFull = true;
          alert("The Basket is full!");
        }
      }
    });
    return isBasketFull;
  }

  orderValidation = () => {
    if (this.basket.length === 0) {
      alert(`There're no items in the basket!`);
      return false;
    }

    let isOrderValid = true;

    const { name, email, orderErrorName, orderErrorEmail } =
      this.createPlaceOrderVariables();

    if (!this.isClientNameValid(name)) {
      orderErrorName.innerText = "Incorrect name.";
      isOrderValid = false;
    } else {
      orderErrorName.innerText = "";
    }

    if (!this.isClientEmailValid(email)) {
      orderErrorEmail.innerText = "Incorrect email.";
      isOrderValid = false;
    } else {
      orderErrorEmail.innerText = "";
    }

    if (isOrderValid) {
      return true;
    } else {
      return false;
    }
  };

  createPlaceOrderVariables = () => {
    const basketOrder = document.querySelector(".basket__order");
    const nameInput = basketOrder.querySelector(`input[name = "name"]`);
    const name = nameInput.value;
    const emailInput = basketOrder.querySelector(`input[name = "email"]`);
    const email = emailInput.value;
    const orderErrorName = basketOrder.querySelector(
      ".order__field-error--name"
    );
    const orderErrorEmail = basketOrder.querySelector(
      ".order__field-error--email"
    );

    return {
      basketOrder,
      nameInput,
      name,
      emailInput,
      email,
      orderErrorName,
      orderErrorEmail,
    };
  };

  isClientNameValid(name) {
    const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/;

    if (regex.test(name)) {
      return true;
    } else {
      return false;
    }
  }

  isClientEmailValid(email) {
    if (/^\S+@\S+$/g.test(email)) {
      return true;
    } else {
      return false;
    }
  }
}

export default Validation;
