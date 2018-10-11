import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultGetTreeFromArray from './getTreeFromArray';
import { getIsNodeExpanded } from './selectors';
import {
    closeNode as closeNodeAction,
    expandNode as expandNodeAction,
    toggleNode as toggleNodeAction,
} from './actions';
import { Component } from 'react';
import { ITreeState } from './reducer';

const defaultGetTreeState = state => state.tree;

interface IProps {
    basePath: string;
    children: () => void;
    closeNode: typeof closeNodeAction;
    expandNode: typeof expandNodeAction;
    ids: number[];
    data: any;
    getTreeFromArray?: (
        values: any[],
        parentSource: string
    ) => void;
    getTreeState?: () => void;
    parentSource?: string;
    resource: string;
    toggleNode: (resource: string, id: number) => void;
    treeState?: ITreeState;
}

type NodeActionGenerator = (nodeId: number) => void;

export class TreeControllerView extends Component<IProps> {
    static propTypes = {
        basePath: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        closeNode: PropTypes.func.isRequired,
        expandNode: PropTypes.func.isRequired,
        ids: PropTypes.array.isRequired,
        data: PropTypes.object.isRequired,
        getTreeFromArray: PropTypes.func,
        getTreeState: PropTypes.func,
        parentSource: PropTypes.string,
        resource: PropTypes.string.isRequired,
        toggleNode: PropTypes.func.isRequired,
        treeState: PropTypes.object,
    }

    handleGetIsNodeExpanded = (nodeId: number) => getIsNodeExpanded(this.props.treeState, this.props.resource, nodeId);

    handleCloseNode: NodeActionGenerator = (nodeId: number) => this.props.closeNode(this.props.resource, nodeId);

    handleExpandNode: NodeActionGenerator = (nodeId: number) => this.props.expandNode(this.props.resource, nodeId);

    handleToggleNode: NodeActionGenerator = (nodeId: number) => this.props.toggleNode(this.props.resource, nodeId);

    render() {
        const {
            children,
            closeNode,
            expandNode,
            data: { fetchedAt, ...data },
            getTreeFromArray,
            getTreeState,
            ids,
            parentSource,
            resource,
            toggleNode,
            treeState,
            ...props
        } = this.props;

        const availableData = ids.reduce((acc, id) => [...acc, data[id]], [] as number[]);
        const tree = getTreeFromArray(
            Object.values(availableData),
            parentSource
        );

        return children({
            getIsNodeExpanded: this.handleGetIsNodeExpanded,
            parentSource,
            tree,
            closeNode: this.handleCloseNode,
            expandNode: this.handleExpandNode,
            toggleNode: this.handleToggleNode,
            resource,
            ...props,
        });
    }
}

const mapStateToProps = (state, { getTreeState }) => ({
    treeState: getTreeState(state),
});

const TreeController = connect(
    mapStateToProps,
    {
        closeNode: closeNodeAction,
        expandNode: expandNodeAction,
        toggleNode: toggleNodeAction,
    }
)(TreeControllerView);

TreeController.defaultProps = {
    getTreeFromArray: defaultGetTreeFromArray,
    getTreeState: defaultGetTreeState,
    parentSource: 'parent_id',
};

export default TreeController;
