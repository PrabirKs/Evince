const bindNavScript = () => {
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

  // Mobile About Us dropdown toggle
  const aboutDropdownToggle = document.getElementById("about-dropdown-toggle");
  if (aboutDropdownToggle) {
    aboutDropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.closest(".mobile-dropdown");
      parent.classList.toggle("open");
    });
  }

  // Close mobile dropdown when another mobile menu item is clicked
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu .mobile-menu-item");
  mobileMenuLinks.forEach((item) => {
    item.addEventListener("click", () => {
      const dropdown = document.querySelector(".mobile-dropdown");
      if (dropdown) dropdown.classList.remove("open");
    });
  });

  // Function to update image paths
  const updateImageAndLinkPaths = () => {
    // Determine if we're in a subdirectory
    const isSubdirectory = window.location.pathname.includes('/pages/');
    const basePath = isSubdirectory ? '../components/images/' : './components/images/'; // If subdirectory, use "../", else "./"
    const commonBasePath = isSubdirectory ? "../" : "./"

    // Select all images inside social links
    const images = document.querySelectorAll('.social-icon-header img, .logo img');
    const links = document.querySelectorAll('.menu-item, .mobile-menu-item')
    images.forEach((img) => {
      let src = img.getAttribute('src');
      img.setAttribute('src',basePath+ src )
    });

    links.forEach((link) => {
      let href = link.getAttribute('href');
      //console.log("href", href, " updated:", commonBasePath + href)
      link.setAttribute("href", commonBasePath + href)
    })
  };

  // Update image paths after the header has been loaded
  updateImageAndLinkPaths();
};

// Function to load the header component
async function loadHeader() {
  try {
    // Determine if we're in a subdirectory
    const isSubdirectory = window.location.pathname.includes('/pages/');
    const basePath = isSubdirectory ? '../' : './';
    
    const response = await fetch(`${basePath}components/header.html`);
    const html = await response.text();
    document.getElementById("header-container").innerHTML = html;

    // Bind navigation script and update image paths
    bindNavScript();
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

// Load header when DOM is ready
document.addEventListener("DOMContentLoaded", loadHeader);
