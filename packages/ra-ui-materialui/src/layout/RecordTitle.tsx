import React from 'react';
import PropTypes from 'prop-types';
import TitleDeprecated from './TitleDeprecated';

interface IProps {
    defaultTitle?: any;
    record?: any;
    title?: any;
}

/**
 * @deprecated Use TitleForRecord instead
 */
const RecordTitle: TitleDeprecated | '' = ({ defaultTitle, record, title }: IProps) =>
    record ? (
        <TitleDeprecated
            title={title}
            record={record}
            defaultTitle={defaultTitle}
        />
    ) : (
        ''
    );

RecordTitle.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any,
};

export default RecordTitle;
