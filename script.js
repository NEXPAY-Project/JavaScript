// Initial user data (this would normally come from a backend or database)
let tokens = 0;
let level = 1;
let rank = "Wood";

// Define thresholds for level-up and rank progression
const rankThresholds = [
  { name: "Wood", threshold: 0 },
  { name: "Stone", threshold: 10000 },
  { name: "Iron", threshold: 100000 },
  { name: "Copper", threshold: 500000 },
  { name: "Bronze", threshold: 2500000 },
  { name: "Silver", threshold: 5000000 },
  { name: "Gold", threshold: 10000000 },
  { name: "Platinum", threshold: 25000000 },
  { name: "Diamond", threshold: 50000000 },
  { name: "Pearl", threshold: 250000000 },
  { name: "Emerald", threshold: 500000000 },
  { name: "Sapphire", threshold: 1000000000 }
];

// Tap-to-earn function
function tapToEarn() {
  // Increase tokens with each tap
  tokens += 1; // Change value as needed for your system

  // Check if user qualifies for a new rank
  updateRank();

  // Update the UI
  document.getElementById("token-count").innerText = `Tokens: ${tokens}`;
  document.getElementById("level-rank").innerText = `Level: ${level} Rank: ${rank}`;
}

// Function to update the user's rank based on token count
function updateRank() {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (tokens >= rankThresholds[i].threshold) {
      rank = rankThresholds[i].name;
      level = i + 1;
      break;
    }
  }
}

// Navigation functions
function showSection(section) {
  // Hide all sections
  document.querySelectorAll(".section").forEach(el => el.style.display = "none");

  // Show the selected section
  document.getElementById(section).style.display = "block";
}

// Event listeners for navigation buttons
document.getElementById("mine-btn").addEventListener("click", () => showSection("mine"));
document.getElementById("tasks-btn").addEventListener("click", () => showSection("tasks"));
document.getElementById("rank-btn").addEventListener("click", () => showSection("rank"));
document.getElementById("ref-btn").addEventListener("click", () => showSection("ref"));
document.getElementById("boost-btn").addEventListener("click", () => showSection("boost"));

// Event listener for tap button
document.getElementById("tap-btn").addEventListener("click", tapToEarn);
