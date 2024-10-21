import "./TaskCardPanel.css";

import { Timeline } from '../../../../components';

export function TaskCardPanel({ cardData }) {
    return (
        <div className="task-card-panel" id={cardData.id}>
            <h3 className="task-card-panel-title">
                {cardData.title ? cardData.title : null}
            </h3>

            <div className="task-card-panel-container">
                <h4 className="task-card-panel-container-title">
                    Timeline
                </h4>

                <div className="task-card-panel-timeline">
                    {cardData.timeline?.length ? <Timeline size="large" timelineData={cardData.timeline} /> : (
                        <p className="task-card-panel-data-empty">
                            No timeline data available
                        </p>
                    )}
                </div>
            </div>

            <div className="task-card-panel-container">
                <h4 className="task-card-panel-container-title">
                    Description
                </h4>

                <div className="task-card-panel-content">
                    {cardData.content ? cardData.content : (
                        <p className="task-card-panel-data-empty">
                            No description available
                        </p>
                    )}
                </div>
            </div>

            <div className="task-card-panel-container">
                <h4 className="task-card-panel-container-title">
                    Tags
                </h4>

                <div className="task-card-panel-tags">
                    {
                        cardData.tags?.length ? (cardData.tags?.map((tag, index) => {
                            return (
                                <span className="task-card-panel-tag" key={index}>
                                    {tag}
                                </span>
                            );
                        })) : (
                            <p className="task-card-panel-data-empty">
                                No tags available
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}