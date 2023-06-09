import Project from './project';
import ToDoProjects from './todo_projects';
import ToDo from './todo';

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
        window.localStorage.setItem('todolist', JSON.stringify(todolist));
    }

    static getTodoList() {
        const todolist = Object.assign(new ToDoProjects(), JSON.parse(window.localStorage.getItem('todolist')));
        return todolist;
    }

    static getProjectFromStorage(searchProject) {
        let project = ManageStorage.getAllProjectsFromStorage().find(project => project.getName().toLowerCase() === searchProject.toLowerCase());
        return project;
    }

    static getAllProjectsFromStorage() {
        let projects = [];
        ManageStorage.getTodoList().getAllProjects().forEach((project) => {
            projects.push(Object.assign(new Project(), project));
        });
        return projects;
    }

    static getTodosFromProject(fromProject) {
        let todoArr = [];
        let todos = ManageStorage.getProjectFromStorage(fromProject).getTodos();
        todos.forEach(todo => {
            todoArr.push(Object.assign(new ToDo(), todo));
        });
        return todoArr;
    }

    static saveTodolist (todolist) {
        window.localStorage.setItem('todolist', JSON.stringify(todolist));
    }
}