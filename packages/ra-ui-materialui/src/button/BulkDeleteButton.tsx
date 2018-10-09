import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, DispatchProp } from 'react-redux';
import compose from 'recompose/compose';
import ActionDelete from '@material-ui/icons/Delete';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { crudDeleteMany, startUndoable } from 'ra-core';

import Button from 'ra-ui-materialui/src/button/Button';

interface IProps extends WithStyles<typeof styles> {
    basePath: string;
    dispatchCrudDeleteMany: DispatchProp,
    filterValues: any,
    label: string;
    resource: string,
    selectedIds: any[];
    startUndoable: VoidFunction,
    undoable: boolean;
}

const sanitizeRestProps = ({
    basePath,
    classes,
    dispatchCrudDeleteMany,
    filterValues,
    label,
    resource,
    selectedIds,
    startUndoable,
    undoable,
    ...rest
}: any): any => rest;

const styles = (theme: Theme) => createStyles({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
});

class BulkDeleteButton extends Component<IProps> {
    static propTypes = {
        basePath: PropTypes.string,
        classes: PropTypes.object,
        dispatchCrudDeleteMany: PropTypes.func.isRequired,
        label: PropTypes.string,
        resource: PropTypes.string.isRequired,
        startUndoable: PropTypes.func,
        selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
        undoable: PropTypes.bool,
    };

    handleClick = () => {
        const {
            basePath,
            dispatchCrudDeleteMany,
            resource,
            selectedIds,
            startUndoable,
            undoable,
        } = this.props;
        if (undoable) {
            startUndoable(crudDeleteMany(resource, selectedIds, basePath));
        } else {
            dispatchCrudDeleteMany(resource, selectedIds, basePath);
        }
    };

    render() {
        const { classes, label, ...rest } = this.props;
        return (
            <Button
                onClick={this.handleClick}
                label={label}
                className={classes.deleteButton}
                {...sanitizeRestProps(rest)}
            >
                <ActionDelete />
            </Button>
        );
    }
}

const EnhancedBulkDeleteButton = compose<IProps, {}>(
    connect(
        undefined,
        {
            startUndoable,
            dispatchCrudDeleteMany: crudDeleteMany,
        }
    ),
    withStyles(styles)
)(BulkDeleteButton);

EnhancedBulkDeleteButton.defaultProps = {
    label: 'ra.action.delete',
    undoable: true,
};

export default EnhancedBulkDeleteButton;
