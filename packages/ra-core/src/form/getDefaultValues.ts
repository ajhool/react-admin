import { createSelector } from 'reselect';
import { IRootState } from 'ra-core/src/reducer';

const getDefaultValues = (data = {}, defaultValue = {}, defaultValues = {}) => {
    const globalDefaultValue =
        typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    return { ...globalDefaultValue, ...defaultValues, ...data };
};

const getRecord = (_: IRootState, props: any) => props.record;
const getDefaultValue = (_: IRootState, props: any) => props.defaultValue;
const getDefaultValuesFromState = (state: IRootState) => state.admin.record;

export default createSelector(
    getRecord,
    getDefaultValue,
    getDefaultValuesFromState,
    (record, defaultValue, defaultValues) =>
        getDefaultValues(record, defaultValue, defaultValues)
);
