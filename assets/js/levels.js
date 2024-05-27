// import { readdirSync } from "fs";

export let levelsData = [];

export async function loadLevelsData() {
    try {
        const levelFiles = ['level1.json', 'level2.json', 'level3.json'];
        // const levelFiles = readdirSync('/asset/json/')

        for (const file of levelFiles) {
            const response = await fetch(`/json/${file}`);
            if (!response.ok) {
                throw new Error(`Erreur lors du load de ${file}`);
            }
            const jsonData = await response.json();
            levelsData.push(jsonData);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors du load des levels.');
    }
}
