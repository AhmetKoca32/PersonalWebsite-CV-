'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



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
    } else if (selectedValue === filterItems[i].dataset.category) {
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

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Real visitor counter with Counter.dev
const realVisitorCounter = {
  init: function() {
    this.loadCounterDev();
  },

  loadCounterDev: function() {
    // Counter.dev API'sini çağır
    const pageId = 'ahmetkoca.portfolio';
    const apiUrl = `https://api.countapi.xyz/hit/ahmetkoca.portfolio/visits`;
    
    // Sayacı başlat - 1000'den başlasın
    this.initializeCounter(pageId);
    
    // Gerçek sayıyı al ve göster
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const visitorCountElement = document.getElementById('visitor-count');
        if (visitorCountElement && data.value) {
          // Eğer sayı 1000'den küçükse 1000 ekle
          const adjustedCount = data.value < 100 ? data.value + 1000 : data.value;
          this.animateCount(visitorCountElement, adjustedCount);
        }
      })
      .catch(error => {
        console.log('Counter service unavailable');
        // Fallback - static number
        const visitorCountElement = document.getElementById('visitor-count');
        if (visitorCountElement) {
          visitorCountElement.textContent = '1,247';
        }
      });
  },

  initializeCounter: function(pageId) {
    // Counter'ı initialize et (ilk seferinde)
    fetch(`https://api.countapi.xyz/create?namespace=${pageId}&key=visits&value=1000`)
      .catch(() => {
        // Counter zaten var, sorun değil
      });
  },

  animateCount: function(element, finalCount) {
    let current = 0;
    const target = parseInt(finalCount);
    const increment = Math.max(1, Math.ceil(target / 50));
    
    const animation = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(animation);
      }
      element.textContent = current.toLocaleString();
    }, 30);
  }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
  realVisitorCounter.init();
});