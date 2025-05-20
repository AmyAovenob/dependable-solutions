const app = {
  // Switch theme
  switchTheme: (theme) => {
    // Set the theme on <html>
    document.documentElement.setAttribute("data-theme", theme);

    // Store selection
    localStorage.setItem("theme", theme);

    // Update checked state
    app.setCheckedRadio("theme", theme);
  },
  // END

  // Init theme
  initTheme: () => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);

    // Ensure the correct radio is checked
    const radioToCheck = document.querySelector(
      `input[name="theme"][value="${saved}"]`
    );
    if (radioToCheck) {
      radioToCheck.checked = true;
    }
  },
  // END

  // switch navigation position
  switchNavigationPosition: (position) => {
    document.documentElement.setAttribute("data-navigation-position", position);

    // store navigation position
    localStorage.setItem("navigation-position", position);

    // update checked state
    app.setCheckedRadio("navbar", position);

    // Update ui
    app.updateNavigationUiPosition(position);
  },
  // END

  // Init Navigation position
  initNavigationPosition: () => {
    const saved = localStorage.getItem("navigation-position") || "top-navbar";
    document.documentElement.setAttribute("data-navigation-position", saved);

    // Ensure the correct radio is checked
    const positionRadioToCheck = document.querySelector(
      `input[name="navbar"][value="${saved}"]`
    );
    if (positionRadioToCheck) {
      positionRadioToCheck.checked = true;
    }

    // Update ui
    app.updateNavigationUiPosition(saved);
  },
  // END

  // Update Navigation ui
  updateNavigationUiPosition: (position) => {
    const navbar = document.querySelector(".navbar-wrapper");
    const sidebar = document.querySelector(".sidebar-wrapper");
    const container = document.querySelector(".container-section");

    if (!navbar || !sidebar || !container) return;

    if (position === "side-navbar") {
      navbar.classList.add("hidden");
      sidebar.classList.remove("hidden");
      container.classList.add("with-sidebar");
    } else {
      navbar.classList.remove("hidden");
      sidebar.classList.add("hidden");
      container.classList.remove("with-sidebar");
    }
  },
  // END

  // Set settings radio checked of configuration
  setCheckedRadio: (name, value) => {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach((radio) => {
      radio.checked = radio.value === value;
    });
  },
  // END

  // Tab
  initTabs: (tabContainerSelector) => {
    const tabContainers = document.querySelectorAll(tabContainerSelector);

    if (!tabContainers) return;

    tabContainers.forEach((container) => {
      const tabButtons = container.querySelectorAll("[data-tab-button]");
      const tabContents = container.querySelectorAll("[data-tab-content]");

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.getAttribute("data-tab-button");

          // Remove active classes
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          // Add active classes
          button.classList.add("active");
          container
            .querySelector(`[data-tab-content="${target}"]`)
            .classList.add("active");
        });
      });
    });
  },
  // END

  // Modal
  initModals() {
    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeButtons = document.querySelectorAll("[data-modal-close]");
    const overlays = document.querySelectorAll("[data-modal]");

    // Open modal
    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-open");
        const modal = document.querySelector(`[data-modal="${target}"]`);
        modal?.classList.add("active");
      });
    });

    // Close modal
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest("[data-modal]")?.classList.remove("active");
      });
    });

    // Close on background click
    overlays.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });
  },
  // END

  // Mobile menu
  initMobileMenu: () => {
    const menu = document.getElementById("mobileMenu");
    const openBtn = document.getElementById("mobileMenuOpen");
    const closeBtn = document.getElementById("mobileMenuClose");

    openBtn.addEventListener("click", () => {
      menu.classList.add("active");
    });

    // Close
    const closeMenu = () => {
      menu.classList.remove("active");

      // Keep it visible during animation (300ms matches CSS transition)
      setTimeout(() => {
        menu.style.visibility = "hidden";
      }, 300);
    };

    closeBtn.addEventListener("click", closeMenu);

    menu.addEventListener("click", (e) => {
      if (e.target === menu) {
        closeMenu();
      }
    });

    // Optional: close menu on clicking outside the menu content
    menu.addEventListener("click", (e) => {
      if (e.target === menu) {
        menu.classList.remove("active");
      }
    });

    // Reset visibility when opening
    openBtn.addEventListener("click", () => {
      menu.style.visibility = "visible";
    });
  },
  // END

  // Show logged in username
  showUsername: () => {
    const name = localStorage.getItem("username") || "";

    if (document.querySelector(".titleName")) {
      document.querySelector(".titleName").innerHTML = name;
    }

    document.querySelector(".user-name p").innerHTML = name;
  },
};

// On page load
document.addEventListener("DOMContentLoaded", () => {
  app.initTheme();
  app.initNavigationPosition();
  app.initTabs(".tab-wrapper");
  app.initModals();
  app.initMobileMenu();
  app.showUsername();
});
