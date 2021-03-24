// Set theme
function setTheme(themeName) {
    document.documentElement.className = themeName;
  }
  // Toggle theme
  function toggleTheme() {
    var iconLight = document.getElementById("theme-icon-to-light");
    var iconDark = document.getElementById("theme-icon-to-dark");
    var keyboardDark = document.getElementById("keyboard-dark");
    var keyboardLight = document.getElementById("keyboard-light");
  
    if (document.documentElement.className === "theme-dark") {
      setTheme("theme-light");
      iconLight.style.display = "none";
      iconDark.style.display = "inline";
      keyboardDark.style.display = "none";
      keyboardLight.style.display = "block";
    } else {
      setTheme("theme-dark");
      iconLight.style.display = "inline";
      iconDark.style.display = "none";
      keyboardDark.style.display = "block";
      keyboardLight.style.display = "none";
    }
  }
  // Set initial theme on load
  (function () {
    setTheme("theme-dark");
  })();