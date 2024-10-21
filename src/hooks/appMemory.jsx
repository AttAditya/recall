let memory = {};

export function useAppMemory() {
    function saveToMemory(key, value) {
        memory[key] = value;
    }

    function getFromMemory(key) {
        return memory[key];
    }

    function removeFromMemory(key) {
        delete memory[key];
    }

    return {
        saveToMemory,
        getFromMemory,
        removeFromMemory
    };
}

