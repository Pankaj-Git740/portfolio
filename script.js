// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1000);
  }
});

// Typing Animation
document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.getElementById("typed-text");
  if (typedElement) {
    const typed = new Typed("#typed-text", {
      strings: [
        "Kumar",
        "Developer",
        "Innovator",
        "Problem Solver",
        "Tech Enthusiast",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }
});

// Particle Background
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.width = Math.random() * 4 + 2 + "px";
  particle.style.height = particle.style.width;
  particle.style.animationDuration = Math.random() * 3 + 5 + "s";

  const particlesBg = document.getElementById("particles-bg");
  if (particlesBg) {
    particlesBg.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 8000);
  }
}

// Create particles continuously
setInterval(createParticle, 300);

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const increment = target / 100;
  let current = 0;

  const updateCounter = () => {
    if (current < target) {
      current += increment;
      element.textContent = Math.ceil(current);
      setTimeout(updateCounter, 20);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach((counter) => {
          if (!counter.classList.contains("animated")) {
            counter.classList.add("animated");
            animateCounter(counter);
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

// Observe counter sections
document.querySelectorAll("section").forEach((section) => {
  if (section.querySelector(".counter")) {
    counterObserver.observe(section);
  }
});

// Skill Bar Animation
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll("[data-width]");
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
            bar.style.transition = "width 1.5s ease-in-out";
          }, index * 200);
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

// Observe skills section
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  skillBarObserver.observe(skillsSection);
}

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Mobile Menu Toggle (Replace Alpine.js functionality)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
}

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (navbar) {
    // Add/remove backdrop blur based on scroll
    if (currentScrollY > 50) {
      navbar.classList.add("backdrop-blur-xl", "bg-white/90");
      navbar.classList.remove("bg-white/80");
    } else {
      navbar.classList.remove("backdrop-blur-xl", "bg-white/90");
      navbar.classList.add("bg-white/80");
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
  }

  lastScrollY = currentScrollY;

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    if (currentScrollY > 300) {
      backToTop.classList.remove("opacity-0", "invisible");
    } else {
      backToTop.classList.add("opacity-0", "invisible");
    }
  }
});

// Back to top functionality
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Resume Functions
function downloadResume() {
  const resumeLink = document.getElementById("resume-download-link");
  if (resumeLink) {
    resumeLink.click();
    setTimeout(() => {
      alert("Resume download started! 📄✨");
    }, 100);
  }
}

function openPDFModal() {
  const modal = document.getElementById("pdfModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closePDFModal() {
  const modal = document.getElementById("pdfModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// PDF Modal Event Listeners
const pdfModal = document.getElementById("pdfModal");
if (pdfModal) {
  // Background click pe close
  pdfModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closePDFModal();
    }
  });
}

// Escape key se close
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePDFModal();
  }
});

// ===== EMAILJS CONTACT FORM (FIXED VERSION) =====
// Initialize EmailJS with modern syntax
(function () {
  emailjs.init({
    publicKey: "AgXBNTZEADcpOCOOy",
    blockHeadless: false,
    limitRate: {
      id: "app",
      throttle: 10000, // 10 seconds
    },
  });
  console.log("EmailJS initialized successfully");
})();

// Contact Form Handler (Fixed)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");

    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("successMessage");
    const errorMsg = document.getElementById("errorMessage");

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="flex items-center justify-center"><i class="fas fa-spinner fa-spin mr-3"></i>Sending...</span>';

    // Hide previous messages
    if (successMsg) successMsg.classList.add("hidden");
    if (errorMsg) errorMsg.classList.add("hidden");

    // Get form values correctly
    const formData = new FormData(this);
    console.log("Form data:", Object.fromEntries(formData));

    // Template parameters matching your EmailJS template
    const templateParams = {
      from_name: formData.get("firstName") + " " + formData.get("lastName"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      reply_to: formData.get("email"),
    };

    console.log("Template params:", templateParams);

    // Send email using EmailJS
    emailjs
      .send("service_8sktjqo", "template_4silm5o", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Show success message
          if (successMsg) {
            successMsg.classList.remove("hidden");
            setTimeout(() => successMsg.classList.add("hidden"), 5000);
          } else {
            alert("✅ Message sent successfully!");
          }

          // Reset form
          contactForm.reset();
        },
        function (error) {
          console.error("EmailJS FAILED...", error);
          console.error("Error details:", JSON.stringify(error, null, 2));

          // Show detailed error in console for debugging
          if (error.status) {
            console.error("Error Status:", error.status);
          }
          if (error.text) {
            console.error("Error Text:", error.text);
          }

          // Show error message
          if (errorMsg) {
            errorMsg.classList.remove("hidden");
            setTimeout(() => errorMsg.classList.add("hidden"), 5000);
          } else {
            alert(
              "❌ Failed to send message. Error: " +
                (error.text || "Unknown error")
            );
          }
        }
      )
      .finally(function () {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<span class="flex items-center justify-center"><i class="fas fa-paper-plane mr-3"></i>Send Message</span>';
      });
  });
} else {
  console.error("Contact form not found!");
}
