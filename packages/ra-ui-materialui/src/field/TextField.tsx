import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';

import sanitizeRestProps from './sanitizeRestProps';

interface IProps {
    addLabel?: boolean;
    basePath?: string;
    className?: string;
    cellClassName?: string;
    headerClassName?: string;
    label?: string;
    record?: any;
    sortBy?: string;
    source: string;
}

const TextField: React.SFC<IProps> = ({ className, source, record = {}, ...rest }) => (
    <Typography
        component="span"
        body1="body1"
        className={className}
        {...sanitizeRestProps(rest)}
    >
        {get(record, source)}
    </Typography>
);

TextField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
};

const PureTextField = pure(TextField);

PureTextField.defaultProps = {
    addLabel: true,
};

export default PureTextField;
