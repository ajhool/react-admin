import React from 'react';
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
    translate: typeof translate;
}

const FieldTitle: React.SFC<IProps> = ({
    resource,
    source,
    label,
    isRequired,
    translate,
}) => (
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

FieldTitle.propTypes = {
    isRequired: PropTypes.bool,
    resource: PropTypes.string,
    source: PropTypes.string,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

FieldTitle.defaultProps = {
    translate: (x: any) => x,
};

const enhance = compose(
    translate,
    pure
);

export default enhance(FieldTitle);
