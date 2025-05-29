// Mobile menu toggle with smooth transitions
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    const button = this;

    // Toggle menu-open class on both menu and button
    menu.classList.toggle("menu-open");
    button.classList.toggle("menu-open");

    // For better accessibility
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !isExpanded);
    menu.setAttribute("aria-hidden", isExpanded);
  });

// Close mobile menu when a navbar option is clicked
const menuItems = document.querySelectorAll("#mobile-menu .mobile-menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const menu = document.getElementById("mobile-menu");
    const button = document.getElementById("mobile-menu-button");

    // Remove menu-open class from both menu and button
    menu.classList.remove("menu-open");
    button.classList.remove("menu-open");

    // Update accessibility attributes
    button.setAttribute("aria-expanded", false);
    menu.setAttribute("aria-hidden", true);
  });
});
