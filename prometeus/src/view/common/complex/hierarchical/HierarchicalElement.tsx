import React from 'react';
import SteppedLineTo from 'react-lineto';

import Avatar from '@material-ui/core/Avatar';

import { IHierarchicalElement } from './PrometeusWidgetHierarchical';

interface inputProps {
    element: IHierarchicalElement;
    onClick?: (element: IHierarchicalElement) => void;
}

const lineStyle = {
    delay: true,
    borderColor: '#200',
    borderStyle: 'solid',
    borderWidth: 3
}

function HierarchicalElement(props: inputProps): JSX.Element {

    const { element, onClick } = props;

    return (
        <>
            {
                element.parent ? 
                    <SteppedLineTo from = {element.parent.key} to = {element.key} fromAnchor="bottom" toAnchor="top" {...lineStyle}/> 
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