import React from 'react';
import ChipInput from './material-ui-chip-input';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof chipInputStyles> {
    
}

const chipInputStyles = createStyles({
    label: {
        top: 18,
    },
    labelShrink: {
        top: 8,
    },
    chipContainer: {
        alignItems: 'center',
        display: 'flex',
        minHeight: 50,
    },
});

const AutocompleteArrayInputChip: React.SFC<IProps> = props => <ChipInput {...props} />;

export default withStyles(chipInputStyles)(AutocompleteArrayInputChip);
