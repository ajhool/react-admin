/**
 * Custom DragLayer from Alejandro Hernandez
 * See https://github.com/react-dnd/react-dnd/issues/592#issuecomment-399287474
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { compose } from 'recompose';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';

interface IProps extends WithStyles<typeof styles> {
    beingDragged?: boolean;
    dragPreviewComponent: ReactElement | VoidFunction;
    itemBeingDragged?: any;
    offset?: {
        x: number;
        y: number;
    }
}

const styles = createStyles({
    layer: {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    item: {},
});

class CustomDragLayer extends Component<IProps> {
    static propTypes = {
        beingDragged: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        dragPreviewComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]).isRequired,
        itemBeingDragged: PropTypes.object,
        offset: PropTypes.object,
    };

    shouldComponentUpdate(nextProps: IProps) {
        return !isEqual(this.props.offset, nextProps.offset);
    }

    render() {
        const {
            classes,
            beingDragged,
            dragPreviewComponent: DragPreview,
            itemBeingDragged,
            offset,
        } = this.props;
        if (!beingDragged || !offset) {
            return null;
        }

        return (
            <div className={classes.layer}>
                <div
                    role="presentation"
                    className={classes.item}
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                >
                    <DragPreview node={itemBeingDragged} />
                </div>
            </div>
        );
    }
}

export default compose<IProps, {}>(
    withStyles(styles),
    DragLayer(monitor => ({
        itemBeingDragged: monitor.getItem(),
        componentType: monitor.getItemType(),
        beingDragged: monitor.isDragging(),
        offset: monitor.getSourceClientOffset(),
    }))
)(CustomDragLayer);
