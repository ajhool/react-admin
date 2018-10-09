import React, { cloneElement, Children, Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

export interface IProps extends WithStyles<typeof styles> {
    basePath: string;
    children?: ReactNode;
    record: any;
    resource: string;
}

const styles = (theme: Theme) => createStyles({
    root: {
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: theme.spacing.unit * 4,
    },
});

export class NodeActions extends Component<IProps> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        basePath: PropTypes.string.isRequired,
        children: PropTypes.node,
        record: PropTypes.object.isRequired,
        resource: PropTypes.string.isRequired,
    };

    render() {
        const { children, classes, ...props } = this.props;
        return (
            <span className={classes.root}>
                {Children.map(
                    children,
                    action => (action ? cloneElement(action, props) : null)
                )}
            </span>
        );
    }
}

export default withStyles(styles)(NodeActions);
