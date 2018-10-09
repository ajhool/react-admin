import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import ContentSave from '@material-ui/icons/Save';
import classnames from 'classnames';
import { showNotification, translate, ShowNotification } from 'ra-core';

interface IProps extends WithStyles<typeof styles> {
    className: string;
    handleSubmitWithRedirect: VoidFunction;
    invalid: boolean;
    label: string;
    pristine: boolean;
    redirect: string | boolean | VoidFunction;
    saving: object | boolean;
    showNotification: ShowNotification;
    submitOnEnter: boolean;
    translate: VoidFunction;
    variant: 'raised' | 'flat' | 'fab';
}

const styles = createStyles({
    button: {
        position: 'relative',
    },
    iconPaddingStyle: {
        marginRight: '0.5em',
    },
});

const sanitizeRestProps = ({
    basePath,
    className,
    classes,
    saving,
    label,
    invalid,
    variant,
    translate,
    handleSubmit,
    handleSubmitWithRedirect,
    submitOnEnter,
    redirect,
    locale,
    showNotification,
    ...rest
}: any): any => rest;

export class SaveButton extends Component<IProps> {
    handleClick: React.MouseEventHandler = e => {
        const {
            handleSubmitWithRedirect,
            invalid,
            redirect,
            saving,
            showNotification,
        } = this.props;

        if (saving) {
            // prevent double submission
            e.preventDefault();
        } else {
            if (invalid) {
                showNotification('ra.message.invalid_form', 'warning');
            }
            // always submit form explicitly regardless of button type
            if (e) {
                e.preventDefault();
            }
            handleSubmitWithRedirect(redirect)();
        }
    };

    render() {
        const {
            className,
            classes = {},
            invalid,
            label = 'ra.action.save',
            pristine,
            redirect,
            saving,
            submitOnEnter,
            translate,
            variant = 'raised',
            ...rest
        } = this.props;

        const type = submitOnEnter ? 'submit' : 'button';
        return (
            <Button
                className={classnames(classes.button, className)}
                variant={variant}
                type={type}
                onClick={this.handleClick}
                color={saving ? 'default' : 'primary'}
                {...sanitizeRestProps(rest)}
            >
                {saving && saving.redirect === redirect ? (
                    <CircularProgress
                        size={25}
                        thickness={2}
                        className={classes.iconPaddingStyle}
                    />
                ) : (
                    <ContentSave className={classes.iconPaddingStyle} />
                )}
                {label && translate(label, { _: label })}
            </Button>
        );
    }
}

SaveButton.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    pristine: PropTypes.bool,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    showNotification: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['raised', 'flat', 'fab']),
};

SaveButton.defaultProps = {
    handleSubmitWithRedirect: () => () => {},
};

const enhance = compose<IProps, {}>(
    translate,
    connect(
        undefined,
        { showNotification }
    ),
    withStyles(styles)
);

export default enhance(SaveButton);
