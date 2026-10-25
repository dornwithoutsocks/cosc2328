// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

// - - - PokemonCard Component - - -
function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <img 
                src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} 
                alt={props.name} 
            />
            <h3>{props.name}</h3>
            <p>Letters: {props.name.length}</p>
        </div>
    );
}

// - - - PokemonRoster Component - - -
function PokemonRoster(props) {
    return (
        <div className="roster-grid">
            {props.pokemon.map(function(p, index) {
                return (
                    <PokemonCard
                        key={p.name}
                        name={p.name}
                    />
                );
            })}
        </div>
    );
}

// - - - App Component - - -
function App(props) {
    return (
        <div>
            <div className="header">
                <h1>PokeRoster</h1>
                <h2>Showing {props.roster.length} short-named Pokémon, shortest name first</h2>
            </div>
            <PokemonRoster pokemon={props.roster} />
        </div>
    );
}

// - - - Async Data Fetching & Render - - -
async function loadRoster() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
            throw new Error("Failed to retrieve Pokémon list.");
        }
        const data = await response.json();
        
        const filtered = data.results.filter(function(p) {
            return p.name.length <= 6;
        });
        
        const sorted = filtered.sort(function(a, b) {
            return a.name.length - b.name.length;
        });

        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sorted} />);
    } catch (error) {
        document.querySelector("#root").innerHTML = `
            <div class="error-message">
                Oops! Something went wrong while loading the Pokémon roster. Please check your network connection and try again.
            </div>
        `;
    }
}

loadRoster();