import "./TaskList.css";

import { TaskCard } from "./TaskCard";

export function TaskList({ listData }) {
    function addTask() {}

    return (
        <div className="task-list" id={listData.id}>
            <div className="task-list-details">
                <span className="task-list-icon">
                    <i className={`${listData.iconClass}`}></i>
                </span>

                <h2 className="task-list-title">
                    {listData.title}
                </h2>
            </div>

            <ul className="task-card-list">
                <li className="add-task-card">
                    <button className="add-task-button" onClick={addTask}>
                        <span className="add-task-icon">
                            <i className="fa-solid fa-plus"></i>
                        </span>

                        <span className="add-task-text">
                            Add Task
                        </span>
                    </button>
                </li>

                {
                    listData.tasks.map((task) => {
                        return (
                            <li className="task-card-container" key={task.id}>
                                <TaskCard cardData={task} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}