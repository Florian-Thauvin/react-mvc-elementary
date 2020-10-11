import * as ModelObject from '../common/ModelObject';
import * as ModelField from '../common/ModelField';

export interface IPersonne extends ModelObject.IModelObject {
    nom: string, 
    prenom: string,
    age?: number,
    email?: string
}

export interface IPersonneField extends ModelField.IModelField {
    nom: ModelField.IStringField,
    prenom: ModelField.IStringField,
    age: ModelField.INumericField,
    email: ModelField.IStringField
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
        age: createAgeField(),
        email: createEmailField()
    };
}

function createNomField(): ModelField.IStringField{
    return {
        ...ModelField.createField('nom', 'string', 'personne'),
        inputType: 'text',
        constraints: {
            isMandatory: true,
            minSize:5
        }
    };
}

function createPrenomField(): ModelField.IStringField{
    return {
        ...ModelField.createField('prenom', 'string', 'personne'),
        inputType: 'text',
        constraints: {
            isMandatory: false,
            maxSize: 10,
            minSize: 5
        }
    };
}

function createAgeField(): ModelField.INumericField{
    return {
        ...ModelField.createField('age', 'number', 'personne'),
        constraints: {
            isMandatory: false
        }
    }
}

function createEmailField(): ModelField.IStringField{
    return {
        ...ModelField.createField('email', 'string', 'personne'),
        inputType: 'mail',
        constraints: {
            isMandatory: false,
            maxSize: 10,
            minSize: 5
        }
    };
}