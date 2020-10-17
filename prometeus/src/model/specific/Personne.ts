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

function getDefaultNaturalKeys(nom?: string, prenom?: string){
    return {
        defaultNom: nom ? nom : 'nom',
        defaultPrenom: prenom ? prenom : 'prenom'
    }
}

export function createObject(nom?: string, prenom?: string, age?: number, email?: string): IPersonne {
    const { defaultNom, defaultPrenom } = getDefaultNaturalKeys(nom, prenom);

    return {
        nom: defaultNom,
        prenom: defaultPrenom,
        ...ModelObject.createObject(ModelObject.EObjectType.PROMETEUS_OBJECT, [
            {
                name: 'nom',
                value: defaultNom
            },
            {
                name: 'prenom',
                value: defaultPrenom
            }
        ]),

        age: age ? age : 0,
        email: email ? email : ''
    };
}

export function createField(nom?: string, prenom?: string, age?: number, email?: string): IPersonneField {
    const { defaultNom, defaultPrenom } = getDefaultNaturalKeys(nom, prenom);
    
    return {
        ...ModelField.createField(ModelObject.EObjectType.PROMETEUS_OBJECT, [
            {
                name: 'nom',
                value: defaultNom
            },
            {
                name: 'prenom',
                value: defaultPrenom
            }
        ]),
        nom: createNomField(nom),
        prenom: createPrenomField(prenom),
        age: createAgeField(age),
        email: createEmailField(email)
    };
}

function createNomField(nom?: string): ModelField.IStringField{
    return {
        ...ModelField.createField(ModelObject.EObjectType.STRING, [{name : 'nom'}], 'personne'),
        inputType: 'text',
        constraints: {
            isMandatory: true,
            minSize:5
        },
        value: nom ? nom : undefined
    };
}

function createPrenomField(prenom?: string): ModelField.IStringField{
    return {
        ...ModelField.createField(ModelObject.EObjectType.STRING, [{name : 'prenom'}], 'personne'),
        inputType: 'text',
        constraints: {
            isMandatory: false,
            maxSize: 10,
            minSize: 5
        },
        value: prenom ? prenom : undefined
    };
}

function createAgeField(age?: number): ModelField.INumericField{
    return {
        ...ModelField.createField(ModelObject.EObjectType.NUMBER, [{name : 'age'}], 'personne'),
        constraints: {
            isMandatory: false
        },
        value: age ? age : undefined
    }
}

function createEmailField(email?: string): ModelField.IStringField{
    return {
        ...ModelField.createField(ModelObject.EObjectType.STRING, [{name : 'email'}], 'personne'),
        inputType: 'mail',
        constraints: {
            isMandatory: false,
            maxSize: 10,
            minSize: 5
        },
        value: email ? email : undefined
    };
}