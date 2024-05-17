function attachDialogEvents() {
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
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    attachDialogEvents();
  
    document.querySelectorAll('.chat-form').forEach(form => {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const input = this.querySelector('.chat-input');
        const message = input.value.trim();
        if (message === "") return;
  
        const dialog = this.closest('dialog');
        const plantId = "66468a95274d8469587413af";
        // const plantId = dialog.getAttribute('data-plant-id'); // Assuming each dialog has a data-plant-id attribute
        const user_name = 'Your UserName'; // Replace with the actual user's name
  
        fetch('/addChatMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ plantId, user_name, message })
        })
        .then(response => response.text())
        .then(data => {
          if (data === 'Message added') {
            const chatMessagesDiv = dialog.querySelector('.chat-messages');
            const newMessage = document.createElement('div');
            newMessage.textContent = `${user_name}: ${message}`;
            chatMessagesDiv.appendChild(newMessage);
            input.value = ''; // Clear the input field
          }
        })
        .catch(error => console.error('Error:', error));
      });
    });
  });