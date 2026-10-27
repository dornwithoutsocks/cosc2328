// IC17 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

//debug: confirm CDN Scripts loaded before any JSX runs
console.log('React Version: ', React.version);
console.log('ReactDOM available:', typeof ReactDom !== 'undefined');

// - - - Component
const TamagotchiPet = () => {

    // state - hunger: 0 (full) to 100 (starving); energy 0 tired 100 rested
    const [hunger, setHunger] = React.useState(50);
    const [energy, setEnergy] = React.useState(50);

    // event handlers
    const feedPet = () => {
        setHunger(Math.max(0, hunger - 15));
    };

    const playWithPet = () => {
        setEnergy(Math.max(0, energy - 10));
        setHunger(Math.min(100, hunger + 5));
    };

    const restPet = () => {
        setEnergy(Math.min(100, energy + 20));
        setHunger(Math.min(100, hunger + 8));
    };

    // conditional rendering helper
    const getPetMood = () => {
        if (hunger > 75) return '😭 Starving!';
        if (hunger < 25) return '😴 Exhausted!';
        if (hunger < 30 && energy > 70) return '☺️ Thriving!';
        return '🫤 Mediocre';
    };

    // - - - JSX

    return (
        <div className ="pet-card">
            <h1> 🐾 Pixel</h1>

            <div className ="stats">
                <p className ="stat">🍖 Hunger: {hunger}</p>
                <p className="stat">⚡️ Energy: {energy}</p>
            </div>

            <div className="mood">{getPetMood()}</div>

            <div className="controls">
                <button onClick={feedPet}> 🍖 Feed</button>
                <button onClick={playWithPet}> ⚽️ Play</button>
                <button onClick={restPet}> 😴 Rest</button>
            </div>


        </div>
    );


};

// - - - Mount

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TamagotchiPet/>);