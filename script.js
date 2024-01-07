// Adding Sticky navbar
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", this.window.scrollY >= 55);
});

// For Focus on Contact Form
document.addEventListener('DOMContentLoaded', function() {
    // retrieve all input elements and loop through them
    const inputs = document.querySelectorAll(".contact-input");

    inputs.forEach((ipt) => {
        // add an event listener for when an input field gains focus
        ipt.addEventListener("focus", () => {
            // add the "focus" and "not-empty" classes to the input's parent element
            ipt.parentNode.classList.add("focus");
            ipt.parentNode.classList.add("not-empty");
        });

        // add and event listener for when an input field loses focus
        ipt.addEventListener("blur", () => {
            // check if the input field is empty
            if (ipt.value == "") {
                ipt.parentNode.classList.remove("not-empty");
            }
            ipt.parentNode.classList.remove("focus");
        });

        // Retrieving stored value from local storage
        const storedValue = localStorage.getItem(ipt.name);

        //if stored value exists, set the input value
        if (storedValue) {
            ipt.value = storedValue;
            ipt.parentNode.classList.add("not-empty");
        }

        // add an event listener to update the local storage when the input changes
        ipt.addEventListener("input", () => {
            localStorage.setItem(ipt.name, ipt.value);
        });
    });
});

// Adding Scroll Top
function scrollUp () {
    const scrollUp = document.getElementById("scroll-up");
    //when the scroll is higher than 560 viewport height, add the show-scroll
    if (this.scrollY >= 560) {
        scrollUp.classList.add("show-scroll");
    } 
    else {
        scrollUp.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollUp);

// Underline scroll and resize
function updateUnderLinePosition () {
    // Select all 'section' Elements on the page
    const sections = document.querySelectorAll("section");

    // Initialize variable to keep track of the currently visible section
    let currentSection = null;

    // Looping through each of the sections
    sections.forEach((section) => {
        // Retrieve the position and dimensions of the section relative to the viewport
        const rect = section.getBoundingClientRect();

        //Check if the section is at least 50% visible in the viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            // If the condition is met, this means that the section is currently visible
            currentSection = section;
        }
    });

    if (currentSection) {
        // Find the link in the navigation bar that corresponds to the currently visible section
        const correspondingLink = document.querySelector(`a[href="#${currentSection.id}"]`);

        // Select the underline element in the navigation bar
        const underline = document.querySelector(".underline");

        // Check if both the corresponding link and underline element are found
        if (correspondingLink && underline) {
            // Retrieve the position and dimensions of the corresponding element are found
            const linkRect = correspondingLink.getBoundingClientRect();

            // Calculate the offset of the link from the left edge of the container
            const containerOffset = correspondingLink.offsetLeft;

            // Set the width of the underline to be the same as the width of the corresponding link
            underline.style.width = linkRect.width + "px";

            // Set the horizontal position of the underline to match the horizontal position of the corresponding link
            underline.style.transform = `translateX(${containerOffset}px)`;
        }
    }
}

// Event listeners for scroll and resize events
window.addEventListener("scroll", updateUnderLinePosition);
window.addEventListener("resize", updateUnderLinePosition);

// Delay the initial call to udpateUnderlinePosition to ensure that the DOM elements are fully loaded
window.addEventListener("load", function() {
    this.setTimeout(updateUnderLinePosition, 100);
});

// ===== Dark Theme =====
// Get the theme button, and define class names for dark theme "sun" icon
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Retrieve user's selected theme and icon preferences from local storage
const selectedTheme = localStorage.getItem("seleceted-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Define a function to determine the current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// If there is selected theme from local storage
if (selectedTheme) {
    // Apply the selected theme class to the body of document
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"] (darkTheme);

    // Apply the selected icon class to the theme's button
    themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"] (iconTheme);

    // If the selected theme is dark, set the icon color to white
    if (selectedTheme === "dark") {
        themeButton.style.color = "#fff";
    }
}

// Add an event listener for clicks on the theme button
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);

    themeButton.classList.toggle(iconTheme);
    themeButton.classList.toggle("bx-moon");

    // Change the icon color to white in dark mode, or reset to default in light mode
    if (getCurrentTheme() === "dark") {
        themeButton.style.color = "#fff";
    }
    else {
        themeButton.style.color = "";
    }

    // Add a transition effect for a smooth theme change
    document.body.style.transition = "background-color 1s";

    // Save the current theme and icon choice in local storage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// Add an event listener to remove the transition effect after it is completed
document.body.addEventListener('transitionend', () => {
    document.body.style.transition = "";
});

// ----------------------------------------------
// Menu Icon
// Selecting the menu icon and navbar
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

// Adding a click event listener to menu icon
menu.onclick = (e) => {
    // Prevent the Default behavior of the link
    e.preventDefault();

    // Toggle the class "bx-x" on the menu icon
    menu.classList.toggle("bx-x");
    // Toggle the class "open" on navbar
    navbar.classList.toggle("open");
};

// Selecting all navigation links
let navLinks = document.querySelector(".nav-link");

// Adding an event listener to each navigation link
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the target section's ID from the link's href attribute
        let targetID = link.querySelector("a").getAttribute("href");

        // Scroll smoothly to the target section
        document.querySelector(targetID).scrollIntoView({ behavior: "smooth"});

        // Close the Navbar if it's open
        if (navbar.classList.contains("open")) {
            menu.classList.toggle("bx-x");
            navbar.classList.toggle("open");
        }
    });
}); 