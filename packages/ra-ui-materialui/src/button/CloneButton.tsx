import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import Queue from '@material-ui/icons/Queue';
import { Link } from 'react-router-dom';
import { WithStyles } from '@material-ui/core';

import Button from './Button';

interface IProps extends WithStyles<{}> {
    basePath: string;
    label: string;
    className: string;
    record: {
        [x: string]: any;
        id: any;
    };
    translate: any;
};

const omitId = ({ id, ...rest }: any): any => rest;

export const CloneButton: React.SFC<IProps> = ({
    basePath = '',
    label = 'ra.action.clone',
    record = {},
    ...rest
}) => (
    <Button
        component={Link}
        to={{
            pathname: `${basePath}/create`,
            state: { record: omitId(record) },
        }}
        label={label}
        {...rest}
    >
        <Queue />
    </Button>
);

CloneButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
};

const enhance = shouldUpdate(
    (props: IProps, nextProps: IProps) =>
        props.translate !== nextProps.translate ||
        (props.record &&
            nextProps.record &&
            props.record !== nextProps.record) ||
        props.basePath !== nextProps.basePath ||
        (props.record == null && nextProps.record != null)
);

export default enhance(CloneButton);
