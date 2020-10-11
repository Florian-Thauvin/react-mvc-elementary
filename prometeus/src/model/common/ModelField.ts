import * as ModelObject from './ModelObject';
import { AbstractConstraint } from './ModelConstraints';
import * as Constraints from './ModelConstraints';

export interface IModelField extends ModelObject.IModelObject {
    labelKey: string,
    defaultValue?: any,
    constraints?: AbstractConstraint
}

export interface IStringField extends IModelField {
    constraints: Constraints.IStringConstraint,
    defaultValue?: string,
    inputType: string
}

export interface INumericField extends IModelField {
    constraints: Constraints.IStringConstraint,
    defaultValue?: number
}

export function createField(naturalKey: string, objectType: string, parent?: string){
    return {
        ...ModelObject.createObject(objectType, naturalKey),
        labelKey: parent? `${parent}_${naturalKey}` : naturalKey
    };
}

