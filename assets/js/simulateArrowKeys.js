export {
    simulateArrowUpKeyPress
}

function simulateArrowUpKeyPress() {
    // Créer et dispatcher l'événement keydown
    const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38, // Code de touche pour ArrowUp
        which: 38,   // Inclus pour la compatibilité
        bubbles: true // Assure que l'événement se propage
    });

    document.dispatchEvent(keydownEvent);

    // Créer et dispatcher l'événement keyup après une courte pause
    const keyupEvent = new KeyboardEvent('keyup', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38, // Code de touche pour ArrowUp
        which: 38,   // Inclus pour la compatibilité
        bubbles: true // Assure que l'événement se propage
    });

    // Utilisation de setTimeout pour garantir que keyup soit déclenché après keydown
    setTimeout(() => {
        document.dispatchEvent(keyupEvent);
    }, 1000 / 60); // Déclenche keyup après environ 16.67 ms (60 fps)
}
