document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. INJECT "BACK TO TOP" BUTTON AUTOMATICALLY
  // ==========================================
  const scrollBtn = document.createElement("div");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
  document.body.appendChild(scrollBtn);

  // Show/Hide button on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ==========================================
  // 2. LOAD UNIVERSAL HEADER
  // ==========================================
  const headerContainer = document.getElementById("header-placeholder");
  if (headerContainer) {
    fetch("header.html")
      .then((response) => {
        if (!response.ok) throw new Error("Header file not found");
        return response.text();
      })
      .then((data) => {
        headerContainer.innerHTML = data;

        // RE-INITIALIZE LOGO SCROLL
        const logo = document.querySelector(".navbar-brand");
        if (logo) {
          logo.addEventListener("click", function (e) {
            if (window.location.pathname.includes(this.getAttribute("href"))) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          });
        }
      })
      .catch((error) => console.error("Error loading header:", error));
  }

  // ==========================================
  // 3. LOAD UNIVERSAL FOOTER
  // ==========================================
  const footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    fetch("footer.html")
      .then((response) => {
        if (!response.ok) throw new Error("Footer file not found");
        return response.text();
      })
      .then((data) => {
        footerContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
  }


  loadVisitorCount();
});
// Conference Countdown Timer
const countdown = () => {
    const countDate = new Date("October 8, 2026 09:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // Time calculations
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Update HTML
    if (gap > 0) {
        document.getElementById("days").innerText = Math.floor(gap / day);
        document.getElementById("hours").innerText = Math.floor((gap % day) / hour);
        document.getElementById("minutes").innerText = Math.floor((gap % hour) / minute);
        document.getElementById("seconds").innerText = Math.floor((gap % minute) / second);
    }
};

// Run countdown every second
setInterval(countdown, 1000);
countdown(); // Run immediately on load