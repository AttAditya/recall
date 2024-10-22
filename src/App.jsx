import './variables.css';
import './App.css';

import { Project } from './pages';
import { projectTemplates } from './data';

import { Popup } from './components';
import { useAppMemory } from './hooks';
import { useEffect } from 'react';

function App() {
    let { getFromMemory, saveToMemory } = useAppMemory();
    let projectData = projectTemplates["TODO"];

    if (!localStorage.getItem("temp-memory")) {
        localStorage.setItem("temp-memory", JSON.stringify(projectData));
    }

    projectData = JSON.parse(localStorage.getItem("temp-memory"));

    function saveLocally(data) {
        localStorage.setItem("temp-memory", JSON.stringify(data));
    }

    saveToMemory("saveLocally", saveLocally);

    useEffect(() => {
        let escapeListener = document.addEventListener('keydown', (event) => {
            if (event.key === "Escape" && getFromMemory("popupState") === "active") {
                let hidePopup = getFromMemory("hidePopup");
                hidePopup();
            }
        });

        return () => {
            document.removeEventListener('keydown', escapeListener);
        };
    }, [getFromMemory]);

    return (
        <div className="app">
            <div className="main">
                <Project projectData={projectData} />
            </div>

            <Popup />
        </div>
    );
}

export default App;

