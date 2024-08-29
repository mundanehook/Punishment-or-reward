document.addEventListener('DOMContentLoaded', () => {
    async function fetchData() {
        // Await the fetch request
        let response = await fetch('./example.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let jsonfile = await response.json();
        return jsonfile;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to shuffle the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Function to replace symbols in the sentence with names from the array
    function replaceSymbolsWithNames(sentence, names) {
        if (names.length < 2) {
            throw new Error('The names array must contain at least two names.');
        }

        // Shuffle the names array
        names = shuffleArray(names);

        // Replace symbols with names
        return sentence.replace('#', names[0]).replace('$', names[1]);
    }

    const playerNamesContainer = document.getElementById('playerNamesContainer');

    // Retrieve player names from localStorage
    const playerNames = JSON.parse(localStorage.getItem('playerNames')) || [];
    
    console.log(playerNames);

    let box = document.getElementById('box');
    box.innerHTML =  "Advertencia juego no apto para cacorros"

    fetchData().then(jsonfile => {
        // Define container and initial box
        const container = document.getElementById('container');
        let box = document.getElementById('box');

        function getRandomInt() {
            const malaSuerteItems = jsonfile['Mala suerte'];
            const numberOfItems = malaSuerteItems.length;
            return Math.floor(Math.random() * numberOfItems);
        }

        document.addEventListener('click', function(event) {
            console.log('The screen was clicked!');
            let number = getRandomInt();
            console.log(number);

            // Get the card text from the JSON
            let cardText = jsonfile['Mala suerte'][number]['card'];

            // Use the replaceSymbolsWithNames function to replace the symbols
            let updatedText = replaceSymbolsWithNames(cardText, playerNames);
            
            // Add slide-left class to trigger the animation on the old div
            box.classList.add('slide-left');

            // Create a new div to slide in
            const newBox = document.createElement('div');
            newBox.className = 'box'; // Use class instead of ID
            newBox.innerHTML = updatedText; // Use the updated text
            newBox.classList.add('slide-right');

            // Append the new div to the container
            container.appendChild(newBox);

            // Set timeout to wait for animation to finish
            setTimeout(() => {
                box.remove(); // Remove old div after the animation
                newBox.classList.remove('slide-right'); // Remove slide-right class after animation
                box = newBox; // Update the box reference to the new box
            }, 500); // Match the animation duration

            document.body.style.backgroundColor = getRandomColor();
        });
    });
});
