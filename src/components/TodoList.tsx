import React from 'react';
import { TodoListType } from '../types/types';
import TodoListItem from './TodoListItem';

const TodoList: React.FC<TodoListType> = ({title, tasks}) => {

    return (
        <div>
			<h3>{title}</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<ul>
				{tasks.map(el => <TodoListItem title={el.title} isDone={el.isDone} id={el.id} />)}
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
    )
}

export default TodoList;