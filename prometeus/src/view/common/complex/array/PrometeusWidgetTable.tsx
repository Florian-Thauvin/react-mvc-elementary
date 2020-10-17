import React, {useEffect, useState} from 'react';

import { IModelField } from '../../../../model/common/ModelField';

import Table from '@material-ui/core/Table';

import CustomTableControler from './subelements/CustomTableControler';
import CustomTableHeaders from './subelements/CustomTableHeaders';
import CustomTableBody from './subelements/CustomTableBody';

import { getDeltaAttributesNameFromModel } from '../../../../utils/FieldUtils';
import { EConstraintsType } from '../../../../model/common/ModelConstraints';
import isValid from '../../../../utils/validation/GenericValidation';
import { getValueFromFieldName } from '../../../../utils/FieldUtils';

export interface inputProps {
    model: Array<IModelField>;
    headers?: Array<string>;
}

export interface ITableItem{
    model: IModelField,
    isSelected: boolean,
    errors: Array<EConstraintsType>,
    isValid: boolean
}

function convertModelToTableItems(model: Array<IModelField>): Array<ITableItem>{
    const converted: Array<ITableItem> = [];
    
    model.forEach((element: IModelField) => {
        const errors: Array<EConstraintsType> = isValid(element);

        converted.push({
            model: element,
            isSelected: false,
            errors: errors,
            isValid: errors.length === 0
        });
    });

    return converted;
}

function PrometeusWidgetTable(props: inputProps): JSX.Element {
    const { model, headers } = props;
    const displayHeaders: string[] = headers ? headers : getDeltaAttributesNameFromModel(model[0]);

    const [values, setValues] = useState<Array<ITableItem>>(convertModelToTableItems(model));
    const [displayValues, setDisplayValues] = useState<Array<ITableItem>>(values);

    const [search, setSearch] = useState('');
    const [searchItem, setSearchItem] = useState (displayHeaders[0]);

    useEffect(()=>{
        const newDisplay: Array<ITableItem> = [];

        values.forEach((element: ITableItem) => {
            const value = getValueFromFieldName(element.model, searchItem).value;
            console.log(value)
            if(value && value.toString().includes(search)){
                newDisplay.push(element);
            }
        });
        
        setDisplayValues(newDisplay);
    }, [search, searchItem]);

    return (
        <>
            <CustomTableControler onNewSearch = {setSearch} onItemChanged = {setSearchItem} headers = {displayHeaders}/>
            <Table>
                <CustomTableHeaders headers = {displayHeaders}/>
                <CustomTableBody model = {displayValues} headers = {displayHeaders}/>
            </Table>
        </>
    );
}

export default PrometeusWidgetTable;