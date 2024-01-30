import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import React, { useMemo} from 'react'
import MOCK_DATA from '../constants/MOCK_DATA.json'
import COLUMNS from '../constants/Columns.js'
import '../Table/table.css'

export const Table = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {columns, 
            data, 
            defaultColumn: {
                width: 100, 
            },
        },
        useBlockLayout,
        useResizeColumns
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                                <div
                                    {...column.getResizerProps()}
                                    className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                                />
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                    })
                }
            </tbody>
        </table>
    )
}
export default Table