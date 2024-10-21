import "./TimelineItem.css";

export function TimelineItem({ timelineItemData }) {
    let year = timelineItemData.year ?? null;
    let month = timelineItemData.month ?? null;
    let date = timelineItemData.date ?? null;
    let hours = timelineItemData.hours ?? null;
    let minutes = timelineItemData.minutes ?? null;
    
    let timeElement = (hours != null && minutes != null) ? (
        <span className="timeline-item-time">
            {hours}:{minutes} HRS
        </span>
    ) : null;

    let dateElement = (month != null) ? (
        <span className="timeline-item-date">
            {month}{date != null ? ` ${date}` : ""}
            {year != null ? `, ${year}` : ""}
        </span>
    ) : null;

    return (
        <div className="timeline-item">
            {dateElement}
            {dateElement && timeElement ? (
                <span className="timeline-item-separator">
                    <i className="fa-solid fa-caret-right"></i>
                </span>
            ) : ""}
            {timeElement}
        </div>
    );
}