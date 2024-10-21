import "./EditCardPanel.css";

import { Timeline } from '../../../../components';
import { useAppMemory } from "../../../../hooks";

export function EditCardPanel({ cardData }) {
    let { getFromMemory } = useAppMemory();
    let changes = {...cardData};
    
    function saveCardChanges() {
        let saveProjectData = getFromMemory("saveProjectData");
        let getProjectData = getFromMemory("getProjectData");

        let projectData = getProjectData();
        projectData.lists[cardData.listId].tasks[cardData.id] = {
            ...changes
        };

        saveProjectData({...projectData});
    }

    function titleHeightChange(event) {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        saveCardChanges();
    }

    function handleTitleChange(event) {
        changes.title = event.target.value;
        saveCardChanges();
    }

    function handleContentChange(event) {
        changes.content = event.target.value;
        saveCardChanges();
    }

    function handleTimelineChange(data) {
        changes.timeline = data;
        saveCardChanges();
    }

    return (
        <div className="edit-card-panel" id={cardData.id}>
            <h3 className="edit-card-panel-title">
                <textarea
                    type="text"
                    className="edit-card-panel-title-text"
                    placeholder={cardData.title}
                    defaultValue={cardData.title}
                    minLength={1} maxLength={100}
                    onChange={handleTitleChange}
                    onInput={titleHeightChange}
                />
            </h3>

            <div className="edit-card-panel-container">
                <h4 className="edit-card-panel-container-title">
                    Timeline
                </h4>

                <div className="edit-card-panel-timeline">
                    <Timeline
                        size="large"
                        timelineData={cardData.timeline}
                        isEditable={true}
                        updateData={handleTimelineChange}
                    />
                </div>
            </div>

            <div className="edit-card-panel-container">
                <h4 className="edit-card-panel-container-title">
                    Description
                </h4>

                <div className="edit-card-panel-content">
                    <textarea
                        type="text"
                        className="edit-card-panel-content-text"
                        placeholder={cardData.content ?? "Description missing"}
                        defaultValue={cardData.content}
                        minLength={1}
                        maxLength={1000}
                        onChange={handleContentChange}
                    />
                </div>
            </div>

            <div className="edit-card-panel-container">
                <h4 className="edit-card-panel-container-title">
                    Tags
                </h4>

                <div className="edit-card-panel-tags">
                    {
                        cardData.tags?.length ? (cardData.tags?.map((tag, index) => {
                            return (
                                <span className="edit-card-panel-tag" key={index}>
                                    {tag}
                                </span>
                            );
                        })) : (
                            <p className="edit-card-panel-data-empty">
                                No tags available
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}