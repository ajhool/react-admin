import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import compose from 'recompose/compose';

import RefreshIconButton from '../button/RefreshIconButton';

interface IProps extends WithStyles<typeof styles> {
    classes: any;
    className: string;
    isLoading: boolean;
    width: string;
}

const styles = createStyles({
    loader: {
        margin: 14,
    },
});

export const LoadingIndicator: React.SFC<IProps> = ({ classes, className, isLoading, ...rest }) =>
    isLoading ? (
        <CircularProgress
            className={classNames('app-loader', classes.loader, className)}
            color="inherit"
            size={18}
            thickness={5}
            {...rest}
        />
    ) : (
        <RefreshIconButton />
    );

LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    width: PropTypes.string,
};

interface IState {
    admin: { loading: number }
    [key: string]: any;
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.admin.loading > 0,
});

export default compose<IProps, {}>(
    connect(
        mapStateToProps,
        {} // Avoid connect passing dispatch in props
    ),
    withStyles(styles)
)(LoadingIndicator);
