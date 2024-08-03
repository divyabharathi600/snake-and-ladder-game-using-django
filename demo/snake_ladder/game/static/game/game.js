document.addEventListener('DOMContentLoaded', (event) => {
    const player = document.getElementById('player');
    const diceImage = document.getElementById('dice-image');
    const rollButton = document.getElementById('roll-button');
    let playerPosition = 1;

    const snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78};
    const ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100};

    rollButton.addEventListener('click', () => {
        let roll = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `/static/game/images/dice-${roll}.png`;

        playerPosition += roll;

        if (playerPosition > 100) {
            playerPosition = 100;
        }

        if (snakes[playerPosition]) {
            playerPosition = snakes[playerPosition];
        } else if (ladders[playerPosition]) {
            playerPosition = ladders[playerPosition];
        }

        movePlayer(playerPosition);
        
        if (playerPosition === 100) {
            alert("Player wins!");
        }
    });

    function movePlayer(position) {
        let x = ((position - 1) % 10) * 60;
        let y = 540 - (Math.floor((position - 1) / 10) * 60);
        player.style.left = `${x}px`;
        player.style.top = `${y}px`;
    }

    // Initialize player position at number 1
    movePlayer(playerPosition);
});
