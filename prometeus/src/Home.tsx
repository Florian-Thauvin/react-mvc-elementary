import React from 'react';
import { IPersonneField, createField } from './model/specific/Personne';
import PrometeusWidgetTextInput from './view/common/PrometeusWidgetTextInput';

function Home() {
  const personne: IPersonneField = createField();

  console.log(personne)

  return (
    <div>
      <h1>Prometeus application test</h1>
      <PrometeusWidgetTextInput field={personne.nom}></PrometeusWidgetTextInput>
    </div>
  );
}

export default Home;
