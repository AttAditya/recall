import { useRef } from 'react';
import './TimelineAdd.css';

export function TimelineAdd({ updateData }) {
    let yearRef = useRef();
    let monthRef = useRef();
    let dateRef = useRef();
    let hoursRef = useRef();
    let minutesRef = useRef();

    function validateData(data) {
        if (Object.keys(data).length === 0) {
            alert("Please enter at least one field");
            return false;
        }

        let validateRange = (v, ll, ul) => (v && (v < ll || v > ul));

        let yearLowerLimit = 1000;
        let yearUpperLimit = Number(new Date().getFullYear()) + 200;

        if (data.year && validateRange(data.year, yearLowerLimit, yearUpperLimit)) {
            alert("Invalid year");
            return false;
        }

        let isLeap = (year) => {
            return (
                (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
            );
        };

        let monthsDays = {
            "jan": 31,
            "feb": data.year ? (isLeap(data.year) ? 29 : 28) : 29,
            "mar": 31,
            "apr": 30,
            "may": 31,
            "jun": 30,
            "jul": 31,
            "aug": 31,
            "sep": 30,
            "oct": 31,
            "nov": 30,
            "dec": 31
        }

        if (data.month && !(data.month in monthsDays)) {
            alert("Invalid month");
            return false;
        }

        if (data.date && validateRange(data.date, 1, monthsDays[data.month])) {
            alert("Invalid date");
            return false;
        }
        
        if (data.hours != null && (data.hours < 0 || data.hours > 23)) {
            alert("Invalid hours");
            return false;
        }

        if (data.minutes != null && (data.minutes < 0 || data.minutes > 59)) {
            alert("Invalid minutes");
            return false;
        }

        if (data.minutes != null && data.hours == null) {
            alert("Please enter hours");
            return false;
        }

        if (data.hours != null && data.minutes == null) {
            alert("Please enter minutes");
            return false;
        }

        if (data.date && !data.month) {
            alert("Please enter month");
            return false;
        }

        return true;
    }

    function addTimelineItem(event) {
        let year = yearRef.current.value;
        let month = monthRef.current.value;
        let date = dateRef.current.value;
        let hours = hoursRef.current.value;
        let minutes = minutesRef.current.value;

        let data = {};

        (() => ((year !== "") ? (data.year = Number(year)) : null))();
        (() => ((month !== "") ? (data.month = month) : null))();
        (() => ((date !== "") ? (data.date = Number(date)) : null))();
        (() => ((hours !== "") ? (data.hours = Number(hours)) : null))();
        (() => ((minutes !== "") ? (data.minutes = Number(minutes)) : null))();

        if (!validateData(data)) {
            return;
        }

        updateData(data);
    }

    return (
        <div className="timeline-add">
            <div className="timeline-add-calendar">
                <div className="timeline-add-year timeline-add-field">
                    <input
                        type="number"
                        className="timeline-add-year-input"
                        placeholder="Year"
                        min={1000}
                        max={Number(new Date().getFullYear()) + 200}
                        ref={yearRef}
                    />
                </div>

                <div className="timeline-add-month timeline-add-field">
                    <select className="timeline-add-month-select" ref={monthRef}>
                        <option value="" selected={true}>Month</option>
                        <option value="jan">January</option>
                        <option value="feb">February</option>
                        <option value="mar">March</option>
                        <option value="apr">April</option>
                        <option value="may">May</option>
                        <option value="jun">June</option>
                        <option value="jul">July</option>
                        <option value="aug">August</option>
                        <option value="sep">September</option>
                        <option value="oct">October</option>
                        <option value="nov">November</option>
                        <option value="dec">December</option>
                    </select>
                </div>
                
                <div className="timeline-add-date timeline-add-field">
                    <input
                        type="number"
                        className="timeline-add-date-input"
                        placeholder="Date"
                        min={1}
                        max={31}
                        ref={dateRef}
                    />
                </div>
            </div>
            
            <div className="timeline-add-time">
                <div className="timeline-add-hours timeline-add-field">
                    <input
                        type="number"
                        className="timeline-add-hours-input"
                        placeholder="Hours (24-hour)"
                        min={0}
                        max={23}
                        ref={hoursRef}
                    />
                </div>
                
                <div className="timeline-add-minutes timeline-add-field">
                    <input
                        type="number"
                        className="timeline-add-minutes-input"
                        placeholder="Minutes"
                        min={0}
                        max={59}
                        ref={minutesRef}
                    />
                </div>
            </div>

            <div className="timeline-add-actions">
                <button className="timeline-add-action" onClick={addTimelineItem}>
                    <span className="timeline-add-action-icon">
                        <i className="fa-solid fa-plus" />
                    </span>

                    <span className="timeline-add-action-text">
                        Add
                    </span>
                </button>
            </div>
        </div>
    );
}