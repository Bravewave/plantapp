const dbName = "PlantAppLocalDB";
const storeName = "UsernameStore"

function openDB() {
    return new Promise ((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error("Local storage error:", event.target.errorCode);
            reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };
    });
}

function saveUsername(username) {
    openDB().then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.put({ id: "username", name: username });

        transaction.oncomplete = () => {
            console.log("Username saved to IndexedDB");
        };

        transaction.onerror = (event) => {
            console.error("Transaction error:", event.target.errorCode);
        };
    });
}

function getUsername() {
    return new Promise((resolve, reject) => {
        openDB().then((db) => {
            const transaction = db.transaction([storeName]);
            const store = transaction.objectStore(storeName);
            const request = store.get("username");

            request.onsuccess = (event) => {
                resolve(event.target.result ? event.target.result.name : null);
            };

            request.onerror = (event) => {
                console.error("Request error:", event.target.errorCode);
                reject(event.target.errorCode);
            };
        });
    });
}

module.exports = { saveUsername, getUsername }