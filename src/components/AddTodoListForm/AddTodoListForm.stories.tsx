import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddTodoListForm from './AddTodoListForm';
import {ReduxStoreProviderDecorator} from '../../../.storybook/ReduxStoreProviderDecorator'

export default {
  title: 'AddTodoListForm',
  component: AddTodoListForm,
  decorators: [
      ReduxStoreProviderDecorator
  ]
} as ComponentMeta<typeof AddTodoListForm>;


const Template: ComponentStory<typeof AddTodoListForm> = (args) => <AddTodoListForm {...args} />;




const hideFormAfterSubmit = () => 'Form hided'


export const AddTodoListFormBaseView = Template.bind({});

AddTodoListFormBaseView.args = {
  hideNewTodoListForm: hideFormAfterSubmit
};
