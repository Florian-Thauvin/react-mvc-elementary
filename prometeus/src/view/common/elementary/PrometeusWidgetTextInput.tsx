import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import ErrorForm from '../generics/ErrorForm';

import * as ModelField from '../../../model/common/ModelField';
import { isValid } from '../../../utils/validation/StringValidation';
import { EConstraintsType } from '../../../model/common/ModelConstraints';

interface inputProps {
    field: ModelField.IStringField,
    onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void
 }

function PrometeusWidgetTextInput(props: inputProps): JSX.Element {
    
    const { field } = props;
    const { constraints } = field;

    const [value, setValue] = useState<string>(field.defaultValue ? field.defaultValue : '');
    const [errors, setErrors] = useState<Array<EConstraintsType>>(isValid(constraints, value));

    useEffect(() => {
        setErrors(isValid(constraints, value));
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
                onChange = { props.onChange ? props.onChange : undefined }
                helperText = { ErrorForm({errors}) }
            />
        </>
    );
}

export default PrometeusWidgetTextInput;