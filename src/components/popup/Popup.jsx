import './Popup.css';

import { useRef, useState } from 'react';
import { useAppMemory } from '../../hooks';

export function Popup() {
    let [popupElement, setPopupElement] = useState(null);
    let [popupActions, setPopupActions] = useState([]);
    let [popupState, setPopupState] = useState("");

    let popupRef = useRef(null);

    let { saveToMemory } = useAppMemory();

    function hidePopup(callback) {
        setPopupState("");
        setPopupElement(null);
        saveToMemory("popupState", "");

        if (typeof(callback) !== 'function') {
            return;
        }

        setTimeout(() => {
            callback();
        }, 300);
    }

    function pushPopup() {
        setPopupState("active");
        saveToMemory("popupState", "active");
    }

    function showPopup(element) {
        setPopupActions([]);
        setPopupElement(element);

        pushPopup();
    }

    function addPopupAction(text, action) {
        setPopupActions((actions) => {
            return [...actions, { text, action }];
        });
    }

    saveToMemory("showPopup", showPopup);
    saveToMemory("hidePopup", hidePopup);
    saveToMemory("addPopupAction", addPopupAction);

    return (
        <div className={`popup ${popupState}`}>
            <div className="popup-background" onClick={hidePopup}></div>
            <div className="popup-main" ref={popupRef}>
                <div className="popup-content">
                    {popupElement}
                </div>

                <div className="popup-actions">
                    {
                        popupActions.map((action, index) => (
                            <button key={index} className="popup-action-button" onClick={action.action}>
                                {action.text}
                            </button>
                        ))
                    }

                    <button className="popup-action-button" onClick={hidePopup}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}