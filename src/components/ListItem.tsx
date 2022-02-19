import React from 'react';
import { TaskType } from '../types/types';

const ListItem: React.FC<ListItemPropsType> = ({task, removeItem, changeItemStatus}) => {

    const {title, isDone, id} = task;

    const onItemStatusChange = () => {
        changeItemStatus(id)
    }

    const onRemoveHandler = () => {
        removeItem(id); 
    }

    return (
        <li>
            <input type="checkbox"
                   checked={isDone}
                   onChange={onItemStatusChange}/> 
            <span>{title}</span>
            <button onClick={onRemoveHandler}>x</button>
        </li>
    )
}

export default ListItem;


type ListItemPropsType =  {
    task: TaskType
    removeItem: (id: string) => void
    changeItemStatus: (id: string) => void
}