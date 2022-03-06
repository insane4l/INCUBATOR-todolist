import React from 'react';
import { TaskType } from '../types/types';
import EditableTextLine from './common/EditableTextLine';

const ListItem: React.FC<ListItemPropsType> = ({listId, task, removeItem, changeItemStatus, changeItemTitle}) => {

    const {title, isDone, id} = task;

    const onItemStatusChange = () => {
        changeItemStatus(id, listId)
    }

    const onItemTitleChange = (newTitle: string) => {
        changeItemTitle(id, listId, newTitle);
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
            <EditableTextLine text={title} setNewText={onItemTitleChange} />
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
    changeItemTitle: (taskId: string, todoListId: string, newTitle: string) => void
}