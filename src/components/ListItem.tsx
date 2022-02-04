import React from 'react';
import { TaskType } from '../types/types';

const ListItem: React.FC<ListItemPropsType> = ({task, removeItem}) => {

    const {title, isDone, id} = task;

    return (
        <li>
            <input type="checkbox" checked={isDone}/> <span>{title}</span>
            <button onClick={() => removeItem(id) }>x</button>
        </li>
    )
}

export default ListItem;


type ListItemPropsType =  {
    task: TaskType
    tasksList: Array<TaskType>
    removeItem: (id: number) => void
}