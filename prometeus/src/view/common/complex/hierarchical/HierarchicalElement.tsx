import React from 'react';
import LineTo from 'react-lineto';

import Avatar from '@material-ui/core/Avatar';

import { IHierarchicalElement } from './PrometeusWidgetHierarchical';

interface inputProps {
    element: IHierarchicalElement;
    onClick?: (element: IHierarchicalElement) => void;
}

function HierarchicalElement(props: inputProps): JSX.Element {

    const { element, onClick } = props;

    return (
        <>
            {
                element.parent ? 
                    <LineTo from = {element.parent.key} to = {element.key} borderWidth={3}></LineTo> 
                    : <p>pas de ligne</p>
            }
            <Avatar 
                alt = {element.name}
                src = {element.imageDisplay}
                onClick = {onClick? () => {onClick(element)} : undefined}
            />
        </>
    );
}

export default HierarchicalElement;