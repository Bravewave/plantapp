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
        document.getElementById("sunChar").style.visibility = "visible";
    } else {
        document.getElementById("sunChar").style.visibility = "hidden";
    }
});