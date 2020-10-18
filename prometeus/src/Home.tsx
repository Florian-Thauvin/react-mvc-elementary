import React, { useState } from 'react';

import { EConstraintsType } from './model/common/ModelConstraints';

import PrometeusWidgetTable from './view/common/complex/array/PrometeusWidgetTable';
import PrometeusWidgetHierarchical from './view/common/complex/hierarchical/PrometeusWidgetHierarchical';
import PrometeusWidgetTextInput from './view/common/elementary/PrometeusWidgetTextInput';

import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';

import * as ModelSimulation from './ModelSimulation';

function Home() {
  //<PrometeusWidgetTextInput field={personne.nom}></PrometeusWidgetTextInput>
  //<PrometeusWidgetHierarchical elements = {hierarchicalElements} onClick = {(e: IHierarchicalElement) => console.log(e)}></PrometeusWidgetHierarchical>

  const [errors, setErrors] = useState<Array<EConstraintsType>>([]);

  console.log(ModelSimulation.personneFieldList)

  return (
    <div>
      <h1>Prometeus application test</h1>
      <Button onClick={() => {console.log('Array errors: ', errors)}}>Display errors</Button>
      <PrometeusWidgetTable 
        model = {ModelSimulation.personneFieldList} 
        setErrors = {setErrors} 
        formulaireToOpen = {<Avatar src = {'/avatars/icons8-rick-sanchez-24.png'} />}
      />
   </div>
  );
}

export default Home;
