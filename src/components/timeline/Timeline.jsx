import './Timeline.css';
import { TimelineItem } from './TimelineItem';
import { TimelineAdd } from './TimelineAdd';

export function Timeline({ timelineData, size, isEditable=false, updateData }) {
    return (timelineData?.length || isEditable) ? (
        <div className={`timeline ${size}`}>
            {
                (timelineData ?? []).map((timelineData, index) => {
                    return (
                        <TimelineItem
                            key={index}
                            timelineItemData={timelineData}
                        />
                    );
                })
            }

            {
                isEditable ? (
                    <TimelineAdd updateData={updateData} />
                ) : null
            }
        </div>
    ) : null;
}