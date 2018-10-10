import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { addField, translate, FieldTitle } from 'ra-core';

import sanitizeRestProps from 'ra-ui-materialui/src/input/sanitizeRestProps';

interface IProps extends WithStyles<typeof styles> {
    className?: string;
    input?: any;
    isRequired?: boolean;
    label?: string;
    meta?: any;
    options?: string;
    resource?: string;
    source?: string;
    translate: any;
}

interface IState {
    value: any;
}

const styles = (theme: Theme) => createStyles({
    input: { width: theme.spacing.unit * 16 },
});

export class NullableBooleanInput extends Component<IProps, IState> {
    static propTypes = {
        classes: PropTypes.object,
        className: PropTypes.string,
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        meta: PropTypes.object,
        options: PropTypes.object,
        resource: PropTypes.string,
        source: PropTypes.string,
        translate: PropTypes.func.isRequired,
    };
    
    state = {
        value: this.props.input.value,
    };

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.input.value !== this.props.input.value) {
            this.setState({ value: nextProps.input.value });
        }
    }

    handleChange: React.ChangeEventHandler = event => {
        this.props.input.onChange(
            this.getBooleanFromString(event.target.value)
        );
        this.setState({ value: event.target.value });
    };

    getBooleanFromString = (value: string): boolean | null => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return null;
    };

    getStringFromBoolean = (value: boolean): 'true' | 'false' | '' => {
        if (value === true) return 'true';
        if (value === false) return 'false';
        return '';
    };

    render() {
        const {
            classes,
            className,
            isRequired,
            label,
            meta,
            options,
            resource,
            source,
            translate,
            ...rest
        } = this.props;
        const { touched, error } = meta;
        return (
            <TextField
                select
                margin="normal"
                value={this.getStringFromBoolean(this.state.value)}
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
                error={!!(touched && error)}
                helperText={touched && error}
                className={classnames(classes.input, className)}
                {...options}
                {...sanitizeRestProps(rest)}
                onChange={this.handleChange}
            >
                <MenuItem value="" />
                <MenuItem value="false">
                    {translate('ra.boolean.false')}
                </MenuItem>
                <MenuItem value="true">{translate('ra.boolean.true')}</MenuItem>
            </TextField>
        );
    }
}

const enhance = compose<IProps, {}>(
    addField,
    translate,
    withStyles(styles)
);

export default enhance(NullableBooleanInput);
