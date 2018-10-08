import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';

import {
    hideNotification,
    getNotification,
    translate,
    undo,
    complete,
} from 'ra-core';

interface INotification {
    message: string;
    type: string;
    autoHideDuration: number;
    messageArgs: object;
}

interface IState {
    open: boolean;
}

interface IProps {
    hideNotification: () => any;
    translate: () => {};
    undo: () => any;
    complete: () => any;
    classes?: any;
    className?: string;
    notification: INotification;
    type: string;
    autoHideDuration: number;
}

const styles = (theme: Theme) => createStyles({
    confirm: {
        backgroundColor: theme.palette.background.default,
    },
    warning: {
        backgroundColor: theme.palette.error.light,
    },
    undo: {
        color: theme.palette.primary.light,
    },
});

class Notification extends React.Component<IProps, IState> {
    public state = {
        open: false,
    };
    
    componentWillMount = () => {
        this.setOpenState(this.props);
    };
    componentWillReceiveProps = (nextProps: IProps) => {
        this.setOpenState(nextProps);
    };

    setOpenState = ({ notification }: IProps) => {
        this.setState({
            open: !!notification,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleExited = () => {
        const { notification, hideNotification, complete } = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    };

    render() {
        const {
            undo,
            complete,
            classes,
            className,
            type,
            translate,
            notification,
            autoHideDuration,
            hideNotification,
            ...rest
        } = this.props;

        return (
            <Snackbar
                open={this.state.open}
                message={
                    notification &&
                    notification.message &&
                    translate(notification.message, notification.messageArgs)
                }
                autoHideDuration={
                    (notification && notification.autoHideDuration) ||
                    autoHideDuration
                }
                onExited={this.handleExited}
                onClose={this.handleRequestClose}
                ContentProps={{
                    className: classnames(
                        classes[(notification && notification.type) || type],
                        className
                    ),
                }}
                action={
                    notification && notification.undoable ? (
                        <Button
                            color="primary"
                            className={classes.undo}
                            size="small"
                            onClick={undo}
                        >
                            {translate('ra.action.undo')}
                        </Button>
                    ) : null
                }
                {...rest}
            />
        );
    }
}

Notification.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func,
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000,
};

const mapStateToProps = state => ({
    notification: getNotification(state),
});

export default compose(
    translate,
    withStyles(styles),
    connect(
        mapStateToProps,
        {
            complete,
            hideNotification,
            undo,
        }
    )
)(Notification);
