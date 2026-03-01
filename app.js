/* ==========================================================
   THEME TOGGLE (Core #1 + Bonus localStorage)
========================================================== */
const themeBtn = document.getElementById("themeBtn");
const expandedCountEl = document.getElementById("expandedCount");

function isDarkMode() {
  return document.body.classList.contains("dark");
}

function setThemeButtonLabel() {
  themeBtn.textContent = isDarkMode() ? "Light Mode" : "Dark Mode";
}

function saveThemePreference() {
  localStorage.setItem("theme", isDarkMode() ? "dark" : "light");
}

function restoreThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  setThemeButtonLabel();
  saveThemePreference();
});

function updateExpandedCount() {
  const count = document.querySelectorAll(".card.expanded").length;
  expandedCountEl.textContent = count;
}

/* ==========================================================
   CARD EXPAND/COLLAPSE
========================================================== */
const cards = document.querySelectorAll(".card");

function toggleCard(card) {
  card.classList.toggle("expanded");
  const isExpanded = card.classList.contains("expanded");
  
  // Toggling the ARIA state (aria-expanded)
  card.setAttribute("aria-expanded", isExpanded); // Added line
  
  updateExpandedCount();
}

cards.forEach((card) => {
  card.setAttribute("aria-expanded", "false");

  card.addEventListener("click", () => {
    toggleCard(card);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCard(card);
    }
  });
});

restoreThemePreference();
setThemeButtonLabel();
updateExpandedCount()
