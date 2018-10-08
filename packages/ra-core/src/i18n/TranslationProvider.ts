import { Children, ReactChildren } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import { compose, withContext } from 'recompose';
import defaultMessages from 'ra-language-english';
import { defaultsDeep } from 'lodash';

interface TranslationProviderArgs {
    children: ReactChildren;
}

interface IProps {
    locale: string;
    messages: Object;
    children: ReactChildren;
}

interface IState {
    locale: string;
    messages: Object;
}

/**
 * Creates a translation context, available to its children
 *
 * Must be called withing a Redux app.
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
const TranslationProvider = ({ children }: IProps) => Children.only(children);

TranslationProvider.propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    children: PropTypes.element,
};

const mapStateToProps = state => ({
    locale: state.i18n.locale,
    messages: state.i18n.messages,
});

interface WithI18NContextResult {
    locale: string;
    translate: Polyglot;
}

const withI18nContext = withContext(
    {
        translate: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
    },
    ({ locale, messages = {} }: Props): WithI18NContextResult => {
        const polyglot = new Polyglot({
            locale,
            phrases: defaultsDeep({}, messages, defaultMessages),
        });

        return {
            locale,
            translate: polyglot.t.bind(polyglot),
        };
    }
);

export default compose(
    connect(mapStateToProps),
    withI18nContext
)(TranslationProvider);
