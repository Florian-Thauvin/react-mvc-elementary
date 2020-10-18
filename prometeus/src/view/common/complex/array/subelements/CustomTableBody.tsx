import React from 'react';
import { defaultModelField, IModelField } from '../../../../../model/common/ModelField';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getDeltaAttributes } from '../../../../../utils/FieldUtils';
import { ITableItem } from '../PrometeusWidgetTable';

interface inputProps {
    model: Array<ITableItem>,
    headers: Array<string>,
    onSelection: (element: ITableItem) => void
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

function getValidStyle(isValid: boolean){
    return isValid ? {backgroundColor: 'lightgreen'} : {backgroundColor: 'lightpink'};
}

function getSelectedStyle(isSelected: boolean){
    return  isSelected ? {border: '5px solid blue'} : {border: ''}
}

function CustomTableBody(props: inputProps): JSX.Element {
    const { model, headers } = props;

    return (
        <TableBody>
            {
                model.map((element: ITableItem) => {
                    const { model, isValid, isSelected } = element;
                    return (
                        <TableRow
                            key={model.key}
                            onClick={() => {props.onSelection(element)}}
                            style = {
                                {...getValidStyle(isValid), ...getSelectedStyle(isSelected)}                               
                            }
                        > 
                            {
                                getOrderedRows(model, headers).map((item: IModelField, index: number) => {
                                    return (
                                        item ? 
                                            <TableCell 
                                                key={`${model.key}_${index}`}
                                            >
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