import React from 'react';

import { IModelField } from '../../../../model/common/ModelField';

import Table from '@material-ui/core/Table';

import CustomTableControler from './subelements/CustomTableControler';
import CustomTableHeaders from './subelements/CustomTableHeaders';
import CustomTableBody from './subelements/CustomTableBody';

import {getDeltaAttributesNameFromModel} from '../../../../utils/FieldUtils';

export interface inputProps {
    model: Array<IModelField>;
    headers?: Array<string>;
}

function PrometeusWidgetTable(props: inputProps): JSX.Element {

    const { model, headers } = props;

    const displayHeaders: string[] = headers ? headers : getDeltaAttributesNameFromModel(model[0]);

    return (
        <Table>
            <CustomTableHeaders headers = {displayHeaders}/>
            <CustomTableBody model = {model} headers = {displayHeaders}/>
        </Table>
    );
}

export default PrometeusWidgetTable;