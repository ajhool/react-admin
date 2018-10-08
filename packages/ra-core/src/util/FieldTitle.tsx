import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';

import translate from '../i18n/translate';

interface IProps {
    resource: string;
    source: string;
    label?: string;
    isRequired?: boolean;
    translate: translate;
}

class FieldTitle extends PureComponent<IProps> {
    static propTypes = {
        isRequired: PropTypes.bool,
        resource: PropTypes.string,
        source: PropTypes.string,
        label: PropTypes.string,
        translate: PropTypes.func.isRequired,
    };

    static defaultTypes = {
        translate: (x: any) => x,
    };

    render(){
        const {
            resource,
            source,
            label,
            isRequired,
            translate,
        } = this.props;

        return (
            <span>
                {typeof label !== 'undefined'
                    ? translate(label, { _: label })
                    : typeof source !== 'undefined'
                        ? translate(`resources.${resource}.fields.${source}`, {
                              _: inflection.transform(source, [
                                  'underscore',
                                  'humanize',
                              ]),
                          })
                        : ''}
                {isRequired && ' *'}
            </span>
        );
    }
}

const enhance = compose(
    translate,
    pure
);

export default enhance(FieldTitle);
