document.getElementById("username-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;

    function saveUsername(username) {
        const request = indexedDB.open("userDB", 1);

        request.onupgradeneeded = function (e) {
            const db = e.target.result;
            db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction(["users"], "readwrite");
            const store = transaction.objectStore("users");
            store.put({ username: username });
            
            transaction.oncomplete = function() {
                // Redirect to feed page after saving username
                window.location.href = "/feed";
            };
            
            transaction.onerror = function() {
                console.error("Transaction error", transaction.error);
            };
        };

        request.onerror = function(e) {
            console.error("Local storage error", e.target.error);
        };
    }

    saveUsername(username);
});