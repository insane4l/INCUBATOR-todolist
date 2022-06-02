import todoListsReducer, { addNewTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, collapseAllTodoListsAC, deleteTodolistAC, setTodolistsAC, TodoListsStateType, toggleTodolistCollapseAC, uncollapseAllTodoListsAC } from "./todoListsReducer"

let initialState = [
    {id: '1', title: "Must Learn", order: 1, addedDate: '', currentFilter: 'all', isCollapsed: true},
    {id: '2', title: "Job Search", order: 2, addedDate: '', currentFilter: 'all', isCollapsed: true},
    {id: '3', title: "Some Goals", order: 3, addedDate: '', currentFilter: 'all', isCollapsed: true},
] as TodoListsStateType


test('todolists should be set to the state', () => {
    const action = setTodolistsAC([
        {id: '1', title: "Must Learn", order: 1, addedDate: ''},
        {id: '2', title: "Job Search", order: 2, addedDate: ''},
    ])

    let newState = todoListsReducer([], action);

    expect(newState.length).toBe(2)
})


test('selected list title should be changed', () => {
    let newState = todoListsReducer(initialState, changeTodolistTitleAC('1', 'test') );

    expect(newState[0].title).toBe('test');
})
test('the number of lists should remain the same', () => {
    let newState = todoListsReducer(initialState, changeTodolistTitleAC('1', 'test') );

    expect(newState.length).toBe(3);
})




test('the current filter of selected list should be changed', () => {
    let newState = todoListsReducer(initialState, changeTodolistFilterAC('1', 'active') );

    expect(newState[0].currentFilter).toBe('active');
})
test('only the selected list filter should be changed', () => {
    let newState = todoListsReducer(initialState, changeTodolistFilterAC('1', 'active') );

    expect(newState[1].currentFilter).toBe('all');
})




test('todo list should be added correctly', () => {
    let newTodoList = {id: '3', title: 'new list name', order: 3, addedDate: ''};

    let newState = todoListsReducer(initialState, addNewTodolistAC(newTodoList) );

    expect(newState.length).toBe(4);
    expect(newState[0].title).toBe(newTodoList.title);
    expect(newState[0].currentFilter).toBe('all');
    expect(newState[0].isCollapsed).toBe(false);
})



test('todo list should be deleted correctly', () => {
    let newState = todoListsReducer(initialState, deleteTodolistAC('1') );

    expect(newState.length).toBe(2);
    expect(newState.find(el => el.id === '1')).toBe(undefined);
})



test('selected todo list should be uncollapsed', () => {
    let newState = todoListsReducer(initialState, toggleTodolistCollapseAC('1') );

    expect(newState[0].isCollapsed).toBe(false);
    expect(newState[1].isCollapsed).toBe(true);
})



test('all todo lists should be collapsed', () => {
    let newState = todoListsReducer(initialState, collapseAllTodoListsAC() );

    expect(newState.find(el => el.isCollapsed === false)).toBe(undefined);
})


test('all todo lists should be uncollapsed', () => {
    let newState = todoListsReducer(initialState, uncollapseAllTodoListsAC() );

    expect(newState.find(el => el.isCollapsed === true)).toBe(undefined);
})





