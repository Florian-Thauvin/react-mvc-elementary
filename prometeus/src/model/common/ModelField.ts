import * as ModelObject from './ModelObject';
import { AbstractConstraint } from './ModelConstraints';
import * as Constraints from './ModelConstraints';

export const defaultModelField = createField(ModelObject.EObjectType.NUMBER, [{name : ''}]);

export interface IModelField extends ModelObject.IModelObject {
    labelKey: string,
    defaultValue?: any,
    constraints?: AbstractConstraint,
    value?: any
}

export interface IStringField extends IModelField {
    constraints: Constraints.IStringConstraint,
    defaultValue?: string,
    inputType: string,
    value?: string
}

export interface INumericField extends IModelField {
    constraints: Constraints.IStringConstraint,
    defaultValue?: number,
    value?: number
}

export function createField(objectType: ModelObject.EObjectType, naturalKey: Array<ModelObject.INaturalKey>, parent?: string): IModelField {
    const stringNaturalKey = ModelObject.getNaturalValuesToString(naturalKey);

    return {
        ...ModelObject.createObject(objectType, naturalKey),
        labelKey: parent? `${parent}_${stringNaturalKey}` : stringNaturalKey
    };
}
