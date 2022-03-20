import taskListsReducer, { addNewTaskAC, changeTaskTitleAC, createNewListTasksAC, removeAllListTasksAC, removeTaskAC, toggleTaskStatusAC } from "./taskListsReducer"


let initialState = {
    '1': [
        {title: 'Complete my linkedIn profile', isDone: true, id: '1'},
        {title: 'Create CV', isDone: true, id: '2'},
        {title: 'Improve my english skills', isDone: false, id: '3'},
        {title: 'Improve my soft skills', isDone: false, id: '4'},
        {title: 'Find first job as frontend developer', isDone: false, id: '5'}
    ],
    '2': [
        {title: 'Help someone learn to code', isDone: false, id: '1'},
        {title: 'Create portfolio page', isDone: false, id: '2'},
        {title: 'Create an app (prepare for the Estonian citizenship exams)', isDone: false, id: '3'},
        {title: 'Create an app (todo lists, plans for couples)', isDone: false, id: '4'}
    ]
}


test('task status should be toggled', () => {
    let newState = taskListsReducer(initialState, toggleTaskStatusAC('1', '1') );

    expect(newState[1][0].isDone).toBe(false);
})
test('only selected task status should be toggled', () => {
    let newState = taskListsReducer(initialState, toggleTaskStatusAC('1', '1') );

    expect(newState[1][1].isDone).toBe(true);
    expect(newState[2][0].isDone).toBe(false);
})



test('task title should be changed', () => {
    let newState = taskListsReducer(initialState, changeTaskTitleAC('1', '1', 'aaa') );

    expect(newState[1][0].title).toBe('aaa');

})
test('only selected task title should be changed', () => {
    let newState = taskListsReducer(initialState, changeTaskTitleAC('1', '1', 'aaa') );

    expect(newState[1][1].title).toBe('Create CV');
    expect(newState[2][0].title).toBe('Help someone learn to code');
})



test('task should be added (task list length incremented)', () => {
    let newState = taskListsReducer(initialState, addNewTaskAC('1', '6', 'kuku') );

    expect(newState[1].length).toBe(6);
})
test('task should be added only to selected list by id', () => {
    let newState = taskListsReducer(initialState, addNewTaskAC('1', '6', 'kuku') );

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




test('task list should be cleared', () => {
    let newState = taskListsReducer(initialState, removeAllListTasksAC('1') );

    expect(newState[1].length).toBe(0);
})
test('only selected task list should be cleared', () => {
    let newState = taskListsReducer(initialState, removeAllListTasksAC('1') );

    expect(newState[2].length).toBe(4);
})




test('new task list should be added (should be empty)', () => {
    let newState = taskListsReducer(initialState, createNewListTasksAC('3') );

    expect(Object.keys(newState).length).toBe(3);
    expect(newState['3']).toEqual([]);
})
