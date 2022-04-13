import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../.storybook/ReduxStoreProviderDecorator'
import {MuiThemeAppDecorator} from '../../.storybook/MuiThemeAppDecorator'
import App from './App';


export default {
  title: 'App',
  component: App,
  decorators: [
    MuiThemeAppDecorator,
    ReduxStoreProviderDecorator
  ]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App />;

// todo: create mock init state because initial state will be empty (app with server data)
export const AppBaseView = Template.bind({});

