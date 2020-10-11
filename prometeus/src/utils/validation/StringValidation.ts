import { EConstraintsType, IStringConstraint } from '../../model/common/ModelConstraints';


export default function isValid(constraint: IStringConstraint, value: string | undefined): Array<EConstraintsType> {
    let {minSize, maxSize, regexp} = constraint;

    let errors: Array<EConstraintsType> = [];
 
    if(value){
        if(!isMinSizeValid(minSize, value)){
            errors.push(EConstraintsType.minSize);
        }

        if(!isMaxSizeValid(maxSize, value)){
            errors.push(EConstraintsType.maxSize);
        }

        if(!isRegexpValid(regexp, value)){
            errors.push(EConstraintsType.regexp);
        }
    } else {
        if(constraint.isMandatory) {
            errors.push(EConstraintsType.isMandatory);
        }
    }

    return errors;
}

function isMinSizeValid(minSize: number | undefined, value: string): boolean {
    return minSize ? value.length > minSize : true;
}

function isMaxSizeValid(maxSize: number | undefined, value: string): boolean {
    return maxSize ? value.length < maxSize : true;
}

function isRegexpValid(regexp: string | undefined, value: string): boolean {
    return regexp ? RegExp(regexp).test(value) : true;
}