import React from 'react';
import { IPersonneField, createField } from './model/specific/Personne';
import PrometeusWidgetHierarchical, { IHierarchicalElement } from './view/common/complex/hierarchical/PrometeusWidgetHierarchical';
import PrometeusWidgetTextInput from './view/common/elementary/PrometeusWidgetTextInput';

function Home() {
  const personne: IPersonneField = createField();

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

  const hierarchicalElements: Array<IHierarchicalElement> = [
    Rick, Vador, Punisher, Bender
  ]

  return (
    <div>
      <h1>Prometeus application test</h1>
      <PrometeusWidgetTextInput field={personne.nom}></PrometeusWidgetTextInput>
      <PrometeusWidgetHierarchical elements = {hierarchicalElements} onClick = {(e: IHierarchicalElement) => console.log(e)}></PrometeusWidgetHierarchical>
    </div>
  );
}

export default Home;
