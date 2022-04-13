import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TodoList from './TodoList';


export default {
    title: 'TodoList',
    component: TodoList,
    argTypes: {
        setNewText: { action: 'New text has been set' }
    }
} as ComponentMeta<typeof TodoList>;


const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;



export const TodoListBaseView = Template.bind({});
// todo: create mock todolist, tasks, filters
TodoListBaseView.args = {
    // todoList: {id: todoListsId[0], title: "Must Learn", currentFilter: 'all', isCollapsed: true}
};
