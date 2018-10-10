import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

interface IProps extends WithStyles<typeof styles> {
    children: React.ReactElement<any>;
    className?: string;
    file?: File;
    onRemove: VoidFunction;
    revokeObjectURL?: VoidFunction;
}

const styles = (theme: Theme) => createStyles({
    removeButton: {},
    removeIcon: {
        color: theme.palette.accent1Color,
    },
});

export class FileInputPreview extends Component<IProps> {
    static propTypes = {
        children: PropTypes.element.isRequired,
        classes: PropTypes.object,
        className: PropTypes.string,
        file: PropTypes.object,
        onRemove: PropTypes.func.isRequired,
        revokeObjectURL: PropTypes.func,
    };

    static defaultProps = {
        file: undefined,
    };

    componentWillUnmount() {
        const { file, revokeObjectURL } = this.props;

        if (file.preview) {
            revokeObjectURL
                ? revokeObjectURL(file.preview)
                : window.URL.revokeObjectURL(file.preview);
        }
    }

    render() {
        const {
            children,
            classes = {},
            className,
            onRemove,
            revokeObjectURL,
            file,
            ...rest
        } = this.props;

        return (
            <div className={className} {...rest}>
                <IconButton className={classes.removeButton} onClick={onRemove}>
                    <RemoveCircle className={classes.removeIcon} />
                </IconButton>
                {children}
            </div>
        );
    }
}

FileInputPreview.propTypes = {
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    file: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
    revokeObjectURL: PropTypes.func,
};

FileInputPreview.defaultProps = {
    file: undefined,
};

export default withStyles(styles)(FileInputPreview);
