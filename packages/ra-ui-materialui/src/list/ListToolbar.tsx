import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
    filters?: any;
    actions?: any;
    bulkActions?: any;
    exporter?: any;
}

const styles = createStyles({
    toolbar: {
        justifyContent: 'space-between',
    },
});

const ListToolbar = ({
    classes = {},
    filters,
    actions,
    bulkActions,
    exporter,
    ...rest
}): React.SFC<IProps> => (
    <Toolbar className={classes.toolbar}>
        {filters &&
            React.cloneElement(filters, {
                ...rest,
                context: 'form',
            })}
        <span />
        {actions &&
            React.cloneElement(actions, {
                ...rest,
                className: classes.actions,
                bulkActions,
                exporter,
                filters,
            })}
    </Toolbar>
);

export default withStyles(styles)(ListToolbar);
