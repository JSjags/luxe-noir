document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointment-form");
  const modal = document.getElementById("success-modal");
  const closeBtn = document.querySelector(".close-modal");

  // Set minimum date to today
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // Form validation messages
  const errorMessages = {
    name: "Please enter your full name (minimum 3 characters)",
    email: "Please enter a valid email address",
    phone: "Please enter a valid 11-digit phone number",
    date: "Please select a future date",
    time: "Please select an appointment time",
    service: "Please select a service type",
  };

  // Show error message
  function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.classList.add("error");
  }

  // Clear error message
  function clearError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
    input.classList.remove("error");
  }

  // Validate form fields
  function validateField(input) {
    if (input.validity.valid) {
      clearError(input);
      return true;
    } else {
      showError(input, errorMessages[input.id]);
      return false;
    }
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate all required fields
    form
      .querySelectorAll("input[required], select[required]")
      .forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

    if (isValid) {
      // Show success modal
      modal.style.display = "flex";

      // Reset form
      form.reset();

      // Clear any remaining error messages
      form.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });
    }
  });

  // Close modal
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Real-time validation
  form.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });
});
