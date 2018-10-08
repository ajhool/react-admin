import React from 'react';
import PropTypes from 'prop-types';
import { inflection } from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';

import translate from '../i18n/translate';

interface FieldTitle {
    resource: string;
    source: string;
    label?: string;
    isRequired?: boolean;
    translate: translate;
}

export const FieldTitle = ({
    resource,
    source,
    label,
    isRequired,
    translate,
}: FieldTitle) => (
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
    translate: x => x,
};

const enhance = compose(
    translate,
    pure
);

export default enhance(FieldTitle);
