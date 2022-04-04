function Task(props) {
    return (
        <div className="task-container">
            <h3 className="task-header">{props.task.name}</h3>
            <div className="task-info">
            <p>{props.task.description}</p>
            <button onClick={() => {
            props.onClickAction(props.task)}}>Remove</button>
            </div>
        </div>
    )
}

export default Task;