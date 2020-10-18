import React, { useState } from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface inputProps {
    headers: Array<string>,
    onSort: (header: string, isAscending: boolean) => void
}

type ascendingType = 'asc' | 'desc';

function CustomTableHeaders(props: inputProps): JSX.Element {
    const [activeSorting, setActiveSorting] = useState<string>(props.headers[0]);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    function onSort(header: string){
        if(activeSorting !== header){
            setIsAscending(true);
            setActiveSorting(header);
        } else {
            setIsAscending(!isAscending);
        }

        props.onSort(activeSorting, isAscending);
    }

    function getAscending(header: string):  ascendingType{
        let ascending: ascendingType = 'asc';

        if(activeSorting === header && !isAscending) {
            ascending = 'desc';
        }

        return ascending;
    }

    return (
        <TableHead>
            <TableRow>
                {
                    props.headers.map((header: string) => {
                        return (
                            <TableCell
                                key = {`table_header_${header}`}
                            >
                                <TableSortLabel
                                    active={activeSorting === header}
                                    direction={getAscending(header)}
                                    onClick={() => {onSort(header)}}
                                />
                                {header} 
                            </TableCell>
                        );
                    })
                }
            </TableRow>
        </TableHead>
    );
}

export default CustomTableHeaders;