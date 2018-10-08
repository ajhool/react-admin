import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import * as classnames from 'classnames';
import { translate, userLogout as userLogoutAction } from 'ra-core';


interface IProps {
    classes: any;
    className: string;
    translate: translate;
    userLogout: typeof userLogoutAction;
    redirectTo: string;
}

interface IState {
    theme: Theme;
}

const styles = (theme: Theme) => createStyles({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    iconMenuPaddingStyle: {
        paddingRight: '1.2em',
    },
    iconPaddingStyle: {
        paddingRight: theme.spacing.unit,
    },
});

const sanitizeRestProps = ({
    classes,
    className,
    translate,
    userLogout,
    locale,
    redirectTo,
    ...rest
}: any): any => rest;
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
class Logout extends PureComponent<IProps>{
    static propTypes = {
        classes: PropTypes.object,
        className: PropTypes.string,
        translate: PropTypes.func,
        userLogout: PropTypes.func,
        redirectTo: PropTypes.string,
    }

    render(){
        const { classes, className, translate, userLogout, ...rest } = this.props;
        return (
            <MenuItem
                className={classnames('logout', classes.menuItem, className)}
                onClick={userLogout}
                {...sanitizeRestProps(rest)}
            >
                <span className={classes.iconMenuPaddingStyle}>
                    <ExitIcon />
                </span>
                {translate('ra.auth.logout')}
            </MenuItem>
        )
    }
};

const mapStateToProps = (state: IState) => ({
    theme: state.theme,
});

const mapDispatchToProps = (dispatch, { redirectTo }) => ({
    userLogout: () => dispatch(userLogoutAction(redirectTo)),
});

const enhance = compose(
    translate,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

export default enhance(Logout);
