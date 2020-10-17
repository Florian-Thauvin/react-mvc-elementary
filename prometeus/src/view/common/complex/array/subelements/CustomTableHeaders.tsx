import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface inputProps {
    headers: Array<string>
}

function CustomTableHeaders(props: inputProps): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                {
                    props.headers.map((header: string) => {
                        return (<TableCell key = {`table_header_${header}`}> {header} </TableCell>);
                    })
                }
            </TableRow>
        </TableHead>
    );
}

export default CustomTableHeaders;