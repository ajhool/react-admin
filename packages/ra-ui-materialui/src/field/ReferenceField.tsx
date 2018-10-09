import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { ReferenceFieldController } from 'ra-core';

import LinearProgress from '../layout/LinearProgress';
import Link from '../Link';
import sanitizeRestProps from './sanitizeRestProps';

interface IProps extends WithStyles<typeof styles> {
    allowEmpty?: boolean;
    basePath?: string;
    children?: ReactElement;
    className?: string;
    classes?: any;
    isLoading?: boolean;
    record?: any;
    reference?: string;
    referenceRecord?: any;
    resource?: string;
    resourceLinkPath?: string | boolean;
    source?: string;
    translateChoice?: boolean;
}

const styles = (theme: Theme) => createStyles({
    link: {
        color: theme.palette.primary.main,
    },
});

export const ReferenceFieldView: React.SFC<IProps> = ({
    allowEmpty,
    basePath,
    children,
    className,
    classes = {},
    isLoading,
    record,
    reference,
    referenceRecord,
    resource,
    resourceLinkPath,
    source,
    translateChoice = false,
    ...rest
}) => {
    if (isLoading) {
        return <LinearProgress />;
    }

    if (resourceLinkPath) {
        return (
            <Link to={resourceLinkPath} className={className}>
                {React.cloneElement(children, {
                    className: classnames(
                        children.props.className,
                        classes.link // force color override for Typography components
                    ),
                    record: referenceRecord,
                    resource: reference,
                    allowEmpty,
                    basePath,
                    translateChoice,
                    ...sanitizeRestProps(rest),
                })}
            </Link>
        );
    }

    return React.cloneElement(children, {
        record: referenceRecord,
        resource: reference,
        allowEmpty,
        basePath,
        translateChoice,
        ...sanitizeRestProps(rest),
    });
};

ReferenceFieldView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    reference: PropTypes.string,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string,
    resourceLinkPath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    source: PropTypes.string,
    translateChoice: PropTypes.bool,
};

/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
interface IControllerProps extends WithStyles<typeof styles> {
    addLabel?: boolean;
    allowEmpty: boolean;
    basePath: string;
    children: ReactChildren;
    className?: string;
    cellClassName?: string;
    headerClassName?: string;
    label?: string;
    record?: any;
    reference: string;
    resource?: string;
    sortBy?: string;
    source: string;
    translateChoice?: VoidFunction;
    linkType: string | boolean;
}

const ReferenceField: React.SFC<IControllerProps> = ({ children, ...props }) => {
    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }

    return (
        <ReferenceFieldController {...props}>
            {controllerProps => (
                <ReferenceFieldView
                    {...props}
                    {...{ children, ...controllerProps }}
                />
            )}
        </ReferenceFieldController>
    );
};

ReferenceField.propTypes = {
    addLabel: PropTypes.bool,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    translateChoice: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
};

ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {},
};

const EnhancedReferenceField = withStyles(styles)(ReferenceField);

EnhancedReferenceField.defaultProps = {
    addLabel: true,
};

export default EnhancedReferenceField;
