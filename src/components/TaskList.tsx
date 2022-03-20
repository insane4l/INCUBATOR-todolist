import React from 'react';
import { TaskType } from '../types/types';
import TaskItem from './TaskItem';
import List from '@mui/material/List';

const TaskList: React.FC<TaskListPropsType> = ({todoListId, tasks}) => {

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
    tasks: Array<TaskType>
}