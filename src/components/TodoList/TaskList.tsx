import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../bll/store';
import ListItem from '@mui/material/ListItem';
import { FilterValuesType } from './FilterPanel';
import { TaskStatuses } from '../../api/taskListsAPI';
import { requestTasksTC } from '../../bll/taskListsReducer';

const TaskList: React.FC<TaskListPropsType> = React.memo( ({todoListId, todoListCurrentFilter}) => {
    // console.log('TaskList rendered');
    let tasks = useSelector((state: AppRootStateType) => state.taskLists[todoListId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( requestTasksTC(todoListId) )
    }, [])

    if (todoListCurrentFilter === 'active') {
        tasks = tasks.filter(el => el.status === TaskStatuses.New);
    }
    if (todoListCurrentFilter === 'completed') {
        tasks = tasks.filter(el => el.status === TaskStatuses.Completed);
    }

    const mappedTaskItems = tasks.map((el, i) => (
        <TaskItem 
            key={el.id}
            todoListId={todoListId}
            task={el}
            withDivider={i !== (tasks.length - 1)} />
    ));

    return (
        <List sx={{width: '100%'}}>
            {mappedTaskItems}

            {(tasks.length === 0) && <ListItem sx={{justifyContent: 'center', fontSize: '18px'}} >List is empty</ListItem>}
        </List>
    )
})

export default TaskList;


type TaskListPropsType = {
    todoListId: string
    todoListCurrentFilter: FilterValuesType
}