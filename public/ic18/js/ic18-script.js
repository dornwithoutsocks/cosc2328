// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

// context

const HabitatContext = React.createContext();

// components
const Header = () => {
    // consume text - no props needed
    const { mode } = React.useContext(HabitatContext);
    return (
        <header>
            <h1> 🌎 Pixels Habitat</h1>
            <p>{mode === 'day' ? 'Day Mode' : 'Night Mode'}</p>
        </header>
    );
};

const HabitatView = () => {
    const { mode } = React.useContext(HabitatContext);
    return (
        <div className = "scene">
            {mode === 'day' ? '☀️ 🍃 🐾' : '🌛 ⭐️ 🐾'}
        </div>
    );
};

const ModeToggle = () => {
    // consumes both mode and toggleMode - no props revcieved from app
    const { mode, toggleMode } = React.useContext(HabitatContext);
    return (
        <div className="controls">
            <button onClick = {toggleMode}>
                {mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            </button>
        </div>
    );
};

const App = () => {
    const [mode, setMode] = React.useState('day');
    const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

    return (
        //provider wraps all consumers; value broadvasts mode and toggleMode
        <HabitatContext.Provider value = {{mode, toggleMode}}>
            <div className = {"habitat " + mode}>
                <Header />
                <HabitatView />
                <ModeToggle />
            </div>
        </HabitatContext.Provider>
    );
};

// --- Mount

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<App/>);