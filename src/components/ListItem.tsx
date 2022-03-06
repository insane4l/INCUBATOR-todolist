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

    const taskCN = isDone ? "task_completed" : "";

    return (
        <li className={taskCN}>
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