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
    formulaireToOpen?: JSX.Element;
}

export interface ITableItem{
    model: IModelField,
    isSelected: boolean,
    errors: Array<EConstraintsType>,
    isValid: boolean
}

function createTableItem(element: IModelField): ITableItem {
    const errors: Array<EConstraintsType> = isValid(element);

    return {
        model: element,
        isSelected: false,
        errors: errors,
        isValid: errors.length === 0
    };
}

function convertModelToTableItems(model: Array<IModelField>): Array<ITableItem>{
    const converted: Array<ITableItem> = [];
    
    model.forEach((element: IModelField) => {
        converted.push(createTableItem(element));
    });

    return converted;
}

function generateDisplay(rowTable: Array<ITableItem>, headerToSearch: string, itemsToSearch: string, headerToSort: string, isAscending: boolean): Array<ITableItem>{
    const newDisplay: Array<ITableItem> = [];

    rowTable.forEach((element: ITableItem) => {
        const value = getValueFromFieldName(element.model, headerToSearch).value;

        if(value && value.toString().includes(itemsToSearch)){
            newDisplay.push(element);
        }
    });

    newDisplay.sort((a: ITableItem, b: ITableItem) => {
        let order: number = -1;
        const valueA: any = getValueFromFieldName(a.model, headerToSort).value;
        const valueB: any = getValueFromFieldName(b.model, headerToSort).value;

        if(isAscending){
            order = valueA > valueB ? -1 : 1;
        } else {
            order = valueA < valueB ? -1 : 1;
        }

        return order;
    });

    return newDisplay;
}

function PrometeusWidgetTable(props: inputProps): JSX.Element {
    const { model, headers } = props;
    const displayHeaders: string[] = headers ? headers : getDeltaAttributesNameFromModel(model[0]);

    const [values, setValues] = useState<Array<ITableItem>>(convertModelToTableItems(model));
    const [displayValues, setDisplayValues] = useState<Array<ITableItem>>(values);

    const [search, setSearch] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>(displayHeaders[0]);

    const [sort, setSort] = useState<string>(displayHeaders[0]);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(()=>{        
        setDisplayValues(generateDisplay(values, searchItem, search, sort, isAscending));
    }, [search, searchItem, values, sort, isAscending]);

    function onAdd(element: IModelField){
        const newValue = [...values, createTableItem(element)];
        setValues(newValue);
    }

    function onSelect(element: ITableItem){
        const newValue = [...values];

        newValue.forEach((item) => {
            if(item.model.key === element.model.key){
                item.isSelected = !item.isSelected;
            }
        });

        setValues(newValue);
    }

    function onSort(newSort: string, newIsAscending: boolean){
        setSort(newSort);
        setIsAscending(newIsAscending);
    }

    function onDelete(){
        const copyValues = [...values];
        const newValue: Array<ITableItem> = [];

        copyValues.forEach((item) => {
            if(!item.isSelected){
                newValue.push(item);
            }
        });

        setValues(newValue);
    }

    return (
        <div style = {
            {
                border: '3px solid black',
                padding: '5px'
            }
        }>
            <CustomTableControler 
                onNewSearch = {setSearch} 
                onItemChanged = {setSearchItem}
                headers = {displayHeaders}

                onAdd = {onAdd}
                formulaireToOpen = {props.formulaireToOpen}

                onDelete = {onDelete}
            />
            <Table>
                <CustomTableHeaders headers = {displayHeaders} onSort = {onSort}/>
                <CustomTableBody model = {displayValues} headers = {displayHeaders} onSelection = {onSelect}/>
            </Table>
        </div>
    );
}

export default PrometeusWidgetTable;