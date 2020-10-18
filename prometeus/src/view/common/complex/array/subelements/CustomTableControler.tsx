import React, {useState} from 'react';
import { IStringField, EStringInputType, IModelField } from '../../../../../model/common/ModelField';
import { EObjectType } from '../../../../../model/common/ModelObject';
import PrometeusWidgetTextInput from '../../../elementary/PrometeusWidgetTextInput';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/icons/Add';

import * as Personne from '../../../../../model/specific/Personne';

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

    onAdd: (element: IModelField) => void,
    formulaireToOpen?: JSX.Element;

    onDelete: () => void,

    headers: Array<string>
}

export function CustomTableControler(props: inputProps): JSX.Element {
    const [value, setValue] = useState(props.headers[0]);
    const [showForm, setShowForm] = useState(false);

    function onItemChanged(e: React.ChangeEvent<any>){
        const newValue: string = e.target.value;
        setValue(newValue)
        props.onItemChanged(newValue);
    }

    function changeForm(){
        let isShow = showForm;
        setShowForm(!isShow);
    }

    function onAdd(){
        setShowForm(false);
        props.onAdd(Personne.generate());
    }

    return (
        <div key = {'table_controller'} style = {{
            display: 'flex',           
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange = {onItemChanged}
            >
                {
                    props.headers.map((element) => {
                        return <MenuItem key = {element} value = {element}>{element}</MenuItem>   
                    })
                }
            </Select>
            <PrometeusWidgetTextInput field = {inputField} onChange = {(e) => {props.onNewSearch(e.target.value)}}/>

            <div style = {
                {    
                    width: '80px',
                    display: 'flex',
                    justifyContent: 'space-around',
                }
            }>
                <DeleteIcon onClick={props.onDelete}/>
                <Icon className="fa fa-plus-circle" onClick={changeForm}>add_circle</Icon>
                {
                    showForm ? 
                        <div onClick = {onAdd}>
                            {props.formulaireToOpen} 
                        </div>
                        : undefined
                }
            </div>
        </div>
    );
}

export default CustomTableControler;