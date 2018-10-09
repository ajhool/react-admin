import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView as refreshViewAction } from 'ra-core';

import Button from './Button';

interface IProps {
    label: string;
    refreshView: () => void;
}

class RefreshButton extends Component<IProps> {
    static propTypes = {
        label: PropTypes.string,
        refreshView: PropTypes.func.isRequired,
    };

    static defaultProps = {
        label: 'ra.action.refresh',
    };

    handleClick: React.MouseEventHandler = event => {
        event.preventDefault();
        this.props.refreshView();
    }

    render() {
        const { label, refreshView, ...rest } = this.props;

        return (
            <Button label={label} onClick={this.handleClick} {...rest}>
                <NavigationRefresh />
            </Button>
        );
    }
}

const enhance = connect(
    null,
    { refreshView: refreshViewAction }
);

export default enhance(RefreshButton);
