import React from 'react';
import { TaskType } from '../types/types';
import TaskItem from './TaskItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const TaskList: React.FC<ListPropsType> = ({listId, tasks, removeItem, changeItemStatus, changeItemTitle}) => {

    return (
        <List>
            {tasks.map((el, i) => (
                <>
                    <TaskItem 
                        key={el.id}
                        listId={listId}
                        task={el}
                        removeItem={removeItem}
                        changeItemStatus={changeItemStatus}
                        changeItemTitle={changeItemTitle} />
                    {i !== (tasks.length - 1) && <Divider />}
                </>
            ) )}
        </List>
    )
}

export default TaskList;


type ListPropsType = {
    listId: string
    tasks: Array<TaskType>
    removeItem: (taskId: string, todoListId: string) => void
    changeItemStatus: (taskId: string, todoListId: string) => void
    changeItemTitle: (taskId: string, todoListId: string, newTitle: string) => void
}