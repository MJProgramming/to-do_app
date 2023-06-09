import searchIcon from './images/magnify.svg';
import inboxIcon from './images/inbox.svg';
import todayIcon from './images/tray-alert.svg';
import upcomingIcon from './images/calendar-arrow-right.svg';
import trashIcon from './images/trash-can.svg';
import plusIcon from './images/plus.svg';
import ManageStorage from './storage';

export default class ManageUI {
    static loadWebsite() {
        ManageUI.constructHeader();
        ManageUI.constructNavDiv();
        ManageUI.constructContentDiv();
        ManageUI.constructContent();
        ManageUI.openProjectOnClick();
    }

    static constructHeader() {
        const body = document.body;
        const header = document.createElement('header');
        const p = document.createElement('p');

        p.textContent = 'To Do App';
        header.appendChild(p);
        body.appendChild(header);
    }

    static createNavElement(image = null, text, classTag) {
        const button = document.createElement('button');
        const p = document.createElement('p');

        if(image) {
            let img;
            img = new Image();
            img.src = image;
            button.appendChild(img);
        }

        p.textContent = text;
        button.classList.add('nav-item', `${classTag}`);
        button.appendChild(p);
        return button;
    }

    static constructContentDiv() {
        const contentDiv = document.createElement('div');
        const body = document.body;
        contentDiv.id = 'contentDiv';
        body.appendChild(contentDiv);
    }

    static constructNavDiv() {
        const navDiv = document.createElement('div');
        const bodyElement = document.body;
        navDiv.id = 'navDiv';

        ManageStorage.getAllProjectsFromStorage().forEach((project) => {
            if (project.getName() === 'Inbox') {
                navDiv.appendChild(ManageUI.createNavElement(inboxIcon, project.getName(), `${project.getName().toLowerCase()}`));
            } else if (project.getName() === 'Today') {
                navDiv.appendChild(ManageUI.createNavElement(todayIcon, project.getName(), `${project.getName().toLowerCase()}`));
            } else if (project.getName() === 'Upcoming') {
                navDiv.appendChild(ManageUI.createNavElement(upcomingIcon, project.getName(), `${project.getName().toLowerCase()}`));
            } else {
                navDiv.appendChild(ManageUI.createNavElement(undefined, project.getName(), `${project.getName().toLowerCase()}`));
            }
        });
        
        bodyElement.appendChild(navDiv);
    }

    static newTaskButton() {
        const taskButton = document.createElement('button');
        const img = new Image();
        const p = document.createElement('p');

        taskButton.classList.add('task-btn');        
        img.src = plusIcon;
        p.textContent = 'New Task';
        
        taskButton.appendChild(img);
        taskButton.appendChild(p);

        return taskButton;
    }

    static constructContent(head = undefined, id = undefined) {
        const content = document.createElement('div');
        const heading = document.createElement('h3');
        const contentDiv = document.getElementById('contentDiv');

        content.id = id === undefined ? 'inbox' : id;
        heading.textContent = head === undefined ? 'Inbox' : head;
        content.appendChild(heading);
        content.appendChild(ManageUI.newTaskButton());
        contentDiv.appendChild(content);
    }

    static removeContent() {
        const contentDiv = document.getElementById('contentDiv');
        contentDiv.innerHTML = '';
    }

    static displayTodos(fromProject) {
        const content = document.getElementById('contentDiv');
        const todos = ManageStorage.getTodosFromProject(fromProject);
        todos.forEach(todo => {
            const p = document.createElement('p');
            p.textContent = todo.getTitle();
            content.children[0].appendChild(p);
        })
    }

    static openProjectOnClick() {
        const buttons = document.querySelectorAll('.nav-item');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const project = ManageStorage.getProjectFromStorage(e.target.classList[1]);
                ManageUI.removeContent();
                ManageUI.constructContent(project.getName(), project.getName().toLowerCase());
                ManageUI.displayTodos(e.target.classList[1]);
            });
        });
    }
}