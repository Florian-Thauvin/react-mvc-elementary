import React, {useState} from 'react';
import { defaultModelField, IModelField } from '../../../../../model/common/ModelField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDeltaAttributes } from '../../../../../utils/FieldUtils';
import isValid from '../../../../../utils/validation/GenericValidation';
import { EConstraintsType } from '../../../../../model/common/ModelConstraints';
import { valueToNode } from '@babel/types';

interface inputProps {
    model: Array<IModelField>,
    headers: Array<string>
}

interface ITableItem{
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

function getOrderedRows(element: IModelField, headers: Array<string>): Array<IModelField> {
    const attributes:  Map<string, any> = getDeltaAttributes(element, defaultModelField);
    const rows: Array<IModelField> = [];

    headers.forEach((header) => {
        if(attributes.has(header)){
            rows.push(attributes.get(header));
        }
    });
    return rows;
}

function CustomTableBody(props: inputProps): JSX.Element {
    const { model, headers } = props;

    const [values, setValues] = useState(convertModelToTableItems(model));
    const [displayValues, setDisplayValues] = useState(values);

    return (
        <TableBody>
            {
                displayValues.map((element: ITableItem) => {
                    const { model, isValid } = element;
                    return (
                        <TableRow key={model.key}> 
                            {
                                getOrderedRows(model, headers).map((item: IModelField, index: number) => {
                                    return (
                                        item ? 
                                            <TableCell 
                                                key={`${model.key}_${index}`}
                                                style = {isValid ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}}>
                                                    {item.value.value}
                                            </TableCell>
                                            :  <TableCell key={`${model.key}_${index}`}></TableCell>
                                    );
                                })
                            }
                        </TableRow>   
                    );
                })
            }
        </TableBody>
    );
}

export default CustomTableBody;