import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

interface IProps extends WithStyles<typeof styles> {
    children: ReactNode;
    className: string;
}

const styles = createStyles({
    cardActions: {
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        padding: 0,
    },
});

const CardActions: React.SFC<IProps> = ({ classes, className, children, ...rest }) => (
    <div className={classnames(classes.cardActions, className)} {...rest}>
        {children}
    </div>
);

CardActions.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
};

export default withStyles(styles)(CardActions);
