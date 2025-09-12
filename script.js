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
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
});

// Typing Animation
document.addEventListener("DOMContentLoaded", function () {
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

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

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

  lastScrollY = currentScrollY;

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (currentScrollY > 300) {
    backToTop.classList.remove("opacity-0", "invisible");
  } else {
    backToTop.classList.add("opacity-0", "invisible");
  }
});

// Back to top functionality
document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Contact Form Handler (Alpine.js component)
document.addEventListener("alpine:init", () => {
  Alpine.data("contactForm", () => ({
    form: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
    isSubmitting: false,

    async submitForm() {
      this.isSubmitting = true;

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      alert("Thank you for your message! I'll get back to you soon.");

      // Reset form
      this.form = {
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      };

      this.isSubmitting = false;
    },
  }));
});

// Add scroll-triggered animations for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply scroll animations to cards and elements
document.addEventListener("DOMContentLoaded", () => {});

function downloadResume() {
  // Trigger the hidden download link
  document.getElementById("resume-download-link").click();

  // Optional: Show success message
  setTimeout(() => {
    alert("Resume download started! 📄✨");
  }, 100);
}

function openPDFModal() {
  document.getElementById("pdfModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Background scroll band kar do
}

function closePDFModal() {
  document.getElementById("pdfModal").classList.add("hidden");
  document.body.style.overflow = "auto"; // Background scroll wapis on kar do
}

// Background click pe close
document.getElementById("pdfModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closePDFModal();
  }
});

// Escape key se close
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePDFModal();
  }
});

// ===== EMAIL.JS CONTACT FORM WITH DEBUGGING =====
(function () {
  emailjs.init({
    publicKey: "AgXBNTZEADcpOCOOy", // Your EmailJS public key
    blockHeadless: false,
    limitRate: {
      throttle: 5,
    },
  });
  console.log("EmailJS initialized"); // Debug log
})();

// Contact Form Handler with Enhanced Debugging
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted"); // Debug log

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

    // Debug: Log form data
    const formData = new FormData(this);
    console.log("Form data:", Object.fromEntries(formData));

    // Send email using EmailJS with detailed error logging
    const templateParams = {
      name: this.querySelector('[name="name"]').value,
      email: this.querySelector('[name="email"]').value,
      subject: this.querySelector('[name="subject"]').value,
      message: this.querySelector('[name="message"]').value,
    };

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
