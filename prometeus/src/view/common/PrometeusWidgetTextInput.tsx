import React, { FormEvent, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import * as ModelField from '../../model/common/ModelField';
import isValid from '../../utils/validation/StringValidation';
import { EConstraintsType } from '../../model/common/ModelConstraints';

export interface inputProps {
    field: ModelField.IStringField
}

function PrometeusWidgetTextInput(props: inputProps): JSX.Element {
    
    const { field } = props;
    const { constraints } = field;

    const [value, setValue] = useState<string>(field.defaultValue ? field.defaultValue : '');
    const [errors, setErrors] = useState<Array<EConstraintsType>>(isValid(constraints, value));

    useEffect(() => {
        setErrors(isValid(constraints, value));
        console.log(`New value detected: ${value}, errors: ${errors}`);
    }, [value]);

    return (
        <>
            <TextField 
                label = {field.labelKey}
                error = {errors.length !== 0}
                required = {constraints.isMandatory}
                id = {`${field.key}_value`} 
                type = {field.inputType ? field.inputType : 'text'}
                defaultValue = {value}
                onChange = {(e : React.ChangeEvent<HTMLInputElement>) => {setValue(e.target.value)}}
            />
        </>
    );
}

export default PrometeusWidgetTextInput;