import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import TableBody from '@material-ui/core/TableBody';
import classnames from 'classnames';

import DatagridRow from './DatagridRow';

interface IProps {
    basePath?: string;
    classes?: any;
    className?: string;
    children?: ReactNode;
    data: any;
    hasBulkActions: boolean;
    hover?: boolean;
    ids: any[];
    isLoading?: boolean;
    onToggleItem?: VoidFunction;
    resource?: string;
    rowClick?: string | VoidFunction;
    rowStyle?: VoidFunction;
    selectedIds: any[];
    styles?: any;
    version?: number;
}

const DatagridBody: React.SFC<IProps> = ({
    basePath,
    children,
    classes,
    className,
    data,
    hasBulkActions,
    hover,
    ids,
    isLoading,
    onToggleItem,
    resource,
    rowClick,
    rowStyle,
    selectedIds,
    styles,
    version,
    ...rest
}) => (
    <TableBody className={classnames('datagrid-body', className)} {...rest}>
        {ids.map((id, rowIndex) => (
            <DatagridRow
                basePath={basePath}
                classes={classes}
                className={classnames(classes.row, {
                    [classes.rowEven]: rowIndex % 2 === 0,
                    [classes.rowOdd]: rowIndex % 2 !== 0,
                    [classes.clickableRow]: rowClick,
                })}
                rowClick={rowClick}
                hasBulkActions={hasBulkActions}
                id={id}
                key={id}
                onToggleItem={onToggleItem}
                record={data[id]}
                resource={resource}
                selected={selectedIds.includes(id)}
                hover={hover}
                style={rowStyle ? rowStyle(data[id], rowIndex) : null}
            >
                {children}
            </DatagridRow>
        ))}
    </TableBody>
);

DatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    styles: PropTypes.object,
    version: PropTypes.number,
};

DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
};

const areArraysEqual = (arr1: any[], arr2: any[]) =>
    arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

const PureDatagridBody = shouldUpdate(
    (props: IProps, nextProps: IProps) =>
        props.version !== nextProps.version ||
        nextProps.isLoading === false ||
        !areArraysEqual(props.ids, nextProps.ids) ||
        props.data !== nextProps.data
)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
