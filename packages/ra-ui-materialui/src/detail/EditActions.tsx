import React from 'react';
import PropTypes from 'prop-types';

import { ShowButton } from '../button';
import CardActions from '../layout/CardActions';

interface IProps {
    basePath?: string;
    className?: string;
    data?: any;
    hasShow?: boolean;
    resource?: string;
}

const sanitizeRestProps = ({
    basePath,
    className,
    record,
    hasShow,
    hasList,
    ...rest
}: any): any => rest;

/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Edit> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, ShowButton, Edit } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath, record, rseource }) => (
 *         <CardActions>
 *             <ShowButton basePath={basePath} record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostEditActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
const EditActions: React.SFC<IProps>  = ({
    basePath,
    className,
    data,
    hasShow,
    resource,
    ...rest
}) => (
    <CardActions className={className} {...sanitizeRestProps(rest)}>
        {hasShow && <ShowButton basePath={basePath} record={data} />}
    </CardActions>
);

EditActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasShow: PropTypes.bool,
    resource: PropTypes.string,
};

export default EditActions;
