import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuperColorPicker from './SuperColorPicker';

export default {
	title: 'ColorPicker',
	component: SuperColorPicker,
	argTypes: {
		onColorChange: { action: 'New color has ben set' }
	}
} as ComponentMeta<typeof SuperColorPicker>;


const Template: ComponentStory<typeof SuperColorPicker> = (args) => <SuperColorPicker {...args} />;





export const ControlledSuperColorPickerWithLabel = Template.bind({});
// todo: use local state?? decorator?? read docs
ControlledSuperColorPickerWithLabel.args = {
	// onColorChange: (value: string) => console.log(value),
	// value: ,
	label: 'label name'
};

export const UncontrolledSuperColorPicker = Template.bind({});
