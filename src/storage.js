import ToDoProjects from './todo_projects';

export default class ManageStorage {
    static storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&

                (e.code === 22 || 
                    
                    e.code === 1024 || 
                    
                    e.name === 'QuotaExceededError' || 
                    
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && 

                    storage &&
                    storage.length !== 0
            )
        };
    }

    static loadTodoList() {
        const todolist = new ToDoProjects();
        ManageStorage.addToStorage('todolist', todolist);
    }

    static defineLocalStorage() {
        this.storage = window['localStorage'];
    }

    static addToStorage(name, item) {
        if (ManageStorage.storageAvailable('localStorage')) {
            this.storage.setItem(name, JSON.stringify(item));
        }
    }

    static removeFromStorage(name) {
        if (ManageStorage.storageAvailable('localStorage')) {
            this.storage.removeItem(name);
        }
    }

    static getFromStorage(item) {
        return JSON.parse(this.storage.getItem(item));
    }
}