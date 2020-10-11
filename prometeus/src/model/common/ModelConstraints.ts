export enum EConstraintsType {
    isMandatory = 'isMandatory',
    minSize = 'minSize',
    maxSize = 'maxSize',
    regexp = 'regexp'
}

export interface AbstractConstraint {
    [EConstraintsType.isMandatory]: boolean
}

export interface IStringConstraint extends AbstractConstraint{
    [EConstraintsType.minSize]?: number,
    [EConstraintsType.maxSize]?: number,
    [EConstraintsType.regexp]?: string
}
