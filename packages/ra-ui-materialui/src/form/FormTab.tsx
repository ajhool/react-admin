import React, { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import classnames from 'classnames';
import { translate } from 'ra-core';

import FormInput from './FormInput';

const sanitizeRestProps = ({ label, icon, value, translate, ...rest }: any): any => rest;

const hiddenStyle = { display: 'none' } as CSSProperties;

interface IProps {
    className?: string;
    children?: React.ReactNode;
    context?: 'header' | 'content';
    hidden?: boolean;
    icon?: React.ReactElement<any>;
    label: string;
    path?: string;
    translate: any;
    value?: string;
}

class FormTab extends Component<IProps> {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        context: PropTypes.oneOf(['header', 'content']),
        hidden: PropTypes.bool,
        icon: PropTypes.element,
        label: PropTypes.string.isRequired,
        path: PropTypes.string,
        translate: PropTypes.func.isRequired,
        value: PropTypes.string,
    }

    displayName: string = 'FormTab';

    renderHeader = ({ className, label, icon, value, translate, ...rest }: IProps) => {
        const to = { pathname: value, state: { skipFormReset: true } };

        return (
            <MuiTab
                key={label}
                label={translate(label, { _: label })}
                value={value}
                icon={icon}
                className={classnames('form-tab', className)}
                component={Link}
                to={to}
                {...sanitizeRestProps(rest)}
            />
        );
    };

    renderContent = ({ children, hidden, ...rest }: IProps) => (
        <span style={hidden ? hiddenStyle : undefined}>
            {React.Children.map(
                children,
                input =>
                    input && (
                        <FormInput input={input} {...sanitizeRestProps(rest)} />
                    )
            )}
        </span>
    );

    render() {
        const { children, context, ...rest } = this.props;
        return context === 'header'
            ? this.renderHeader(rest)
            : this.renderContent({ children, ...rest });
    }
}

export default translate(FormTab);
