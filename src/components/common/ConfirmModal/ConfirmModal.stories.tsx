import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ConfirmModal from './ConfirmModal';


export default {
    title: 'Modal',
    component: ConfirmModal,
    argTypes: {
        onAnswerCallback: { action: 'The answer has been given' },
        onOverlayClose: { action: 'Modal closed' }
    }
} as ComponentMeta<typeof ConfirmModal>;


const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;



export const ConfirmModalBaseView = Template.bind({});

ConfirmModalBaseView.args = {
    displayModal: true,
    title: 'Modal title'
};
