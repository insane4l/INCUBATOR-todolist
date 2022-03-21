import React from 'react';
import TaskItem from './TaskItem';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { AppStateType } from '../bll/store';
import { FilterValuesType } from './FilterPanel';

const TaskList: React.FC<TaskListPropsType> = ({todoListId, todoListCurrentFilter}) => {

    let tasks = useSelector((state: AppStateType) => state.taskLists[todoListId])

    if (todoListCurrentFilter === 'active') {
        tasks = tasks.filter(el => el.isDone === false);
    }
    if (todoListCurrentFilter === 'completed') {
        tasks = tasks.filter(el => el.isDone === true);
    }

    return (
        <List>
            {tasks.map((el, i) => (
                <TaskItem 
                    key={el.id}
                    todoListId={todoListId}
                    task={el}
                    withDivider={i !== (tasks.length - 1)} />
            ) )}
        </List>
    )
}

export default TaskList;


type TaskListPropsType = {
    todoListId: string
    todoListCurrentFilter: FilterValuesType
}