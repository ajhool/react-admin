import React from 'react';
import PropTypes from 'prop-types';
import ActionList from '@material-ui/icons/List';
import { Link } from 'react-router-dom';

import Button from './Button';

interface IProps {
    basePath: string;
    label: string;
}

const ListButton: React.SFC<IProps> = ({ basePath = '', label = 'ra.action.list', ...rest }) => (
    <Button component={Link} to={basePath} label={label} {...rest}>
        <ActionList />
    </Button>
);

ListButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
};

export default ListButton;
