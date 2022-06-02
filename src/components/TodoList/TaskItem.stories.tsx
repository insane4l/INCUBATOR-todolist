import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TaskItem from './TaskItem';
import { ReduxStoreProviderDecorator } from '../../../.storybook/ReduxStoreProviderDecorator';
import { TaskStatuses } from '../../api/taskListsAPI';


export default {
    title: 'Task',
    component: TaskItem,
    decorators: [
        ReduxStoreProviderDecorator
    ],
    args: { //common template
        todoListId: 'dsfasd',
    },
    argTypes: {
        setNewText: { action: 'New text has been set' }
    }
} as ComponentMeta<typeof TaskItem>;

const taskObj = {title: 'Task title', id: '1', description: '', priority: 0, startDate: '', deadline: '', todoListId: '1', order: 1, addedDate: ''}


const Template: ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args} />;


export const TaskIsActive = Template.bind({});
TaskIsActive.args = {
    task: {...taskObj, status: TaskStatuses.New}
};


export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {...taskObj, status: TaskStatuses.Completed}
};


export const TaskWithDivider = Template.bind({});
TaskIsActive.args = {
    task: {...taskObj, status: TaskStatuses.Completed},
    withDivider: true
};
