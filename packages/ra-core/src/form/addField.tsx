import React, { Component } from 'react';
import FormField from './FormField';

interface AddFieldProps {
    defaultValue?: any;
    input?: Object;
    source?: string;
    validate?: Function | string[];
}

type AddField = (props: AddFieldProps) => JSX.Element;

export default (BaseComponent: Component, fieldProps: AddFieldProps = {}): AddField => {
    const WithFormField = (props: AddFieldProps) => (
        <FormField component={BaseComponent} {...fieldProps} {...props} />
    );
    return WithFormField;
};
