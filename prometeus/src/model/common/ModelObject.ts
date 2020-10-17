export enum EObjectType {
    STRING = 'string',
    NUMBER = 'number',
    PROMETEUS_OBJECT = 'prometeus_object'
}

export interface IModelObject {
    key: string,
    type: EObjectType,
    naturalKeysFields: Array<string>
}

export type PrimitiveType = number | string | boolean;

export interface INaturalKey {
    name: string, 
    value?: any
}

export function getNaturalValuesToString(naturalKey: Array<INaturalKey>) : string {
    const values: Array<string> = [];

    naturalKey.forEach((element: INaturalKey) => {
        values.push(element.value ? element.value : 'undefined');
    });

    return values.join('_');
}

export function createObject(objectType: EObjectType, naturalKeys: Array<INaturalKey>): IModelObject {
    return {
        key: `${naturalKeys ? getNaturalValuesToString(naturalKeys) : 'undefinedNaturalKey'}`,
        type: objectType,
        naturalKeysFields: Object.keys(naturalKeys)
    };
}
