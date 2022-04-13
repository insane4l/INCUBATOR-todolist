import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddNewItemForm from './AddNewItemForm';


export default {
  title: 'AddNewItemForm',
  component: AddNewItemForm,
  argTypes: { addItem: { action: 'Item added' } }
} as ComponentMeta<typeof AddNewItemForm>;


const Template: ComponentStory<typeof AddNewItemForm> = (args) => <AddNewItemForm {...args} />;



export const AddNewItemFormBaseView = Template.bind({});
AddNewItemFormBaseView.decorators = [
    (Story) => (
        <div style={{marginTop: '20px'}}>
            <Story />
        </div>
    ),
]

export const AddNewItemFormInContainer300px = Template.bind({});
AddNewItemFormInContainer300px.decorators = [
    (Story) => (
        <div style={{width: '300px', marginTop: '20px'}}>
            <Story />
        </div>
    ),
]
