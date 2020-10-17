import { IPersonneField, createField } from './model/specific/Personne';
import { IHierarchicalElement } from './view/common/complex/hierarchical/PrometeusWidgetHierarchical';

export const personne: IPersonneField = createField();

export const personneFieldList: Array<IPersonneField> = [
  {
    ...createField('totota', 'maniol'),
  },   {
    ...createField('tatata', 'manual'),
  },   {
    ...createField('titi', 'manual'),
  }, 
];

let Rick: IHierarchicalElement = { 
  key: 'rick',
  name: 'Rick',
  imageDisplay: '/avatars/icons8-rick-sanchez-24.png'
};

const Vador: IHierarchicalElement = {
  key: 'vador',
  name: 'Dark Vador',
  imageDisplay: '/avatars/icons8-dark-vador-24.png',
  parent: Rick
};

let Punisher: IHierarchicalElement = {
  key: 'punisher',
  name: 'Punisher',
  imageDisplay: '/avatars/icons8-punisher-24.png',
  parent: Rick
};

const Bender: IHierarchicalElement = {
  key: 'bender',
  name: 'Bender',
  imageDisplay: '/avatars/icons8-futurama-bender-24.png',
  parent: Punisher
};

Punisher = {...Punisher, childrens: [Bender]}
Rick = {...Rick, childrens: [Vador, Punisher]};

export const hierarchicalElements: Array<IHierarchicalElement> = [
  Rick, Vador, Punisher, Bender
]