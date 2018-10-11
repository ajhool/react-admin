import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';

import ResettableTextField from './ResettableTextField';
import sanitizeRestProps from './sanitizeRestProps';

interface IProps {
    className?: string;
    input?: any;
    isRequired?: boolean;
    label?: string | boolean;
    meta?: any;
    name?: string;
    onBlur?: React.ChangeEventHandler<HTMLInputElement> | VoidFunction;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | VoidFunction;
    onFocus?: React.FocusEvent<HTMLInputElement> | VoidFunction;
    options?: any;
    resource?: string;
    source?: string;
    type?: string;
}

/**
 * An Input component for a string
 *
 * @example
 * <TextInput source="first_name" />
 *
 * You can customize the `type` props (which defaults to "text").
 * Note that, due to a React bug, you should use `<NumberField>` instead of using type="number".
 * @example
 * <TextInput source="email" type="email" />
 * <NumberInput source="nb_views" />
 *
 * The object passed as `options` props is passed to the <ResettableTextField> component
 */
export class TextInput extends Component<IProps> {
    static propTypes = {
        className: PropTypes.string,
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        meta: PropTypes.object,
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        options: PropTypes.object,
        resource: PropTypes.string,
        source: PropTypes.string,
        type: PropTypes.string,
    };

    static defaultProps = {
        onBlur: () => {},
        onChange: () => {},
        onFocus: () => {},
        options: {},
        type: 'text',
    };

    handleBlur = eventOrValue => {
        this.props.onBlur(eventOrValue);
        this.props.input.onBlur(eventOrValue);
    };

    handleFocus = event => {
        this.props.onFocus(event);
        this.props.input.onFocus(event);
    };

    handleChange: React.ChangeEventHandler<HTMLInputElement> = eventOrValue => {
        this.props.onChange(eventOrValue);
        this.props.input.onChange(eventOrValue);
    };

    render() {
        const {
            className,
            input,
            isRequired,
            label,
            meta,
            options,
            resource,
            source,
            type,
            ...rest
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The TextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;

        return (
            <ResettableTextField
                margin="normal"
                type={type}
                label={
                    label === false ? (
                        label
                    ) : (
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    )
                }
                error={!!(touched && error)}
                helperText={touched && error}
                className={className}
                {...options}
                {...sanitizeRestProps(rest)}
                {...input}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
            />
        );
    }
}

export default addField(TextInput);
