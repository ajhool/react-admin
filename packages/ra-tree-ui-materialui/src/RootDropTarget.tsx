import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { DropTarget, DropTargetSpec } from 'react-dnd';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconGetApp from '@material-ui/icons/GetApp';

import { DROP_TARGET_TYPE } from 'ra-tree-ui-materialui/src/constants';
import { translate } from 'ra-core';

interface IProps extends WithStyles<typeof styles> {
    canDrop?: boolean;
    connectDropTarget: any;
    isOverCurrent?: boolean;
    translate: any;
}

const styles = (theme: Theme) => createStyles({
    root: {
        paddingLeft: theme.spacing.unit * 6,
    },
    text: {
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    hover: {
        backgroundColor: theme.palette.action.active,
    },
});

class RootDropTarget extends Component<IProps> {
    static propTypes = {
        canDrop: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isOverCurrent: PropTypes.bool,
        translate: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps: IProps) {
        return (
            this.props.canDrop !== nextProps.canDrop ||
            this.props.isOverCurrent !== nextProps.isOverCurrent
        );
    }

    render() {
        const {
            canDrop,
            classes,
            connectDropTarget,
            isOverCurrent,
            translate,
        } = this.props;
        return (
            <ListItem
                className={classNames(classes.root, {
                    [classes.hover]: canDrop && isOverCurrent,
                })}
                disabled={!canDrop}
            >
                <IconGetApp />
                {connectDropTarget(
                    <div>
                        <Typography className={classes.text}>
                            {translate('ra.tree.root_target')}
                        </Typography>
                    </div>
                )}
            </ListItem>
        );
    }
}

const dropTargetSpecs: DropTargetSpec<IProps> = {
    drop(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return { id: null, record: { id: null } };
        }

        return undefined;
    },
    canDrop(props, monitor) {
        const item = monitor.getItem();
        return item.parent;
    },
};

const dropTargetConnect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    item: monitor.getItem(),
});

export default compose<IProps, {}>(
    DropTarget(DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect),
    translate,
    withStyles(styles)
)(RootDropTarget);
