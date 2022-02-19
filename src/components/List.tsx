import React from 'react';
import { TaskType } from '../types/types';
import ListItem from './ListItem';

const List: React.FC<ListPropsType> = ({tasks, removeItem, changeItemStatus}) => {
    return (
        <ul>
            {tasks.map(el => <ListItem key={el.id} task={el} removeItem={removeItem} changeItemStatus={changeItemStatus}/> )}
        </ul>
    )
}

export default List;


type ListPropsType = {
    tasks: Array<TaskType>
    removeItem: (id: string) => void
    changeItemStatus: (id: string) => void
}