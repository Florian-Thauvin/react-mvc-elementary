import * as ModelObject from '../common/ModelObject';
import * as ModelField from '../common/ModelField';

export interface IPersonne extends ModelObject.IModelObject {
    nom: string, 
    prenom: string,
    age?: number
}

export interface IPersonneField extends ModelField.IModelField {
    nom: ModelField.IStringField,
    prenom: ModelField.IStringField,
    age: ModelField.INumericField
}

export function createObject(): IPersonne{
    return {
        ...ModelObject.createObject('personne', 'Nom'),
        nom: 'Nom',
        prenom: 'Prenom'
    };
}

export function createField(): IPersonneField {
    return {
        ...ModelField.createField('personne', 'personne'),
        nom: createNomField(),
        prenom: createPrenomField(),
        age: createAgeField()
    };
}

function createNomField(): ModelField.IStringField{
    return {
        ...ModelField.createField('nom', 'string', 'personne'),
        constraints: {
            isMandatory: true
        }
    };
}

function createPrenomField(): ModelField.IStringField{
    
}

function createAgeField(): ModelField.INumericField{
    
}