import React from 'react';
import { TodoListItemType } from '../types/types';

const TodoListItem: React.FC<TodoListItemType> = ({title, isDone, id}) => {
    return <li key={id}><input type="checkbox" checked={isDone}/> <span>{title}</span></li>
}

export default TodoListItem;