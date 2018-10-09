import React from 'react';
import { SaveButton } from 'ra-ui-materialui';
import NodeActions, { IProps as NodeActionProps } from './NodeActions';

const NodeFormActions = (props: NodeActionProps) => (
    <NodeActions {...props}>
        <SaveButton variant="flat" />
    </NodeActions>
);

export default NodeFormActions;
