export interface IModelObject {
    key: string,
    type: string
}

export type PrimitiveType = number | string | boolean;

export function createObject(objectType: string, naturalKey?: string): IModelObject{
    return {
        key: `${objectType}_${naturalKey ? naturalKey : 'undefinedNaturalKey'}`,
        type: objectType
    };
}