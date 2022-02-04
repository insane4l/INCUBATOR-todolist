import React from 'react';
import { TaskType } from '../types/types';
import ListItem from './ListItem';

const List: React.FC<ListPropsType> = ({tasks, removeItem}) => {
    return (
        <ul>
            {tasks.map(el => <ListItem key={el.id} task={el} tasksList={tasks} removeItem={removeItem} /> )}
        </ul>
    )
}

export default List;


type ListPropsType = {
    tasks: Array<TaskType>
    removeItem: (id: number) => void
}