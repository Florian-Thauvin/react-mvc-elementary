import { IModelField, defaultModelField } from '../model/common/ModelField';
import { IModelObject } from '../model/common/ModelObject';

export function getAttributesNameFromObject(object: IModelObject): Array<string>{
    return Object.keys(Object.getOwnPropertyDescriptors(object));
}

export function getAttributesValuesFromObject(object: IModelObject): Array<any>{
    return Object.values(Object.getOwnPropertyDescriptors(object));
}

function getDelta(object: Array<any>, reference: Array<any>) : Array<any>{
    return object.filter((element: any) => {
        return reference.indexOf(element) === -1;
    });
}

export function getDeltaAttributesNameFromModel(objectToDisplay: IModelField): Array<string> {
    const objectAttributes: Array<string> = getAttributesNameFromObject(objectToDisplay);
    const defaultAttributes: Array<string> = getAttributesNameFromObject(defaultModelField);

    return getDelta(objectAttributes, defaultAttributes);
}

export function getDeltaAttributes(objectToDisplay: IModelField, referenceObject: IModelField): Map<string, any> {
    const objectAttributes = Object.getOwnPropertyDescriptors(objectToDisplay);    
    const defaultAttributes: Array<string> = getAttributesNameFromObject(referenceObject);
    const naturalKeys: Map<string, any> = new Map();

    for(const [key, value] of Object.entries(objectAttributes)) {
        if(defaultAttributes.indexOf(key) === -1){
            naturalKeys.set(key, value);
        }
    }

    return naturalKeys;
}

export function getValueFromFieldName(objectToDisplay: IModelField, fieldName: string): any{
    const objectAttributes = Object.getOwnPropertyDescriptors(objectToDisplay);
    let gettedItem: any = null;

    for(const [key, value] of Object.entries(objectAttributes)) {
        console.log(key)
        if(key === fieldName){
            gettedItem = value;
            break;
        }
    }

    return gettedItem.value;
}