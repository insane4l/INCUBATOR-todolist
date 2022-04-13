import React from 'react'
import { Provider } from "react-redux";
import { store } from '../src/bll/store';

export const ReduxStoreProviderDecorator = (Story: React.ComponentType) => (
    <Provider store={store}>
        <Story/>
    </Provider>
)