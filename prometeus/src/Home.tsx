import React from 'react';

import PrometeusWidgetTable from './view/common/complex/array/PrometeusWidgetTable';
import PrometeusWidgetHierarchical from './view/common/complex/hierarchical/PrometeusWidgetHierarchical';
import PrometeusWidgetTextInput from './view/common/elementary/PrometeusWidgetTextInput';

import * as ModelSimulation from './ModelSimulation';

function Home() {
  //<PrometeusWidgetTextInput field={personne.nom}></PrometeusWidgetTextInput>
  //<PrometeusWidgetHierarchical elements = {hierarchicalElements} onClick = {(e: IHierarchicalElement) => console.log(e)}></PrometeusWidgetHierarchical>

  console.log(ModelSimulation.personneFieldList)

  return (
    <div>
      <h1>Prometeus application test</h1>
      <PrometeusWidgetTable model = {ModelSimulation.personneFieldList}/>
   </div>
  );
}

export default Home;
