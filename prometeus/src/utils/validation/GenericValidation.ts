import { IModelField, defaultModelField } from '../../model/common/ModelField';
import { EObjectType, IModelObject } from '../../model/common/ModelObject';
import { EConstraintsType } from '../../model/common/ModelConstraints';

import { getDeltaAttributes } from '../../utils/FieldUtils';
import * as StringValidation from './StringValidation';

export default function isValid(object: IModelField): Array<EConstraintsType> {
    let errors: Array<EConstraintsType> = [];

    switch(object.type){
        case EObjectType.STRING:
            errors = object.constraints ? StringValidation.isValid(object.constraints, object.value) : [];
            break;
        case EObjectType.NUMBER:
            break;
        default:
        case EObjectType.PROMETEUS_OBJECT:
            getDeltaAttributes(object, defaultModelField).forEach((item: IModelField, key: string) => {
                errors = errors.concat(item ? isValid(item.value) : []);
            });
            break;
    } 

    return errors;
}
