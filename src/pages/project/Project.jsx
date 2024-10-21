import "./Project.css";
import { TaskList } from "../../components/tasklists";

export function Project({ projectData }) {
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
                    projectData.lists.map((list) => {
                        return (
                            <li className="task-list-container" key={list.id}>
                                <TaskList listData={list} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}