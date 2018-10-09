import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import sanitizeRestProps from 'ra-ui-materialui/src/field/sanitizeRestProps';

interface IProps {
    addLabel?: boolean;
    basePath?: PropTypes.string,
    className?: PropTypes.string,
    cellClassName?: PropTypes.string,
    headerClassName?: PropTypes.string,
    label?: PropTypes.string,
    record: PropTypes.object,
    sortBy?: PropTypes.string,
    source: PropTypes.string.isRequired,
}

const EmailField: React.SFC<IProps> = ({ className, source, record = {}, ...rest }) => (
    <a
        className={className}
        href={`mailto:${get(record, source)}`}
        {...sanitizeRestProps(rest)}
    >
        {get(record, source)}
    </a>
);

EmailField.propTypes = {
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

const PureEmailField = pure(EmailField);

PureEmailField.defaultProps = {
    addLabel: true,
};

export default PureEmailField;
