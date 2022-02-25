// Helper Fn
const rID = (): string => (Math.random()+1).toString(36).substring(7);

// Drag and Drop
interface Draggable {
    handleDragStart(event: DragEvent): void;
    handleDragEnd(event: DragEvent): void;
}

interface DragTarget {
    handleDragOver(event: DragEvent): void;
    handleDragLeave(event: DragEvent): void;
    handleDrop(event: DragEvent): void;
}

interface ClearChilds {
    clearChild(el: HTMLElement): void;
}

// Enums
enum ProjectStatus {
    ACTIVE,
    FINISHED
}

// Models
class ProjectModel {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

// Observer state
type Listener<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// Project state
class ProjectState extends State<ProjectModel> {
    private projects: ProjectModel[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if ( !this.instance ) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(title: string, description: string, nomOfPeople: number) {
        const project: ProjectModel = new ProjectModel(
            rID(),
            title,
            description,
            nomOfPeople,
            ProjectStatus.ACTIVE
        );

        this.projects.push(project);
        this.updateListeners();
    }

    private updateListeners() {
        this.listeners.map(listFn => listFn(this.projects.slice()))
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const searchProject = this.projects.find(prj => prj.id === projectId);
        if ( !searchProject || searchProject.status === newStatus ) { return }

        searchProject.status = newStatus;
        this.updateListeners();
    }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
    value: string | number,
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    const updateValid = (status: boolean) => (isValid = isValid && status);
    
    if ( validatableInput.required ) {
        updateValid(!!validatableInput.value.toString().trim())
    }

    if ( typeof validatableInput.value === 'string' && validatableInput.minLength != null ) {
        updateValid(validatableInput.value.length >= validatableInput.minLength)
    }

    if ( typeof validatableInput.value === 'string' && validatableInput.maxLength != null ) {
        updateValid(validatableInput.value.length <= validatableInput.maxLength)
    }

    if ( typeof validatableInput.value === 'number' && validatableInput.min != null ) {
        updateValid(validatableInput.value >= validatableInput.min)
    }

    if ( typeof validatableInput.value === 'number' && validatableInput.max != null ) {
        updateValid(validatableInput.value <= validatableInput.max)
    }

    return isValid;
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = original.bind(this);
            return boundFn;
        }
    }

    return adjDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    newElement: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtBeggining: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        
        const templateClone = document.importNode(
            this.templateElement.content,
            true
        )

        this.newElement = templateClone.firstElementChild as U;
        if ( newElementId ) { this.newElement.id = newElementId }

        this.attach(insertAtBeggining);
    }

    private attach(insertAtBeggining: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeggining ? 'afterbegin' : 'beforeend',
            this.newElement
        )
    }

    abstract configure(): void;
    abstract render(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: ProjectModel;

    get persons() {
        return this.project.people > 1
            ? `${this.project.people} persons`
            : '1 person';
    }

    constructor(hostId: string, project: ProjectModel) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.render();
    }

    @Autobind
    handleDragStart(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    handleDragEnd(_: DragEvent): void {
        console.log('drag end event');
    }

    configure(): void {
        this.newElement.addEventListener('dragstart', this.handleDragStart);
        this.newElement.addEventListener('dragend', this.handleDragEnd);
    }

    render(): void {
        this.newElement.querySelector('h2')!.textContent = this.project.title;
        this.newElement.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.newElement.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget, ClearChilds {
    assignedProjects: ProjectModel[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.render();
    }

    @Autobind
    handleDragOver(event: DragEvent): void {
        if ( event.dataTransfer?.types?.[0] !== 'text/plain' ) { return; }

        event.preventDefault();
        const listEl = this.newElement.querySelector('ul')!;
        listEl.classList.add('droppable')
    }

    @Autobind
    handleDragLeave(_: DragEvent): void {
        const listEl = this.newElement.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @Autobind
    handleDrop(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projectId,
            this.type === 'active'
                ? ProjectStatus.ACTIVE
                : ProjectStatus.FINISHED
        );
    }

    configure(): void {
        this.newElement.addEventListener('dragover', this.handleDragOver);
        this.newElement.addEventListener('dragleave', this.handleDragLeave);
        this.newElement.addEventListener('drop', this.handleDrop);

        projectState.addListener((projects: ProjectModel[]) => {
            const filteredProjects = projects.filter(prj => {
                const passValue: ProjectStatus = this.type === 'active' 
                    ? ProjectStatus.ACTIVE 
                    : ProjectStatus.FINISHED;
                
                return prj.status === passValue;
            });

            this.assignedProjects = filteredProjects;
            this.renderProjects();
        })
    }

    clearChild(el: HTMLElement): void {
        while ( el.lastChild ) {
            el.removeChild(el.lastChild)
        }
    }

    render(): void {
        const listId = `${this.type}-projects-list`;
        this.newElement.querySelector('ul')!.id = listId;
        this.newElement.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    renderProjects(): void {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        this.clearChild(listEl);
        this.assignedProjects.map(prjItem => new ProjectItem(listEl.id, prjItem));
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    inputTitle: HTMLInputElement;
    inputDescription: HTMLInputElement;
    inputPeople: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.inputTitle = this.newElement.querySelector('#title')! as HTMLInputElement;
        this.inputDescription = this.newElement.querySelector('#description')! as HTMLInputElement;
        this.inputPeople = this.newElement.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    render(): void { }

    configure(): void {
        this.newElement.addEventListener('submit', this.handleSubmit);
    }

    private getUserInput(): [string, string, number] | void {
        const [valueTitle, valueDescription, valuePeople] = [
            this.inputTitle.value,
            this.inputDescription.value,
            this.inputPeople.value,
        ];

        const validators: any = {
            validatorTitle: {
                value: valueTitle,
                required: true
            },

            validatorDescription: {
                value: valueDescription,
                required: true,
                minLength: 5
            },

            validatorPeople: {
                value: Number(valuePeople),
                required: true,
                min: 1,
                max: 5
            }
        }

        if ( 
            Object.keys(validators)
                .some((key: string) => 
                    !validate((validators[key] as Validatable))
                ) 
        ) {
            alert('invalid inputs found');
            return;
        } else {
            return [
                valueTitle,
                valueDescription,
                Number(valuePeople)
            ]
        }
    }

    @Autobind
    handleSubmit(event: Event): void {
        event.preventDefault();

        const userInput = this.getUserInput();
        if ( !Array.isArray(userInput) ) { return; }

        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
    }

    clearInputs(): void {
        [
            this.inputTitle,
            this.inputDescription,
            this.inputPeople,
        ]
        .map(e => e.value = '');
    }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');