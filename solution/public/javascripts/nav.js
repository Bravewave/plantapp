document.getElementById("menu-toggle").addEventListener("click", () => {
    document.body.classList.toggle("sidebar-active");
    document.getElementById("menu-toggle").classList.toggle("cross");
  });