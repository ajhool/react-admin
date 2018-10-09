import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
    className: string;
    children: ReactNode;
}

const styles = createStyles({
    root: {
        paddingTop: 0,
        paddingBottom: 0,
        '&:first-child': {
            paddingTop: 16,
        },
        '&:last-child': {
            paddingBottom: 16,
        },
    },
});

/**
 * Overrides material-ui CardContent to allow inner content
 *
 * When using several CardContent inside the same Card, the top and bottom
 * padding double the spacing between each CardContent, leading to too much
 * wasted space. Use this component as a CardContent alternative.
 */
const CardContentInner: React.SFC<IProps> = ({ classes, className, children }) => (
    <CardContent className={classnames(classes.root, className)}>
        {children}
    </CardContent>
);

CardContentInner.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default withStyles(styles)(CardContentInner);
