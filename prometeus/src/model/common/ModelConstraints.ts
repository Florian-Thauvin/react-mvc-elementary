export interface AbstractConstraint {
    isMandatory: boolean
}

export interface IStringConstraint extends AbstractConstraint{
    sizeMin?: number,
    sizeMax?: number,
    regexp?: string
}