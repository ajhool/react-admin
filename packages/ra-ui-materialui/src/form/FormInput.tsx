import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

import Labeled from '../input/Labeled';

const sanitizeRestProps = ({ basePath, record, ...rest }: any): any => rest;

const styles = (theme: Theme) => createStyles({
    input: { width: theme.spacing.unit * 32 },
});

interface IProps extends WithStyles<typeof styles> {
    className: string;
    input: any;
}

const FormInput: React.SFC<IProps> = ({ classes, input, ...rest }) => {
    return input ? (
        <div
            className={classnames(
                'ra-input',
                `ra-input-${input.props.source}`,
                input.props.formClassName
            )}
        >
            {input.props.addLabel ? (
                <Labeled
                    id={input.props.id || input.props.source}
                    {...input.props}
                    {...sanitizeRestProps(rest)}
                >
                    {React.cloneElement(input, {
                        className: classnames(
                            {
                                [classes.input]: !input.props.fullWidth,
                            },
                            input.props.className
                        ),
                        id: input.props.id || input.props.source,
                        ...rest,
                    })}
                </Labeled>
            ) : (
                React.cloneElement(input, {
                    className: classnames(
                        {
                            [classes.input]: !input.props.fullWidth,
                        },
                        input.props.className
                    ),
                    id: input.props.id || input.props.source,
                    ...rest,
                })
            )}
        </div>
    ) : null;
}

FormInput.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    input: PropTypes.object,
}

export default withStyles(styles)(FormInput);
