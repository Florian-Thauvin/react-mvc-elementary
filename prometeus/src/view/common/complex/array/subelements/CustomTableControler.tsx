import React, {useState} from 'react';
import { IStringField, EStringInputType } from '../../../../../model/common/ModelField';
import { EObjectType } from '../../../../../model/common/ModelObject';
import PrometeusWidgetTextInput from '../../../elementary/PrometeusWidgetTextInput';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const inputField: IStringField = {
    key: 'search',
    type: EObjectType.STRING,
    naturalKeysFields: ['search'],
    labelKey: 'search',
    inputType: EStringInputType.SEARCH,
    constraints: {
        isMandatory: false
    }
}

interface inputProps {
    onNewSearch: (search: string) => void,
    onItemChanged: (search: string) => void,
    headers: Array<string>
}

interface IChangeValue {
    name?: string | undefined;
    value: string;
}

export function CustomTableControler(props: inputProps): JSX.Element {
    const [value, setValue] = useState(props.headers[0]);

    function onItemChanged(e: React.ChangeEvent<any>){
        const newValue: string = e.target.value;
        setValue(newValue)
        props.onItemChanged(newValue);
    }

    return (
        <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange = {onItemChanged}
            >
                {
                    props.headers.map((element) => {
                        return <MenuItem value = {element}>{element}</MenuItem>   
                    })
                }
            </Select>
            <PrometeusWidgetTextInput field = {inputField} onChange = {(e) => {props.onNewSearch(e.target.value)}}/>
        </>
    );
}

export default CustomTableControler;