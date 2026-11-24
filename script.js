const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : preferredTheme;

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    if (themeToggle) {
        const isDark = theme === "dark";
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        themeToggle.querySelector("span").textContent = isDark ? "☀" : "☾";
    }
}

applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}

const currentYear = new Date().getFullYear();
document.querySelectorAll("#year, .year").forEach(function (year) {
    year.textContent = currentYear;
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");
        const formStatus = document.getElementById("formStatus");

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;

        if (!name) {
            nameError.textContent = "Name is required.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Enter a valid email.";
            isValid = false;
        }

        if (!subject) {
            subjectError.textContent = "Subject is required.";
            isValid = false;
        }

        if (!message) {
            messageError.textContent = "Message is required.";
            isValid = false;
        }

        if (isValid) {
            formStatus.textContent = "Thank you! Your form passed validation.";
            contactForm.reset();
        }
    });
}