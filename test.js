// Adding time in
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();

// Tabbing:
// Source: https://www.w3schools.com/howto/howto_js_tabs.asp
function openTab(evt, tabName) {
  // Get all elements with class="tabcontent" and hide them, also remove the active class
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].className = tabcontent[i].className.replace(" active", "");
  }
  // Get all elements with class="tablink" and remove the class "active"
  var tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, add an "active" class to the button that opened the tab, and to the tab itself
  document.getElementById(tabName).style.display = "inline";
  document.getElementById(tabName).className += " active";
  evt.currentTarget.className += " active";

  // If the window is minimized, open it
  var parentDivId = document.getElementById(tabName).parentElement.id;
  var parentDiv = document.getElementById(parentDivId);
  if (parentDiv.style.height === "0px") {
    parentDiv.style.height = "";
  }
}

// Minimize window on click
function minimizeWindow(windowName) {
  var window = document.getElementById(windowName);
  var content = window.querySelector(".content.active");

  if (window.style.height != "0px") {
    window.style.height = "0px";
    content.style.display = "none";
    window.style.paddingBottom = "";
  } else {
    window.style.height = ""; // Default value
    content.style.display = ""; // Also default
    window.style.paddingBottom = "";
  }
}

// Maximinize window on click
function maximizeWindow(windowName) {
  var window = document.getElementById(windowName);
  var content = window.querySelector(".content.active");

  if (window.style.height === "0px") {
    // If minimized, make the content visible again
    window.style.height = "";
    content.style.display = "";
  } else if (window.style.paddingBottom != "50px") {
    window.style.paddingBottom = "50px";
  } else {
    window.style.paddingBottom = "0px";
  }
}

// Set theme
function setTheme(themeName) {
  document.documentElement.className = themeName;
}
// Toggle theme
function toggleTheme() {
  var iconLight = document.getElementById("theme-icon-to-light");
  var iconDark = document.getElementById("theme-icon-to-dark");

  if (document.documentElement.className === "theme-dark") {
    setTheme("theme-light");
    iconLight.style.display = "none";
    iconDark.style.display = "inline";
  } else {
    setTheme("theme-dark");
    iconLight.style.display = "inline";
    iconDark.style.display = "none";
  }
}
// Set initial theme on load
(function () {
  setTheme("theme-dark");
})();

// Open modals
function openModal(modalName) {
  document.getElementById(modalName.concat("-modal")).style.display = "block";
}

// Close modals
function closeModal(modalName) {
  document.getElementById(modalName.concat("-modal")).style.display = "none";
}
