// Initialize SQLite-like storage using localStorage for simplicity
if (!localStorage.getItem('nexpay_users')) {
    localStorage.setItem('nexpay_users', JSON.stringify({}));
}

// Rank definitions
const ranks = [
    { name: "Wood", tokens_required: 0, icon: "assets/images/wood.png" },
    { name: "Stone", tokens_required: 1000, icon: "assets/images/stone.png" },
    { name: "Iron", tokens_required: 10000, icon: "assets/images/iron.png" },
    { name: "Copper", tokens_required: 50000, icon: "assets/images/copper.png" },
    { name: "Bronze", tokens_required: 250000, icon: "assets/images/bronze.png" },
    { name: "Silver", tokens_required: 1000000, icon: "assets/images/silver.png" },
    { name: "Gold", tokens_required: 5000000, icon: "assets/images/gold.png" },
    { name: "Platinum", tokens_required: 10000000, icon: "assets/images/platinum.png" },
    { name: "Diamond", tokens_required: 50000000, icon: "assets/images/diamond.png" },
    { name: "Pearl", tokens_required: 100000000, icon: "assets/images/pearl.png" },
    { name: "Emerald", tokens_required: 500000000, icon: "assets/images/emerald.png" },
    { name: "Sapphire", tokens_required: 1000000000, icon: "assets/images/sapphire.png" }
];

// Fetch user data from localStorage
function getUserData(userId) {
    const users = JSON.parse(localStorage.getItem('nexpay_users'));
    if (!users[userId]) {
        users[userId] = { tokens: 0, rank: "Wood" };
        localStorage.setItem('nexpay_users', JSON.stringify(users));
    }
    return users[userId];
}

// Update user data in localStorage
function updateUserData(userId, data) {
    const users = JSON.parse(localStorage.getItem('nexpay_users'));
    users[userId] = data;
    localStorage.setItem('nexpay_users', JSON.stringify(users));
}

// Determine rank based on tokens
function determineRank(tokens) {
    let currentRank = ranks[0];
    for (let rank of ranks) {
        if (tokens >= rank.tokens_required) {
            currentRank = rank;
        } else {
            break;
        }
    }
    return currentRank;
}

// Update UI with user data
function updateUI(userData) {
    document.getElementById('level-text').innerText = `Level: ${userData.rank}`;
    document.getElementById('level-icon').src = userData.rank_icon;
}

// Initialize user on page load
document.addEventListener('DOMContentLoaded', () => {
    // For demonstration, we'll use a fixed user ID. In a real app, you'd get this dynamically.
    const userId = 'user123';

    let userData = getUserData(userId);
    userData.rank_icon = ranks.find(rank => rank.name === userData.rank).icon;
    updateUI(userData);

    // Handle Tap to Earn
    document.getElementById('tap-logo').addEventListener('click', () => {
        userData.tokens += 10; // Tokens earned per tap
        const newRank = determineRank(userData.tokens);

        if (newRank.name !== userData.rank) {
            userData.rank = newRank.name;
            userData.rank_icon = newRank.icon;
            alert(`Congratulations! You've reached ${newRank.name} level!`);
        }

        updateUserData(userId, userData);
        updateUI(userData);
    });

    // Handle Navigation Buttons
    document.getElementById('mine-button').addEventListener('click', () => {
        alert('Navigate to Mine Section');
        // Implement navigation logic here
    });

    document.getElementById('tasks-button').addEventListener('click', () => {
        alert('Navigate to Tasks Section');
        // Implement navigation logic here
    });

    document.getElementById('rank-button').addEventListener('click', () => {
        showLeaderboard();
    });

    document.getElementById('ref-button').addEventListener('click', () => {
        alert('Your Referral Link: https://nexpay-project.github.io/nexpay-webapp/?ref=user123');
        // Implement referral logic here
    });

    document.getElementById('boost-button').addEventListener('click', () => {
        alert('Navigate to Boost Section');
        // Implement boost logic here
    });

    // Function to show leaderboard
    function showLeaderboard() {
        // For demonstration, we'll create a mock leaderboard
        const leaderboard = [
            { username: "Alice", tokens: 5000, rank: "Gold" },
            { username: "Bob", tokens: 2500, rank: "Silver" },
            { username: "Charlie", tokens: 1000, rank: "Bronze" },
            // Add more users as needed
        ];

        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';

        leaderboard.forEach(user => {
            const li = document.createElement('li');
            const rankIcon = ranks.find(rank => rank.name === user.rank).icon;
            li.innerHTML = `<img src="${rankIcon}" alt="${user.rank} Icon"> <span>${user.username} - ${user.rank} - ${user.tokens} Tokens</span>`;
            leaderboardList.appendChild(li);
        });

        document.getElementById('leaderboard-section').classList.remove('hidden');
    }
});
