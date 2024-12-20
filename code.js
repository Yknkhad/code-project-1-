

document.addEventListener("DOMContentLoaded", function () {
  let playersData = [];

 // dark mode toggle
 if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  document.getElementById("dark-mode-toggle").textContent = "Light Mode";
}

const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "Light Mode";
    localStorage.setItem("dark-mode", "enabled");
  } else {
    darkModeToggle.textContent = "Dark Mode";
    localStorage.removeItem("dark-mode");
  }
});



  // Fetch players from the JSON file
  fetch("player.json")
    .then((response) => response.json())
    .then((data) => {
      playersData = data.players; 
      displayPlayers(playersData); 
    })
    .catch((error) => console.error("Error loading player data:", error));

  // Display players 
  function displayPlayers(players) {
    const playersContainer = document.getElementById("players-container");
    playersContainer.innerHTML = "";

    players.forEach((player) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("players-card");

      playerCard.innerHTML = `
        <img src="${player.image_URL}" alt="Photo of ${player.name}" class="player-photo">
        <h3>${player.name}</h3>
      `;

  
      playerCard.addEventListener("click", () => displayPlayerDetails(player));
      playersContainer.appendChild(playerCard);
    });
  }

  // Display player details in the modal
  function displayPlayerDetails(player) {
    const playerDetails = document.getElementById("player-details");
    const playerInfo = document.getElementById("player-info");

    playerInfo.innerHTML = `
      <img src="${player.image_URL}" alt="Photo of ${player.name}" class="player-photo-large">
      <h2>${player.name}</h2>
      <p><strong>Position:</strong> ${player.age}</p>
        <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Club:</strong> ${player.club}</p>
      <p><strong>Nationality:</strong> ${player.nationality}</p>
      <p><strong>Goals:</strong> ${player.goals}</p>
      <p><strong>Assists:</strong> ${player.assists}</p>
       <div class="honors">
          <h4>Honors:</h4>
          <ul>
            ${player.honors.map(honor => `<li>${honor}</li>`).join('')}
          </ul>
        </div>
        <p>${player.description}</p>

      
    `;

    playerDetails.style.display = "block";
    playerDetails.setAttribute("aria-hidden", "false");
  }

  // Close button
  document.getElementById("close-modal").addEventListener("click", () => {
    const playerDetails = document.getElementById("player-details");
    playerDetails.style.display = "none";
    playerDetails.setAttribute("aria-hidden", "true");
  });

  // Search button
  document.getElementById("search-input").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    const filteredPlayers = playersData.filter(
      (player) =>
        player.name.toLowerCase().includes(query) ||
        player.club.toLowerCase().includes(query)
    );

    displayPlayers(filteredPlayers);
  });
});

