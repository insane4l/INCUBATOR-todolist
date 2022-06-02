import { TaskStatuses } from "../api/taskListsAPI";
import taskListsReducer, { addNewTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "./taskListsReducer"
import { addNewTodolistAC, deleteTodolistAC, setTodolistsAC } from "./todoListsReducer";


let initialState = {
    '1': [
        {title: 'Complete my linkedIn profile', id: '1', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: '1', order: 1, addedDate: ''},
        {title: 'Create CV', id: '2', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: '1', order: 2, addedDate: ''},
        {title: 'Improve my english skills', id: '3', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: '1', order: 3, addedDate: ''},
        {title: 'Improve my soft skills', id: '4', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: '1', order: 4, addedDate: ''},
        {title: 'Find first job as frontend developer', id: '5', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: '1', order: 5, addedDate: ''}
    ],
    '2': [
        {title: 'Help someone learn to code', id: '1', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId: '2', order: 1, addedDate: ''},
        {title: 'Create portfolio page', id: '2', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: '2', order: 2, addedDate: ''},
        {title: 'Create an app (prepare for the Estonian citizenship exams)', id: '3', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId:'2', order: 3, addedDate: ''},
        {title: 'Create an app (todo lists, plans for couples)', id: '4', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: '2', order: 4, addedDate: ''}
    ]
}

let newTask = {
    title: 'kuku', id: '10', description: '', status: TaskStatuses.New,
    priority: 0, startDate: '', deadline: '', todoListId: '1', order: 5, addedDate: ''
}


test('empty arrays should be added when we set todotists', () => {
    const action = setTodolistsAC([
        {id: '1', title: "Must Learn", order: 1, addedDate: ''},
        {id: '2', title: "Job Search", order: 2, addedDate: ''},
    ])

    let newState = taskListsReducer({}, action);


    let taskListsKeys = Object.keys(newState)
    expect(taskListsKeys.length).toBe(2);
    expect(newState[1]).toEqual([]);
})


test('tasks should be added correctly', () => {
    let action = setTasksAC('3', [
        {title: 'task 1', id: '1', description: '', status: TaskStatuses.New, priority: 0, startDate: '', deadline: '', todoListId:'3', order: 0, addedDate: ''},
        {title: 'task 2', id: '2', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '', todoListId: '3', order: 1, addedDate: ''}
    ]);

    let newState = taskListsReducer(initialState, action);

    const taskListsKeys = Object.keys(newState)
    expect(taskListsKeys.length).toBe(3)
    expect(newState['3'].length).toBe(2)
})


test('task status should be toggled', () => {
    let newState = taskListsReducer(initialState, updateTaskAC('1', '1', {status: TaskStatuses.New}) );

    expect(newState[1][0].status).toBe(TaskStatuses.New);
})
test('only selected task status should be toggled', () => {
    let newState = taskListsReducer(initialState, updateTaskAC('1', '1', {status: TaskStatuses.New}) );

    expect(newState[1][1].status).toBe(TaskStatuses.Completed);
    expect(newState[2][0].status).toBe(TaskStatuses.New);
})



test('task title should be changed', () => {
    let newState = taskListsReducer(initialState, updateTaskAC('1', '1', {title: 'aaa'}) );

    expect(newState[1][0].title).toBe('aaa');

})
test('only selected task title should be changed', () => {
    let newState = taskListsReducer(initialState, updateTaskAC('1', '1', {title: 'aaa'}) );

    expect(newState[1][1].title).toBe('Create CV');
    expect(newState[2][0].title).toBe('Help someone learn to code');
})



test('task should be added correctly', () => {
    const action = addNewTaskAC(newTask);

    let newState = taskListsReducer(initialState, action );

    expect(newState[1].length).toBe(6);
    expect(newState[1][0].title).toBe('kuku')
    expect(newState[1][0].id).toBe('10')
})
test('task should be added only to selected list by id', () => {
    const action = addNewTaskAC(newTask);

    let newState = taskListsReducer(initialState, action );

    expect(newState[2].length).toBe(4);
})



test('task should be removed', () => {
    let newState = taskListsReducer(initialState, removeTaskAC('2', '1') );

    expect(newState[2].length).toBe(3);
    expect(newState[2].find(el => el.id === '1')).toBe(undefined);
})
test('only selected task should be removed in selected list', () => {
    let newState = taskListsReducer(initialState, removeTaskAC('2', '1') );

    expect(newState[1].length).toBe(5);
})



test('when todo list added, new task list should be added (should be empty)', () => {
    let newTodoList = {id: '3', title: 'new list name', order: 3, addedDate: ''};
    
    let newState = taskListsReducer(initialState, addNewTodolistAC(newTodoList) );

    let listsIdKeys = Object.keys(newState);
    // let newListId = listsIdKeys.find(key => key !== '1' && key !== '2');
    // if(!newListId) {
    //     throw new Error('new list should be added with new id key')
    // }

    expect(listsIdKeys.length).toBe(3);
    expect(newState['3']).toEqual([]);
})


test('when todo list removed, tasks should be also removed', () => {
    let newState = taskListsReducer(initialState, deleteTodolistAC('1') );


    let taskListsKeys = Object.keys(newState)
    expect(taskListsKeys.length).toBe(1);
    expect(taskListsKeys[0]).toBe('2');
})
