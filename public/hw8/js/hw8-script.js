// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

// Components

const TaskCard = (props) => {
    return (
        <div className={"task-card " + props.task.priority.toLowerCase()}>
            <div className="task-info">
                <span className="task-name">{props.task.name}</span>
                <span className={"badge " + props.task.priority.toLowerCase()}>
                    {props.task.priority}
                </span>
            </div>
            <button 
                className="delete-btn" 
                onClick={() => props.onDelete(props.task.id)}
            >
                ✕
            </button>
        </div>
    );
};

const TaskList = (props) => {
    if (props.tasks.length === 0) {
        return <p className="empty-state">No tasks yet — add one above!</p>;
    }

    return (
        <div className="task-list">
            {props.tasks.map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={props.onDelete} 
                />
            ))}
        </div>
    );
};

const App = () => {
    const [tasks, setTasks] = React.useState([]);
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (!taskName.trim()) {
            setError('Task name cannot be empty.');
            return;
        }
        
        setError('');

        const newTask = {
            id: Date.now(),
            name: taskName.trim(),
            priority: priority
        };

        setTasks([...tasks, newTask]);
        setTaskName('');
        setPriority('Medium');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const clearAll = () => {
        setTasks([]);
    };

    const taskCountText = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;

    return (
        <div className="app-card">
            <h1>Quick Tasks</h1>
            <p className="task-count">{taskCountText}</p>

            <form onSubmit={handleAddTask} className="form-area">
                {error && <p className="error-message">{error}</p>}
                <input 
                    type="text" 
                    placeholder="Enter task name..." 
                    value={taskName} 
                    onChange={e => setTaskName(e.target.value)} 
                />
                <select 
                    value={priority} 
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit">Add Task</button>
            </form>

            <TaskList tasks={tasks} onDelete={deleteTask} />

            {tasks.length > 0 && (
                <div className="clear-all-container">
                    <button className="clear-all-btn" onClick={clearAll}>
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Mount

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);