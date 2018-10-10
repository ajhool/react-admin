import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';

interface IProps {
    className?: string;
    field?: ReactElement<any>;
    record?: any; // eslint-disable-line react/forbid-prop-types
    basePath?: string;
    resource?: string;
}

const sanitizeRestProps = ({
    cellClassName,
    className,
    field,
    formClassName,
    headerClassName,
    record,
    basePath,
    resource,
    ...rest
}: any): any => rest;

export const DatagridCell: React.SFC<IProps> = ({
    className,
    field,
    record,
    basePath,
    resource,
    ...rest
}) => (
    <TableCell
        className={classnames(className, field.props.cellClassName)}
        numeric={field.props.textAlign === 'right'}
        padding="none"
        {...sanitizeRestProps(rest)}
    >
        {React.cloneElement(field, {
            record,
            basePath: field.props.basePath || basePath,
            resource,
        })}
    </TableCell>
);

DatagridCell.propTypes = {
    className: PropTypes.string,
    field: PropTypes.element,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    basePath: PropTypes.string,
    resource: PropTypes.string,
};

export default DatagridCell;
