document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach(block => {
      block.addEventListener("click", () => {
          const dialogId = block.dataset.dialogId;
          const dialog = document.getElementById(dialogId);
          if (dialog) {
            dialog.style.display = "flex";
            setTimeout(() => {
              dialog.classList.add("opening");
              dialog.showModal();
          }, 10); 
          }
      });
  });

  const closeButton = document.querySelectorAll("dialog .close");

  closeButton.forEach(button => {
      button.addEventListener("click", (event) => {
          const dialog = event.target.closest("dialog");
          dialog.classList.remove("opening");
          dialog.classList.add("closing");
          setTimeout(() => {
            dialog.classList.remove("closing");
            dialog.close();
            dialog.style.display = "none";
        }, 300);
      });
  });

  document.querySelectorAll("dialog").forEach(dialog => {
      dialog.addEventListener("close", () => {
          dialog.classList.remove("opening");
          dialog.style.display = "none";
      });
  });
});
