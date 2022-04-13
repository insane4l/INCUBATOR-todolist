import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppHeader from './AppHeader';
import {ReduxStoreProviderDecorator} from '../../../.storybook/ReduxStoreProviderDecorator'

export default {
  title: 'AppHeader',
  component: AppHeader,
  decorators: [
      ReduxStoreProviderDecorator
  ]
} as ComponentMeta<typeof AppHeader>;


const Template: ComponentStory<typeof AppHeader> = (args) => <AppHeader {...args} />;





export const AppHeaderWithAuthorization = Template.bind({});

AppHeaderWithAuthorization.args = {
  isAuth: true
};

export const AppHeaderWithoutAuthorization = Template.bind({});

AppHeaderWithoutAuthorization.args = {
  isAuth: false
};
