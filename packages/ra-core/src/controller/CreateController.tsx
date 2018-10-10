import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { parse } from 'query-string';

import translate from '../i18n/translate';
import { crudCreate as crudCreateAction } from '../actions';

interface IProps {
    basePath: string;
    children: any;
    crudCreate: any;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    isLoading: boolean;
    location: any;
    match: any;
    record?: any;
    resource: string;
    title?: any;
    translate: any;
}

/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostCreate } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
export class CreateController extends Component<IProps> {
    record: any;

    static propTypes = {
        basePath: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        crudCreate: PropTypes.func.isRequired,
        hasCreate: PropTypes.bool,
        hasEdit: PropTypes.bool,
        hasList: PropTypes.bool,
        hasShow: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        record: PropTypes.object,
        resource: PropTypes.string.isRequired,
        title: PropTypes.any,
        translate: PropTypes.func.isRequired,
    };

    static defaultProps = {
        record: {} as any,
    };

    constructor(props: Readonly<IProps>) {
        super(props);
        const {
            location: { state, search },
            record,
        } = this.props;
        this.record =
            state && state.record
                ? state.record
                : search
                    ? parse(search)
                    : record;
    }

    defaultRedirectRoute() {
        const { hasShow, hasEdit } = this.props;
        if (hasEdit) return 'edit';
        if (hasShow) return 'show';
        return 'list';
    }

    save = (record: any, redirect: string) => {
        this.props.crudCreate(
            this.props.resource,
            record,
            this.props.basePath,
            redirect
        );
    };

    render() {
        const {
            basePath,
            children,
            isLoading,
            resource,
            translate,
        } = this.props;

        if (!children) return null;

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('ra.page.create', {
            name: `${resourceName}`,
        });
        return children({
            isLoading,
            defaultTitle,
            save: this.save,
            resource,
            basePath,
            record: this.record,
            redirect: this.defaultRedirectRoute(),
            translate,
        });
    }
}

interface IState {
    isLoading: number;
    [rest: string]: any;
}

function mapStateToProps(state: IState) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

export default compose<IProps, {}>(
    connect(
        mapStateToProps,
        { crudCreate: crudCreateAction }
    ),
    translate
)(CreateController);
