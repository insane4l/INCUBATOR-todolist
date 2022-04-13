import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomPalette from './CustomPalette';
import { ReduxStoreProviderDecorator } from '../../../.storybook/ReduxStoreProviderDecorator';



export default {
    title: 'CustomPalette',
    component: CustomPalette,
    argTypes: {
        hideCustomPalette: { action: 'Palette closed' }
    },
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof CustomPalette>;


const Template: ComponentStory<typeof CustomPalette> = (args) => <CustomPalette {...args} />;



export const CustomPaletteBaseView = Template.bind({});


// todo: reset to default func

