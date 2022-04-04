import {useEffect, useState} from "react";
import Task from "./Task";

function ToDoList() {
    const [tasks, setTasks] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
            setTasks(data);
        },
        []);

    const data = [
        {
            name: "Nákup",
            description: "Nakoupit potřebné jídlo na dovolenou."
        },
        {
            name: "Semestrální práce",
            description: "Začít pracovat na semestrální práci z předmětu NNPIA."
        },
        {
            name: "Cvičení",
            description: "Jít na cvičení do nového studia."
        },
        {
            name: "Velice dlouhý úkol",
            description: "Toto je velice dlouhý úkol. Tento úkol je příkladem pro dlouhý popis úkolu. Nenese žádný jiný význam, " +
                "pouze představuje příklad velice dlouhého popisu úkolu, který je na více řádků. Aby tu bylo ještě více řádků, " +
                "přidám více textu. "
        }
    ];

    const addHandler = event => {
        event.preventDefault();
        const newTasks = [...tasks];
        newTasks.push({name: name, description: description});
        setTasks(newTasks);
        setName("");
        setDescription("");
    }

    const removeHandler = (task) => {
        const newTasks = tasks.filter(item => item !== task);
        setTasks(newTasks);
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={addHandler}>
                <div className="row">
                    <div className="col-25">
                        <label>Task Name</label>
                    </div>
                    <div className="col-75">
                        <input name="todoName" type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Description</label>
                    </div>
                    <div className="col-75">
                        <textarea name="description" value={description} type="text"
                                  onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="row">
                    <input value="Add Task" type="submit"/>
                </div>
            </form>
            <div className="tasks">
                {tasks.map(task => <Task task={task} onClickAction={removeHandler}/>)}
            </div>
        </div>
    )
}

export default ToDoList;