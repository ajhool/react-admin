import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

interface IProps {
    className?: string;
    id?: string;
    input?: any;
    isRequired?: boolean;
    label?: string;
    resource?: string;
    source?: string;
    options?: any;
}

export class BooleanInput extends Component<IProps> {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        resource: PropTypes.string,
        source: PropTypes.string,
        options: PropTypes.object,
    };

    static defaultProps = {
        options: {},
    };

    handleChange = (event: any, value: any) => {
        this.props.input.onChange(value);
    };

    render() {
        const {
            className,
            id,
            input,
            isRequired,
            label,
            source,
            resource,
            options,
            ...rest
        } = this.props;

        const { value, ...inputProps } = input;

        return (
            <FormGroup className={className} {...sanitizeRestProps(rest)}>
                <FormControlLabel
                    htmlFor={id}
                    control={
                        <Switch
                            id={id}
                            color="primary"
                            checked={!!value}
                            onChange={this.handleChange}
                            {...inputProps}
                            {...options}
                        />
                    }
                    label={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                />
            </FormGroup>
        );
    }
}

export default addField(BooleanInput);
