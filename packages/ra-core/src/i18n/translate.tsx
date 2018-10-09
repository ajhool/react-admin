import React, { Component, StatelessComponent } from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import warning from '../util/warning';

type IBaseComponentProps = any;

export interface IBaseComponent extends StatelessComponent<IBaseComponentProps> {
    defaultProps: {
        translate: any;
    }
}

/**
 * Higher-Order Component for getting access to the `translate` function in props.
 *
 * Requires that the app is decorated by the <TranslationPRovider> to inject
 * the translation dictionaries and function in the context.
 *
 * @example
 *     import React from 'react';
 *     import { translate } from 'react-admin';
 *
 *     const MyHelloButton = ({ translate }) => (
 *         <button>{translate('myroot.hello.world')}</button>
 *     );
 *
 *     export default translate(MyHelloButton);
 *
 * @param {*} BaseComponent The component to decorate
 */
const translate = (BaseComponent: IBaseComponent) => {
    warning(
        typeof BaseComponent === 'string',
        `The translate function is a Higher Order Component, and should not be called directly with a translation key. Use the translate function passed as prop to your component props instead:

const MyHelloButton = ({ translate }) => (
    <button>{translate('myroot.hello.world')}</button>
);`
    );

    const { translate, ...defaultProps } = BaseComponent.defaultProps || {};

    class TranslatedComponent extends Component {
        static defaultProps = defaultProps;
        static contextTypes = {
            translate: PropTypes.func.isRequired,
            locale: PropTypes.string.isRequired,
        }
        static displayName: string = wrapDisplayName(
            BaseComponent,
            'translate'
        );

        render() {
            const props = { ...this.context, ...this.props };
            return <BaseComponent {...props} />;
        }
    }

    return TranslatedComponent;
};

export default translate;
