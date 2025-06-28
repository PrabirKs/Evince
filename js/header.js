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
  const menuItems = document.querySelectorAll("#mobile-menu .mobile-option");
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

  // Mobile About Us dropdown hover logic
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  const mobileSubmenu = mobileDropdown ? mobileDropdown.querySelector('.mobile-submenu') : null;
  if (mobileDropdown && mobileSubmenu) {
    mobileDropdown.addEventListener('click', function () {
      if(mobileDropdown.classList.contains('open')){
        mobileDropdown.classList.remove('open');
        mobileSubmenu.style.display = 'none';
      }else{
        mobileDropdown.classList.add('open');
        mobileSubmenu.style.display = 'block';
      }
    });
    mobileDropdown.addEventListener('mouseleave', function () {
      mobileDropdown.classList.remove('open');
      mobileSubmenu.style.display = 'none';
    });
    mobileSubmenu.addEventListener('mouseenter', function () {
      mobileDropdown.classList.add('open');
      mobileSubmenu.style.display = 'block';
    });
    mobileSubmenu.addEventListener('mouseleave', function () {
      mobileDropdown.classList.remove('open');
      mobileSubmenu.style.display = 'none';
    });
  }

  // Function to update image paths
  const updateImageAndLinkPaths = () => {
    // Determine if we're in a subdirectory
    const isSubdirectory = window.location.pathname.includes('/pages/');
    const basePath = isSubdirectory ? '../components/images/' : './components/images/'; // If subdirectory, use "../", else "./"
    const commonBasePath = isSubdirectory ? "../" : "./"

    // Select all images inside social links
    const images = document.querySelectorAll('.social-icon-header img, .logo img');
    const links = document.querySelectorAll('.menu-item, .mobile-menu-item, .sub-menu-option')
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

  // Dropdown hover fix for About menu with 1-second delay on hide
  const aboutMenu = document.querySelector('.desktop-menu li.group');
  const aboutDropdown = aboutMenu ? aboutMenu.querySelector('ul') : null;
  const center = document.getElementsByClassName("center")[0]

  if (aboutMenu && aboutDropdown) {
    let dropdownTimeout;

    const showDropdown = () => {
      clearTimeout(dropdownTimeout);
      aboutDropdown.style.display = 'block';
    };

    const hideDropdown = () => {
      dropdownTimeout = setTimeout(() => {
        aboutDropdown.style.display = 'none';
      }, 1000); // 1 second delay
    };
    const hideDropdown2 = () => {
        aboutDropdown.style.display = 'none';
    };

    aboutMenu.addEventListener('mouseenter', showDropdown);
    aboutMenu.addEventListener('mouseleave', hideDropdown);
    aboutDropdown.addEventListener('mouseenter', showDropdown);
    aboutDropdown.addEventListener('mouseleave', hideDropdown2);
    center.addEventListener("mouseenter",hideDropdown2);
  }
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
