import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import { addField } from 'react-admin';

// tslint:disable-next-line:no-implicit-dependencies
import { FormControl, FormHelperText } from '@material-ui/core';
// tslint:disable-next-line:no-implicit-dependencies
import { withStyles, createStyles } from '@material-ui/core/styles';

import styles from './styles';

interface IRichTextInputProps {
    addLabel: boolean;
    input?: HTMLInputElement;
    meta: {
        error?: boolean;
        helperText?: string;
    }
    options?: object;
    source?: string;
    toolbar?: any[] | boolean;
    fullWidth?: boolean;
    label?: string;
    classes?: object;
}

export class RichTextInput extends Component<IRichTextInputProps> {
    static propTypes = {
        addLabel: PropTypes.bool.isRequired,
        classes: PropTypes.object,
        input: PropTypes.object.isRequired,
        label: PropTypes.string,
        meta: PropTypes.object,
        options: PropTypes.object,
        source: PropTypes.string,
        toolbar: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
        fullWidth: PropTypes.bool,
    };

    static defaultProps = {
        addLabel: true,
        options: {},
        record: {},
        toolbar: true,
        fullWidth: true,
    };

    quill?: Quill | null;

    // Possibly bad typing in the underlying code. divRef should not have the querySelector Param.
    divRef?: HTMLDivElement;
    editor?: any;

    componentDidMount() {
        const {
            input: { value } = { value: ''},
            toolbar,
        } = this.props;

        this.quill = new Quill(this.divRef!, {
            modules: { toolbar },
            theme: 'snow',
        });

        this.quill!.setContents(this.quill!.clipboard.convert(value));

        this.editor = this.divRef!.querySelector('.ql-editor');
        this.quill!.on('text-change', debounce(this.onTextChange, 500));
    }

    componentWillUnmount() {
        this.quill!.off('text-change', this.onTextChange);
        this.quill = null;
    }

    onTextChange = () => {
        const value =
            this.editor.innerHTML === '<p><br></p>' ? '' : this.editor.innerHTML;
        // TODO:onChange or onchange. Possibly casing issue.
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        this.props.input && this.props.input.onChange(value);
    };

    updateDivRef = (ref: HTMLDivElement) => {
        this.divRef = ref;
    };

    render() {
        const { error = false, helperText = '' } = this.props.meta;

        return (
            <FormControl
                error={error}
                fullWidth={this.props.fullWidth}
                className="ra-rich-text-input"
            >
                <div ref={this.updateDivRef} />
                {error && <FormHelperText error={error}/>}
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        );
    }
}

// @ts-ignore
const RichRextInputWithField = addField(withStyles(createStyles(styles))(RichTextInput));

RichRextInputWithField.defaultProps = {
    addLabel: true,
    fullWidth: true,
};
export default RichRextInputWithField;
