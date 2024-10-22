import "./Project.css";
import { TaskList } from "../../components/tasklists";
import { useAppMemory } from "../../hooks";
import { useState } from "react";

export function Project({ projectData }) {
    let { getFromMemory, saveToMemory } = useAppMemory();
    let [componentReloader, setComponentReloader] = useState(false);

    function updateProjectData(data) {
        let saveLocally = getFromMemory("saveLocally");
        
        projectData = {...data};
        saveLocally(projectData);

        setComponentReloader(!componentReloader);
    }

    function getProjectData() {
        return projectData;
    }

    saveToMemory("saveProjectData", updateProjectData);
    saveToMemory("getProjectData", getProjectData);

    return (
        <div className="project">
            <div className="project-details">
                <div className="project-header">
                    <span className="project-icon">
                        <i className={`${projectData.iconClass}`}></i>
                    </span>

                    <h1 className="project-title">
                        {projectData.title}
                    </h1>
                </div>

                <p className="project-description">
                    {projectData.description}
                </p>
            </div>

            <ul className="lists-container">
                {
                    Object.values(projectData.lists).map((list) => {
                        return (
                            <li className="task-list-container" key={list.id}>
                                <TaskList listData={list} />
                            </li>
                        );
                    })
                }

                {/* <li className="add-task-list">
                    <button className="add-task-list-button">
                        <span className="add-task-list-icon">
                            <i className="fa-solid fa-plus"></i>
                        </span>

                        <span className="add-task-list-text">
                            Add Task List
                        </span>
                    </button>
                </li> */}
            </ul>
        </div>
    );
}