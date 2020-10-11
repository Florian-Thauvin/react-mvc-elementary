import React from 'react';

import HierarchicalElement from './HierarchicalElement';

type onClickDefinition = (element: IHierarchicalElement) => void;

const defaultStyle: React.CSSProperties = {display: 'flex', alignItems: 'center'};

interface inputProps {
    elements: IHierarchicalElement[];
    onClick?: onClickDefinition;
}

export interface IHierarchicalElement {
    key: string;
    name: string;
    imageDisplay: string;
    parent?: IHierarchicalElement;
    childrens?: Array<IHierarchicalElement>;
    isCurrent?: boolean;
}

function findRootParents(elements: Array<IHierarchicalElement>): Array<IHierarchicalElement> {    
    let rootParents: Array<IHierarchicalElement> = [];

    elements.forEach((element: IHierarchicalElement) => {
        if(!element.parent) {
            rootParents.push(element);   
        }
    });

    return rootParents;
}   

function displayChildrens(parent: IHierarchicalElement, onClick?: onClickDefinition): JSX.Element {
    return (
        <div key = { parent.key } style={{...defaultStyle, flexDirection: 'column'}} className = {parent.key}>
            <HierarchicalElement key = { parent.key } element = { parent } onClick = { onClick }/>
            {
                parent.childrens ? (
                    <div style={{...defaultStyle, flexDirection: 'row'}}>
                    {
                        parent.childrens.map((element: IHierarchicalElement) => {
                            return displayChildrens(element, onClick);
                        })
                    }
                    </div>
                ) : <></>
            }
        </div>
    );
}

function PrometeusWidgetHierarchical(props: inputProps): JSX.Element {

    const { elements, onClick } = props;
    const rootParents = findRootParents(elements);

    console.log(rootParents)

    return (
        <>
            {
                rootParents.map((elements) => {
                    return displayChildrens(elements, onClick);
                })
            }
        </>
    );
}

export default PrometeusWidgetHierarchical;