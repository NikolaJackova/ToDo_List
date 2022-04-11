import {useEffect, useState} from "react";
import Task from "./Task";

function ToDoList() {
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_TARGET}/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Unable to get data: ' + response.statusText);
            })
            .then(json => setData(json));
    }, [data])

    const addHandler = event => {
        event.preventDefault();

        const newTask = {
            name: name,
            description: description
        }

        fetch(`${process.env.REACT_APP_TARGET}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(r => r.json())
            .finally(() => {
                setName("");
                setDescription("");
            });
    }

    const removeHandler = (task) => {
        fetch(`${process.env.REACT_APP_TARGET}/`+task.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .finally(() => {
                setName("");
                setDescription("");
            });
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
                <div className="row submit-row">
                    <input value="Add Task" type="submit"/>
                </div>
            </form>
            <div className="tasks">
                {data.map(task => <Task task={task} onClickAction={removeHandler}/>)}
            </div>
        </div>
    )
}

export default ToDoList;