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