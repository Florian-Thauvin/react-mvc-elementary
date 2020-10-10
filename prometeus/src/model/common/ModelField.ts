import * as ModelObject from './ModelObject';
import { AbstractConstraint } from './ModelConstraints';
import * as Constraints from './ModelConstraints';

export interface IModelField extends ModelObject.IModelObject {
    labelKey: string,
    constraints?: AbstractConstraint
}

export interface IStringField extends IModelField {
    constraints: Constraints.IStringConstraint
}

export interface INumericField extends IModelField {
    constraints: Constraints.IStringConstraint
}

export function createField(naturalKey: string, objectType: string, parent?: string){
    return {
        ...ModelObject.createObject(objectType, naturalKey),
        labelKey: parent? `${parent}_${naturalKey}` : naturalKey
    };
}

