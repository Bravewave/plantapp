document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach(block => {
      block.addEventListener("click", () => {
          const dialogId = block.dataset.dialogId;
          const dialog = document.getElementById(dialogId);
          if (dialog) {
              dialog.classList.add("opening");
              dialog.showModal();
          }
      });
  });

  const closeButtons = document.querySelectorAll("dialog .close");

  closeButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          const dialog = event.target.closest("dialog");
          dialog.classList.remove("opening");
          dialog.close();
      });
  });

  document.querySelectorAll("dialog").forEach(dialog => {
      dialog.addEventListener("close", () => {
          dialog.classList.remove("opening");
      });
  });
});
