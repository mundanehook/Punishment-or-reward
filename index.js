document.addEventListener('DOMContentLoaded', () => {
    const playerInputs = document.getElementById('playerInputs');
    const addPlayerButton = document.getElementById('addPlayerButton');
    const playersForm = document.getElementById('playersForm');

    // Add new player input field
    addPlayerButton.addEventListener('click', () => {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.name = 'player';
        newInput.placeholder = 'Nombre';
        newInput.required = true;
        playerInputs.appendChild(newInput);
    });

    // Handle form submission
    playersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const playerNames = Array.from(document.getElementsByName('player')).map(input => input.value);

        // Store player names in localStorage or pass to the next page
        localStorage.setItem('playerNames', JSON.stringify(playerNames));

        // Redirect to the game page
        window.location.href = 'game.html';
    });
});
