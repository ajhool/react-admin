import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView, translate } from 'ra-core';

interface IProps {
    className?: string;
    label?: string;
    refreshView: typeof refreshView;
    translate: typeof translate;
}

class RefreshButton extends Component<IProps> {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        refreshView: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired,
    };

    static defaultProps = {
        label: 'ra.action.refresh',
    };

    handleClick: React.MouseEventHandler = event => {
        event.preventDefault();
        this.props.refreshView();
    };

    render() {
        const {
            className,
            label,
            refreshView,
            translate,
            ...rest
        } = this.props;

        return (
            <Tooltip title={label && translate(label, { _: label })}>
                <IconButton
                    arial-label={label && translate(label, { _: label })}
                    className={className}
                    color="inherit"
                    onClick={this.handleClick}
                    {...rest}
                >
                    <NavigationRefresh />
                </IconButton>
            </Tooltip>
        );
    }
}

const enhance = compose<IProps, {}>(
    connect(
        null,
        { refreshView }
    ),
    translate
);
export default enhance(RefreshButton);
