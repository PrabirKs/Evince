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
