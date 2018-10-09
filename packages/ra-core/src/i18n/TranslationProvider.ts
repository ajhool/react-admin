import { Children, ReactChildren, Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import { compose, withContext } from 'recompose';
import defaultMessages from 'ra-language-english';
import { defaultsDeep } from 'lodash';

interface ITranslationProviderArgs {
    children: ReactChildren;
    locale: string;
    messages: any;
}

type ITranslationProvider = ReactElement<ITranslationProviderArgs>;

interface IProps {
    locale: string;
    messages: object;
    children: ReactChildren;
}

interface IState {
    locale: string;
    messages: object;
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
const TranslationProvider = ({ children }: IProps) => Children.only(children) as ITranslationProvider;

TranslationProvider.propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    children: PropTypes.element,
};

// i18n Does not care what other fields are in the root state.. but the RootState MUST have an i18n field.
interface IRootState {
    i18n: IState;
    [others: string]: any;
}

const mapStateToProps = ({ i18n }: IRootState) => ({
    locale: i18n.locale,
    messages: i18n.messages,
});

interface IWithI18NContextResult {
    locale: string;
    translate: Polyglot;
}

const withI18nContext = withContext(
    {
        translate: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
    },
    ({ locale, messages = {} }: IProps): IWithI18NContextResult => {
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
