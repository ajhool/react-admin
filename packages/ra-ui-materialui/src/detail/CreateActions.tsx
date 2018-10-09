import React from 'react';
import PropTypes from 'prop-types';

import CardActions from '../layout/CardActions';
import { ListButton } from '../button';

interface IProps {
    basePath: string;
    hasList: boolean;
    className: string;
    resource: any;
}

const sanitizeRestProps = ({
    basePath,
    className,
    hasList,
    resource,
    ...rest
}: any): any => rest;

/**
 * Action Toolbar for the Create view
 *
 * Internal component. If you want to add or remove actions for a Create view,
 * write your own CreateActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, Create, ListButton } from 'react-admin';
 *
 *     const PostCreateActions = ({ basePath }) => (
 *         <CardActions>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostCreate = (props) => (
 *         <Create actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Create>
 *     );
 */
const CreateActions: React.SFC<IProps> = ({ basePath, className, hasList, ...rest }) => (
    <CardActions className={className} {...sanitizeRestProps(rest)}>
        {hasList && <ListButton basePath={basePath} />}
    </CardActions>
);

CreateActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export default CreateActions;
