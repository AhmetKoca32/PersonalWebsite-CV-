'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (filterItems[i].dataset.category.includes(selectedValue.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'))) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const navigateToPage = function (pageName) {
  const target = pageName.toLowerCase();

  for (let j = 0; j < pages.length; j++) {
    if (pages[j].dataset.page === target) {
      pages[j].classList.add("active");
      navigationLinks[j].classList.add("active");
    } else {
      pages[j].classList.remove("active");
      navigationLinks[j].classList.remove("active");
    }
  }

  window.scrollTo(0, 0);
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    navigateToPage(this.innerHTML);
  });
}

// CTA buttons that navigate to a page
const navTargetButtons = document.querySelectorAll("[data-nav-target]");

for (let i = 0; i < navTargetButtons.length; i++) {
  navTargetButtons[i].addEventListener("click", function () {
    navigateToPage(this.dataset.navTarget);
  });
}



// CV download dropdown: close on outside click
const cvDropdowns = document.querySelectorAll(".cv-dropdown");

document.addEventListener("click", function (event) {
  for (let i = 0; i < cvDropdowns.length; i++) {
    if (!cvDropdowns[i].contains(event.target)) {
      cvDropdowns[i].removeAttribute("open");
    }
  }
});



// Ziyaretçi sayacını haftada 10 kişi artıran yeni sayaç
const weeklyVisitorCounter = {
  // Başlangıç tarihi (YIL, AY-1, GÜN) - 1 Ocak 2024
  startDate: new Date(2025, 0, 1),
  // Başlangıç ziyaretçi sayısı
  baseCount: 1000,
  // Haftalık artış
  weeklyIncrease: 12,

  init: function() {
    this.updateVisitorCount();
  },

  updateVisitorCount: function() {
    const now = new Date();
    // Geçen hafta sayısı
    const diffTime = now - this.startDate;
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const visitorCount = this.baseCount + (diffWeeks * this.weeklyIncrease);
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
      this.animateCount(visitorCountElement, visitorCount);
    }
  },

  animateCount: function(element, finalCount) {
    let current = Math.max(0, parseInt(finalCount) - 50);
    const target = parseInt(finalCount);
    const increment = Math.max(1, Math.ceil((target - current) / 30));
    const animation = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(animation);
      }
      element.textContent = current.toLocaleString();
    }, 50);
  }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
  weeklyVisitorCounter.init();
});