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

    function newTaskList() {
        let saveProjectData = getFromMemory("saveProjectData");
        let getProjectData = getFromMemory("getProjectData");

        let generateUUID = function() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        let projectData = getProjectData();
        let listId = generateUUID();

        projectData.lists[listId] = {
            id: listId,
            iconClass: "fa-solid fa-clipboard-list",
            title: "New List",
            tasks: {},
            order: Object.keys(projectData.lists).length
        };

        saveProjectData({...projectData});
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
                                <TaskList listData={{
                                    ...list,
                                    projectId: projectData.id
                                }} />
                            </li>
                        );
                    })
                }

                <li className="task-list-container">
                    <div className="lists-actions">
                        <button className="lists-action" onClick={newTaskList}>
                            <span className="lists-action-icon">
                                <i className="fa-solid fa-star-of-life"></i>
                            </span>

                            <span className="lists-action-text">
                                New List
                            </span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}