import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditableTextLine from './EditableTextLine';



export default {
    title: 'EditableTextLine',
    component: EditableTextLine,
    argTypes: {
        setNewText: { action: 'New text has been set' }
    }
} as ComponentMeta<typeof EditableTextLine>;


const Template: ComponentStory<typeof EditableTextLine> = (args) => <EditableTextLine {...args} />;



export const EditableTextLineBaseView = Template.bind({});

EditableTextLineBaseView.args = {
    text: 'changeable text line'
};

EditableTextLineBaseView.decorators = [
    (Story) => (
        <div style={{ marginTop: '20px' }}>
            <Story />
        </div>
    )
]
