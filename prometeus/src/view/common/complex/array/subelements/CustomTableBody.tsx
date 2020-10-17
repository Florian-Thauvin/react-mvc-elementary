import React from 'react';
import { defaultModelField, IModelField } from '../../../../../model/common/ModelField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getDeltaAttributes } from '../../../../../utils/FieldUtils';
import { ITableItem } from '../PrometeusWidgetTable';

interface inputProps {
    model: Array<ITableItem>,
    headers: Array<string>
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

    return (
        <TableBody>
            {
                model.map((element: ITableItem) => {
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