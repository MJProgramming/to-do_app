import Project from "./project";
import ToDo from "./todo";

export default class ToDoProjects {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('Upcoming'));
    }

    getProjectByName(name) {
        return this.projects.find(project => project.getName().toLowerCase() === name.toLowerCase());
    }

    getAllProjects() {
        return this.projects;
    }

    createNewProject(name) {
        if (this.projects.find(project => project.getName() === name)) return;
        this.projects.push(new Project(name));
    }
}