import React, {useState} from 'react';

import { IModelField } from '../../../../model/common/ModelField';

import Table from '@material-ui/core/Table';

import CustomTableControler from './subelements/CustomTableControler';
import CustomTableHeaders from './subelements/CustomTableHeaders';
import CustomTableBody from './subelements/CustomTableBody';

import { getDeltaAttributesNameFromModel } from '../../../../utils/FieldUtils';
import { EConstraintsType } from '../../../../model/common/ModelConstraints';
import isValid from '../../../../utils/validation/GenericValidation';

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

        console.log("Table errors : " + errors);

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

    const [values, setValues] = useState(convertModelToTableItems(model));
    const [displayValues, setDisplayValues] = useState(values);

    return (
        <Table>
            <CustomTableHeaders headers = {displayHeaders}/>
            <CustomTableBody model = {displayValues} headers = {displayHeaders}/>
        </Table>
    );
}

export default PrometeusWidgetTable;