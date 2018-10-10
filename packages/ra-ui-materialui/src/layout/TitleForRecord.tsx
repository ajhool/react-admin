import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';

interface IProps {
    defaultTitle?: any;
    record?: any;
    title?: any;
}

const TitleForRecord: React.SFC<IProps> = ({ defaultTitle, record, title }) =>
    record ? (
        <Title title={title} record={record} defaultTitle={defaultTitle} />
    ) : (
        ''
    );

TitleForRecord.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any,
};

export default TitleForRecord;
