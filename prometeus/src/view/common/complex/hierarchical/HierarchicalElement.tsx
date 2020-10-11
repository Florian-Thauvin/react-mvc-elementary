import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import { IHierarchicalElement } from './PrometeusWidgetHierarchical';

interface inputProps {
    element: IHierarchicalElement;
    onClick?: (element: IHierarchicalElement) => void;
}

function HierarchicalElement(props: inputProps): JSX.Element {

    const { element, onClick } = props;

    return (
        <Avatar 
            alt = {element.name}
            src = {element.imageDisplay}
            onClick = {onClick? () => {onClick(element)} : undefined}
        />
    );
}

export default HierarchicalElement;