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