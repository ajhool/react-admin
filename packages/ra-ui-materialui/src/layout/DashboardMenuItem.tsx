import React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { translate } from 'ra-core';

import MenuItemLink from './MenuItemLink';

interface IProps {
    classes: object;
    className: string;
    onClick: React.MouseEventHandler;
    translate: any;
}

const DashboardMenuItem: React.SFC<IProps> = ({ className, onClick, translate, ...props }) => (
    <MenuItemLink
        onClick={onClick}
        to="/"
        primaryText={translate('ra.page.dashboard')}
        leftIcon={<DashboardIcon />}
        exact
        {...props}
    />
);

DashboardMenuItem.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    translate: PropTypes.func.isRequired,
};

export default translate(DashboardMenuItem);
