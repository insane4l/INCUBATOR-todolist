import todoListsReducer, { addNewTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC } from "./todoListsReducer"

let initialState = [
    {id: '1', title: "Must Learn", currentFilter: 'all', isCollapsed: true},
    {id: '2', title: "Job Search", currentFilter: 'all', isCollapsed: true},
    {id: '3', title: "Some Goals", currentFilter: 'all', isCollapsed: true},
]


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
    let newState = todoListsReducer(initialState, addNewTodolistAC('4', 'new list name') );

    expect(newState.length).toBe(4);
    expect(newState[3].title).toBe('new list name');
    expect(newState[3].currentFilter).toBe('all');
    expect(newState[3].isCollapsed).toBe(false);
})




test('todo list should be deleted correctly', () => {
    let newState = todoListsReducer(initialState, deleteTodolistAC('1') );

    expect(newState.length).toBe(2);
    expect(newState.find(el => el.id === '1')).toBe(undefined);
})





