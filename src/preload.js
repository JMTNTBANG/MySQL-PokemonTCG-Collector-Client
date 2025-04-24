function sha256(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
}

let offlineCache = localStorage["PokeTCGOfflineCache"];
if (offlineCache) offlineCache = JSON.parse(offlineCache);
else offlineCache = {};

sha256(JSON.stringify(offlineCache)).then((hash) => {
  fetch("http://localhost:49153/databaseFetch", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: `{ "auth": "debug", "offlineCache": "${hash}" }`,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "NoAuth") {
        alert(`Unable to Connect to Database (NoAuth)`);
      } else if (data.message != "NoDiff") {
        prerender = "";
        for (card in data.cards) {
          card = data.cards[card];
          let qty = 0;
          for (adj in data.adjustments) {
            adj = data.adjustments[adj];
            if (adj.EntryID == card.ID) {
              qty += adj.Amount;
            }
          }
          prerender += `<tr><td><button>Adjust</button>\n<button>Details</button></td><td>${qty}</td><td><img src="../assets/${card.Type}.png"</img></td><td>${card.CardType}</td><td>${card.Name}</td><td>${card.Variant}</td><td>${card.Breed}</td><td>${card.Set}</td><td>${card.SetNo}</td></tr>`;
        }
        offlineCache = data;
        localStorage["PokeTCGOfflineCache"] = JSON.stringify(offlineCache);
        localStorage["PokeTCGPreRender"] = prerender;
        console.log("Updated Offline Cache");
      } else {
        console.log("Cache Already Up To Date");
      }
    })
    .catch((err) => {
      if (err.message == "Failed to fetch") {
        alert("Warning: You are offline, some features may not be available.");
      }
    });
});