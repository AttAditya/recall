import "./TaskCard.css";

import { Timeline } from "../timeline";
import { useAppMemory } from "../../hooks";
import { EditCardPanel, TaskCardPanel } from "../../pages";

export function TaskCard({ cardData }) {
    let { getFromMemory } = useAppMemory();

    function openCard(event) {
        let showPopup = getFromMemory("showPopup");
        let addPopupAction = getFromMemory("addPopupAction");
        let hidePopup = getFromMemory("hidePopup");

        showPopup((
            <TaskCardPanel cardData={cardData} />
        ));

        addPopupAction((
            <i className="fa-solid fa-pencil"></i>
        ), () => {
            hidePopup(() => showPopup((
                <EditCardPanel cardData={cardData} />
            )));
        });
    }

    return (
        <div className="task-card" id={cardData.id} onClick={openCard}>
            <h3 className="task-card-title">
                {cardData.title ? cardData.title : null}
            </h3>

            <div className="task-card-timeline">
                {cardData.timeline ? <Timeline timelineData={cardData.timeline} /> : null}
            </div>

            <div className="task-card-content">
                {cardData.content ? cardData.content : null}
            </div>

            <div className="task-card-tags">
                {
                    cardData.tags?.map((tag, index) => {
                        return (
                            <span className="task-card-tag" key={index}>
                                {tag}
                            </span>
                        );
                    })
                }
            </div>
        </div>
    );
}