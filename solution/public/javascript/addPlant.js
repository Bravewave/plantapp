// Sun Exposure checkbox expansion
const sunExposureCB = document.getElementById("sunExposure");
const expandedCBs = document.getElementById("expandedCBs");

sunExposureCB.addEventListener("change", function() {
    // Check if the checkbox is checked
    if (this.checked) {
        // Create new checkboxes
        const dropdownBox = document.createElement("select");
        dropdownBox.id = "sunChar";

        const option1 = document.createElement("option");
        option1.value = "Full Sun";
        option1.textContent = "Full Sun";

        const option2 = document.createElement("option");
        option2.value = "Partial Shade";
        option2.textContent = "Partial Shade";

        const option3 = document.createElement("option");
        option3.value = "Full Shade";
        option3.textContent = "Full Shade";

        dropdownBox.appendChild(option1);
        dropdownBox.appendChild(option2);
        dropdownBox.appendChild(option3);
        expandedCBs.appendChild(dropdownBox);
    } else {
        // If the checkbox is unchecked, clear the container
        expandedCBs.innerHTML = '';
    }
});
// Add event listener to the initial checkbox
