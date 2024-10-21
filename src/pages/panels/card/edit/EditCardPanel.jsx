import "./EditCardPanel.css";

import { Timeline } from '../../../../components';

export function EditCardPanel({ cardData }) {
    let changes = {};

    function titleHeightChange(event) {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    function handleTitleChange(event) {
        changes.title = event.target.value;
    }

    function handleContentChange(event) {
        changes.content = event.target.value;
    }

    function handleTimelineChange(data) {
        changes.timeline = data;
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
                    {
                        cardData.timeline?.length ? (
                            <Timeline
                                size="large"
                                timelineData={cardData.timeline}
                                isEditable={true}
                                updateData={handleTimelineChange}
                            />
                        ) : (
                            <p className="edit-card-panel-data-empty">
                                No timeline data available
                            </p>
                        )
                    }
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