import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';

interface IProps extends WithStyles<typeof styles> {
    children?: any;
    className?: string;
    node?: any;
    style?: any;
    translate: any;
}

const styles = (theme: Theme) => createStyles({
    item: {
        alignItems: 'center',
        backgroundColor: theme.palette.action.active,
        display: 'inline-flex',
        height: 72,
        minWidth: 72,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 4,
    },
});

class DragPreview extends Component<IProps> {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        className: PropTypes.string,
        classes: PropTypes.object,
        node: PropTypes.object,
        style: PropTypes.object,
        translate: PropTypes.func.isRequired,
    };

    shouldComponentUpdate() {
        return false;
    }
    render() {
        const {
            children,
            className,
            classes,
            node,
            style,
            translate,
        } = this.props;
        return (
            <div className={className || classes.item} style={style}>
                {children
                    ? typeof children === 'function'
                        ? children({ node, translate })
                        : children
                    : translate('ra.tree.drag_preview', {
                          id: node.id,
                          smart_count: node.children.length,
                      })}
            </div>
        );
    }
}

export default compose<IProps, {}>(
    translate,
    withStyles(styles)
)(DragPreview);
