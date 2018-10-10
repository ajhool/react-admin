import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';

import TextInput from './TextInput';

interface IProps extends WithStyles<typeof searchFilterStyles> {
    translate: any;
}

const searchFilterStyles = createStyles({
    input: {
        marginTop: 32,
    },
});

const SearchInput: React.SFC<IProps> = ({ classes, translate, ...props }) => (
    <TextInput
        label={false}
        placeholder={translate('ra.action.search')}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon color="disabled" />
                </InputAdornment>
            ),
        }}
        className={classes.input}
        {...props}
    />
);

SearchInput.propTypes = {
    classes: PropTypes.object,
    translate: PropTypes.func,
};

const enhance = compose<IProps, {}>(
    translate,
    withStyles(searchFilterStyles)
);

export default enhance(SearchInput);
