import { DropTarget, DropTargetSpec, DropTargetCollector } from 'react-dnd';

import { DROP_TARGET_TYPE } from './constants';

const isDraggingAParent = (props, monitor) => {
    const draggedNode = monitor.getItem();

    if (!draggedNode) {
        return false;
    }
    let node = props.node;

    while (node) {
        // If the dragged node is a parent of the current node, it can't be dropped
        if (draggedNode.id === node.id) {
            return true;
        }
        node = node.parent;
    }

    return false;
};

const dropTargetSpecs: DropTargetSpec<any> = {
    drop(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return props.node;
        }

        return undefined;
    },
    canDrop(props, monitor) {
        return !isDraggingAParent(props, monitor);
    },
};

const dropTargetConnect: DropTargetCollector<any> = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
});

export default DropTarget(DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect);
