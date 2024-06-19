class NavbarCSS {
  manageNavbar() {
    window.addEventListener("DOMContentLoaded", () => {
      this.changeNavbarViews();
      this.changeNavbarBackgroundColor();
      this.onOffBasket();
      this.showHideNavbar();
    });
  }

  changeNavbarViews() {
    this.navbarMobileView();

    window.addEventListener("resize", () => this.navbarMobileView());
  }

  changeNavbarBackgroundColor() {
    const navbar = document.querySelector(".navbar");
    const basketBtn = document.querySelector(".basket-btn");
    const navbarToggle = document.querySelector(".navbar__toggle");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        navbar.classList.add("navbar--background-scroll");
      } else {
        navbar.classList.remove("navbar--background-scroll");
      }
    });

    basketBtn.addEventListener("click", () => {
      navbar.classList.toggle("navbar--background-basket-btn");
    });

    navbarToggle.addEventListener("click", () => {
      navbar.classList.toggle("navbar--background-navbar-btn");
    });
  }

  onOffBasket() {
    const basketBtn = document.querySelector(".basket-btn");

    basketBtn.addEventListener("click", () => {
      const basket = document.querySelector(".basket");
      const body = document.querySelector("body");

      if (basketBtn.checked) {
        basket.classList.add("basket--open");
        body.style.overflow = "hidden";
      } else {
        basket.classList.remove("basket--open");
        body.style.overflow = "initial";
      }
    });
  }

  showHideNavbar() {
    const navbarToggle = document.querySelector(".navbar__toggle");
    const navbarContainerMobile = document.querySelector(
      ".navbar__container--mobile"
    );
    const navbarBtn = document.querySelector(".navbar__btn");

    navbarToggle.addEventListener("click", () => {
      navbarContainerMobile.classList.toggle("navbar__container--open");
      navbarBtn.classList.toggle("navbar__btn--checked");
    });
  }

  navbarMobileView() {
    const navbarContainer = "navbar__container";
    const navbarItem = "navbar__item";

    if (window.innerWidth < 1200) {
      this.changeClassOfElementList(`${navbarItem}`, `${navbarItem}--mobile`);
      this.changeClassOfElementList(
        `${navbarContainer}`,
        `${navbarContainer}--mobile`
      );
    } else {
      this.changeClassOfElementList(`${navbarItem}--mobile`, `${navbarItem}`);
      this.changeClassOfElementList(
        `${navbarContainer}--mobile`,
        `${navbarContainer}`
      );
    }
  }

  changeClassOfElementList(elementClass, newClass) {
    const elementList = document.querySelectorAll(`.${elementClass}`);

    elementList.forEach((ele) => {
      ele.classList.remove(`${elementClass}`);
      ele.classList.add(`${newClass}`);
    });
  }
}

export default NavbarCSS;