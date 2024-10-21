import './variables.css';
import './App.css';

import { Project } from './pages';
import { projectData } from './data';

import { Popup } from './components';
import { useAppMemory } from './hooks';
import { useEffect } from 'react';

function App() {
    let { getFromMemory } = useAppMemory();

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

