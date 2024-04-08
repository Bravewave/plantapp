// Reverse geolocation
function reverseGeolocation(latitude, longitude) {
    // source: https://stackoverflow.com/questions/3513134/how-to-reverse-geocode-without-google
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;

    // Make request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            // Extract address information
            var address = response.display_name;
            const addressField = document.getElementById("address");
            addressField.innerHTML = "Location: " + address;
            addressField.appendChild(document.createElement("br"));
            addressField.appendChild(document.createElement("br"));
        })
        .catch(error => {
            console.error('Error performing reverse geocoding:', error);
        });
}

const latitudeField = document.getElementById("lat");
const longtitudeField = document.getElementById("lon");

// Update address when input changes
longtitudeField.addEventListener("input",updateAddress);
latitudeField.addEventListener("input",updateAddress);

function updateAddress() {
    var latVal = parseFloat(document.getElementById("lat").value.trim());
    var lonVal = parseFloat(document.getElementById("lon").value.trim());
    if (latVal && lonVal) {
        reverseGeolocation(latVal, lonVal);
    }
}

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