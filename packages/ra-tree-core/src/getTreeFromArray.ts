import { arrayToTree } from "performant-array-to-tree";

interface ITreeNode {
    id: number;
    data: any;
    children: ITreeNode[];
    parent?: number | null | ITreeNode;
}

// TODO: Not quite sure what's happening here. made some changes. Must revisit.

/**
 * Recursivly create nodes.
 */
const createNode = ({ children, ...data }: ITreeNode): ITreeNode => ({
    id: data.id,
    data: data,
    children: children ? children.map(child => createNode(child)) : [],
});

/**
 * Recursivly add a parent property to every nodes so that they can a reference to their parent
 */
const addParent = (node: ITreeNode, parent: ITreeNode): ITreeNode => ({
    ...node,
    children: node.children.map(child => addParent(child, node)),
    parent
});

/**
 * Build a tree representation of the data returned by the List component
 */
export default (data: any[], parentSource: string) => {
    // arrayToTree requires top level nodes to have their parent id set to null
    const sanitizedData = data.map(item => ({
        ...item,
        [parentSource]: item[parentSource] || null,
    }));

    return arrayToTree(sanitizedData, {
        id: 'id',
        parentId: parentSource,
    })
        .map(node => createNode(node, 1))
        .map(node => addParent(node, null));
};
