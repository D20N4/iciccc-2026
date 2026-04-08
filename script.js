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

  //=========================================
  // 4. RELIABLE DYNAMIC VISITOR COUNT
  //=========================================
  function loadVisitorCount() {
    const counterElement = document.getElementById("v-count");
    if (!counterElement) return;

    // counterapi.dev is more stable than countapi.xyz
    // Use your specific college domain as the namespace
    const namespace = "iciccc2026-gcet-edu";
    const key = "home_visits";

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then((res) => {
        if (!res.ok) throw new Error("Counter Service Error");
        return res.json();
      })
      .then((data) => {
        // Success: Real dynamic data from the API
        counterElement.innerText = data.count.toLocaleString();
      })
      .catch((err) => {
        console.error("Counter failed:", err);
        // Dynamic Fallback: Increments locally if the server is down
        let localCount = parseInt(localStorage.getItem("v_sim") || "1240");
        localCount++;
        localStorage.setItem("v_sim", localCount);
        counterElement.innerText = localCount.toLocaleString();
      });
  }

  loadVisitorCount();
});
