function dropdown(id) {
  document.getElementById(id).classList.toggle("show");
  document.getElementById(id+"-button").classList.toggle("active")
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let buttons = document.getElementsByClassName("dropdown-button");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
      let j;
      for (j = 0; j < buttons.length; j++) {
        let openButton = buttons[j];
        if (openButton.classList.contains('active')) {
          openButton.classList.remove('active');
        }
      }
    }
  }

