import React from 'react';
import TaskItem from './TaskItem';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../bll/store';
import ListItem from '@mui/material/ListItem';
import { FilterValuesType } from './FilterPanel';

const TaskList: React.FC<TaskListPropsType> = React.memo( ({todoListId, todoListCurrentFilter}) => {
    // console.log('TaskList rendered');
    let tasks = useSelector((state: AppStateType) => state.taskLists[todoListId])

    if (todoListCurrentFilter === 'active') {
        tasks = tasks.filter(el => el.isDone === false);
    }
    if (todoListCurrentFilter === 'completed') {
        tasks = tasks.filter(el => el.isDone === true);
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