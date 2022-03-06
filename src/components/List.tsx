import React from 'react';
import { TaskType } from '../types/types';
import ListItem from './ListItem';

const List: React.FC<ListPropsType> = ({listId, tasks, removeItem, changeItemStatus, changeItemTitle}) => {
    return (
        <ul>
            {tasks.map(el => <ListItem key={el.id} listId={listId} task={el} removeItem={removeItem} changeItemStatus={changeItemStatus} changeItemTitle={changeItemTitle} /> )}
        </ul>
    )
}

export default List;


type ListPropsType = {
    listId: string
    tasks: Array<TaskType>
    removeItem: (taskId: string, todoListId: string) => void
    changeItemStatus: (taskId: string, todoListId: string) => void
    changeItemTitle: (taskId: string, todoListId: string, newTitle: string) => void
}