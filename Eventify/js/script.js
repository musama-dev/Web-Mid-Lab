const searchInput = document.getElementById("eventSearchInput");
const filterButtons = document.querySelectorAll(".btn-filter");
const eventCards = document.querySelectorAll(".event-item");
const noEventsMessage = document.getElementById("noEventsMessage");

let selectedCategory = "All";

function filterEvents() {
  if (eventCards.length === 0) {
    return;
  }

  let searchText = "";
  if (searchInput) {
    searchText = searchInput.value.toLowerCase().trim();
  }

  let visibleCount = 0;

  for (let i = 0; i < eventCards.length; i++) {
    const card = eventCards[i];
    const cardCategory = card.getAttribute("data-category");
    const cardTitle = card.querySelector(".event-title").textContent.toLowerCase();

    const matchesCategory = (selectedCategory === "All" || cardCategory === selectedCategory);
    const matchesSearch = cardTitle.includes(searchText);

    if (matchesCategory && matchesSearch) {
      card.classList.remove("d-none");
      visibleCount = visibleCount + 1;
    } else {
      card.classList.add("d-none");
    }
  }

  if (noEventsMessage) {
    if (visibleCount === 0) {
      noEventsMessage.classList.remove("d-none");
    } else {
      noEventsMessage.classList.add("d-none");
    }
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterEvents);
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }

    this.classList.add("active");
    selectedCategory = this.getAttribute("data-category");
    filterEvents();
  });
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPakistaniPhone(phone) {
  const cleanedPhone = phone.replace(/[\s-]/g, "");
  const phonePattern = /^(03|\+923)[0-9]{9}$/;
  return phonePattern.test(cleanedPhone);
}

function setFieldStatus(element, isValid) {
  if (isValid) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

const bookingForm = document.getElementById("bookingForm");
const eventSelect = document.getElementById("eventSelect");
const ticketCountInput = document.getElementById("ticketCount");

function getEventPrice(eventName) {
  if (eventName === "Karachi Coastal Music Festival") {
    return 2500;
  } else if (eventName === "Lahore Tech & AI Summit 2026") {
    return 1800;
  } else if (eventName === "Lahore Food Street Carnival") {
    return 1000;
  } else if (eventName === "Karachi Night Sports & Cricket Cup") {
    return 1200;
  } else if (eventName === "LUMS Product & Tech Workshop") {
    return 1500;
  } else if (eventName === "Islamabad Acoustic Music Mela") {
    return 2200;
  } else {
    return 0;
  }
}

function updateBookingSummary() {
  const summaryEvent = document.getElementById("summaryEvent");
  const summaryPrice = document.getElementById("summaryPrice");
  const summaryQuantity = document.getElementById("summaryQuantity");
  const summaryTotal = document.getElementById("summaryTotal");

  if (!eventSelect || !ticketCountInput || !summaryEvent) {
    return;
  }

  const selectedEvent = eventSelect.value;
  const pricePerTicket = getEventPrice(selectedEvent);
  let quantity = parseInt(ticketCountInput.value, 10);

  if (isNaN(quantity) || quantity < 1) {
    quantity = 0;
  }

  if (selectedEvent === "") {
    summaryEvent.textContent = "No event selected";
    summaryPrice.textContent = "PKR 0";
    summaryQuantity.textContent = "0";
    summaryTotal.textContent = "PKR 0";
  } else {
    const totalAmount = pricePerTicket * quantity;
    summaryEvent.textContent = selectedEvent;
    summaryPrice.textContent = "PKR " + pricePerTicket.toLocaleString();
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = "PKR " + totalAmount.toLocaleString();
  }
}

if (eventSelect) {
  eventSelect.addEventListener("change", updateBookingSummary);
}

if (ticketCountInput) {
  ticketCountInput.addEventListener("input", updateBookingSummary);
}

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const termsCheck = document.getElementById("termsCheck");
    const successAlert = document.getElementById("bookingSuccessAlert");

    let isFormValid = true;

    if (fullName.value.trim() === "") {
      setFieldStatus(fullName, false);
      isFormValid = false;
    } else {
      setFieldStatus(fullName, true);
    }

    if (!isValidEmail(email.value.trim())) {
      setFieldStatus(email, false);
      isFormValid = false;
    } else {
      setFieldStatus(email, true);
    }

    if (!isValidPakistaniPhone(phone.value.trim())) {
      setFieldStatus(phone, false);
      isFormValid = false;
    } else {
      setFieldStatus(phone, true);
    }

    if (eventSelect.value === "") {
      setFieldStatus(eventSelect, false);
      isFormValid = false;
    } else {
      setFieldStatus(eventSelect, true);
    }

    const quantity = parseInt(ticketCountInput.value, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 5) {
      setFieldStatus(ticketCountInput, false);
      isFormValid = false;
    } else {
      setFieldStatus(ticketCountInput, true);
    }

    if (!termsCheck.checked) {
      setFieldStatus(termsCheck, false);
      isFormValid = false;
    } else {
      setFieldStatus(termsCheck, true);
    }

    if (isFormValid) {
      successAlert.classList.remove("d-none");
      bookingForm.reset();

      const inputs = bookingForm.querySelectorAll(".form-control, .form-select, .form-check-input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-valid");
      }

      updateBookingSummary();
      successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      successAlert.classList.add("d-none");
    }
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactSubject = document.getElementById("contactSubject");
    const contactMessage = document.getElementById("contactMessage");
    const contactSuccessAlert = document.getElementById("contactSuccessAlert");

    let isFormValid = true;

    if (contactName.value.trim() === "") {
      setFieldStatus(contactName, false);
      isFormValid = false;
    } else {
      setFieldStatus(contactName, true);
    }

    if (!isValidEmail(contactEmail.value.trim())) {
      setFieldStatus(contactEmail, false);
      isFormValid = false;
    } else {
      setFieldStatus(contactEmail, true);
    }

    if (contactSubject.value.trim() === "") {
      setFieldStatus(contactSubject, false);
      isFormValid = false;
    } else {
      setFieldStatus(contactSubject, true);
    }

    if (contactMessage.value.trim() === "") {
      setFieldStatus(contactMessage, false);
      isFormValid = false;
    } else {
      setFieldStatus(contactMessage, true);
    }

    if (isFormValid) {
      contactSuccessAlert.classList.remove("d-none");
      contactForm.reset();

      const inputs = contactForm.querySelectorAll(".form-control");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-valid");
      }
    } else {
      contactSuccessAlert.classList.add("d-none");
    }
  });
}

updateBookingSummary();
