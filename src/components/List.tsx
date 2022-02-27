import React from 'react';
import { TaskType } from '../types/types';
import ListItem from './ListItem';

const List: React.FC<ListPropsType> = ({listId, tasks, removeItem, changeItemStatus}) => {
    return (
        <ul>
            {tasks.map(el => <ListItem key={el.id} listId={listId} task={el} removeItem={removeItem} changeItemStatus={changeItemStatus}/> )}
        </ul>
    )
}

export default List;


type ListPropsType = {
    listId: string
    tasks: Array<TaskType>
    removeItem: (taskId: string, todoListId: string) => void
    changeItemStatus: (taskId: string, todoListId: string) => void
}