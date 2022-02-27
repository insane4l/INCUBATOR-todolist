import React from 'react';
import { TaskType } from '../types/types';

const ListItem: React.FC<ListItemPropsType> = ({listId, task, removeItem, changeItemStatus}) => {

    const {title, isDone, id} = task;

    const onItemStatusChange = () => {
        changeItemStatus(id, listId)
    }

    const onRemoveHandler = () => {
        removeItem(id, listId); 
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
    listId: string
    task: TaskType
    removeItem: (taskId: string, todoListId: string) => void
    changeItemStatus: (taskId: string, todoListId: string) => void
}