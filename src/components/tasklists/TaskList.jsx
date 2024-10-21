import "./TaskList.css";

import { TaskCard } from "./TaskCard";
import { useAppMemory } from "../../hooks";

export function TaskList({ listData }) {
    let { getFromMemory } = useAppMemory();
    
    function addTask() {
        let saveProjectData = getFromMemory("saveProjectData");
        let getProjectData = getFromMemory("getProjectData");

        let generateUUID = function() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        let projectData = getProjectData();
        let taskId = generateUUID();
        
        projectData.lists[listData.id].tasks[taskId] = {
            id: taskId,
            title: "New Task",
            content: "",
            timeline: [],
            listId: listData.id,
            priority: {
                dateAdded: Date.now(),
                value: 0
            }
        };

        saveProjectData({...projectData});
    }

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
                    Object.values(listData.tasks).map((task) => {
                        return (
                            <li className="task-card-container" key={task.id}>
                                <TaskCard cardData={{
                                    ...task,
                                    listId: listData.id
                                }} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}