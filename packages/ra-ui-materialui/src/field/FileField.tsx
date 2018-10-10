import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from 'ra-ui-materialui/src/field/sanitizeRestProps';

interface IProps extends WithStyles<typeof styles> {
    addLabel?: boolean;
    basePath?: string;
    classes?: object;
    className?: string;
    cellClassName?: string;
    headerClassName?: string;
    record?: PropTypes.object;
    sortBy?: string;
    source: string;
    src?: string;
    title?: string;
    target?: string;
}

const styles = createStyles({
    root: { display: 'inline-block' },
});

export const FileField = ({
    classes = {},
    className,
    record,
    source,
    title,
    src,
    target,
    ...rest
}): React.SFC<IProps> => {
    const sourceValue = get(record, source);

    if (!sourceValue) {
        return (
            <div
                className={classnames(classes.root, className)}
                {...sanitizeRestProps(rest)}
            />
        );
    }

    if (Array.isArray(sourceValue)) {
        return (
            <ul
                className={classnames(classes.root, className)}
                {...sanitizeRestProps(rest)}
            >
                {sourceValue.map((file, index) => {
                    const titleValue = get(file, title) || title;
                    const srcValue = get(file, src) || title;

                    return (
                        <li key={index}>
                            <a
                                href={srcValue}
                                title={titleValue}
                                target={target}
                            >
                                {titleValue}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const titleValue = get(record, title) || title;

    return (
        <div
            className={classnames(classes.root, className)}
            {...sanitizeRestProps(rest)}
        >
            <a href={sourceValue} title={titleValue} target={target}>
                {titleValue}
            </a>
        </div>
    );
};

FileField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
};

export default withStyles(styles)(FileField);
