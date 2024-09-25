import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {
    Cell,
    Column,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Header,
    Table as ReactTable,
    useReactTable
} from '@tanstack/react-table';

import {rankItem} from '@tanstack/match-sorter-utils';
import {ChevronLeft, ChevronRight} from "lucide-react";
import {CURRENT_SESSION_ID, getColorFromPriority} from "../../../Common/utils/common";


// Column Filter
const Filter = ({
                    column
                }: {
    column: Column<any, unknown>;
    table: ReactTable<any>;
}) => {
    const columnFilterValue = column.getFilterValue();

    return (
        <>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder="Search..."
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    );
};

// Global Filter
const DebouncedInput = ({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [debounce, onChange, value]);

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    );
};
interface TableContainerProps {
    columns?: any;
    data?: any;
    tableclassName?: any;
    divclassName?: any;
    thclassName?: any;
    trclassName?: any;
    tableClass?: any;
    tdclassName?: any;
    theadclassName?: any;
    tbodyclassName?: any;
    isTfoot?: boolean;
    isSelect?: boolean;
    isBordered?: boolean;
    customPageSize?: number;
    isGlobalFilter?: boolean;
    isPagination: boolean;
    PaginationClassName?: string;
    SearchPlaceholder?: string;
    hasPriority?: boolean;
    hasCustomWidth?: boolean;
    addRowHandler?: any;
    disabledRows?: any;
    setDisabledRows?: any;
}

const SessionTourneyTable = ({
                            columns,
                            data,
                            tableclassName,
                            theadclassName,
                            divclassName,
                            trclassName,
                            thclassName,
                            tdclassName,
                            tbodyclassName,
                            isTfoot,
                            isSelect,
                            isPagination,
                            customPageSize,
                            isGlobalFilter,
                            PaginationClassName,
                            SearchPlaceholder,
                            hasPriority,
                            hasCustomWidth,
                            addRowHandler,
                            disabledRows,
                            setDisabledRows,
                        }: TableContainerProps) => {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value);
        addMeta({
            itemRank
        });
        return itemRank.passed;
    };

    const table = useReactTable({
        columns,
        data,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    const {
        getHeaderGroups,
        getFooterGroups,
        getRowModel,
        getPageOptions,
        setPageIndex,
        setPageSize,
        getState,
        getCanPreviousPage,
        getCanNextPage,
        nextPage,
        previousPage,
    } = table;

    useEffect(() => {
        Number(customPageSize) && setPageSize(Number(customPageSize));
    }, [customPageSize, setPageSize]);

    const getWidth = (header: Header<any, any>): string => {
        let columnToWidth = new Map<string, string> ([
            ['timeStart', '10'],
            ['room', '10'],
            ['name', '60'],
            ['buyIn', '10'],
            ['timeEnd', '10']
        ])
        // @ts-ignore
        return columnToWidth.get(header.column.id) + '%'
    }

    const getButtonClass = (color: string) => {
        let colorToStyle = new Map<string, string> ([
            ['lime', "btn p-0 pr-1 pl-1 text-lime-500 bg-white hover:text-lime-500 hover:bg-lime-100 focus:text-lime-500 focus:bg-lime-100 active:text-lime-500 active:bg-lime-100 dark:bg-zink-700 dark:hover:bg-lime-500/10 dark:focus:bg-lime-500/10 dark:active:bg-lime-500/10"],
            ['green', "btn p-0 pr-1 pl-1 text-green-500 bg-white hover:text-green-500 hover:bg-green-100 focus:text-green-500 focus:bg-green-100 active:text-green-500 active:bg-green-100 dark:bg-zink-700 dark:hover:bg-green-500/10 dark:focus:bg-green-500/10 dark:active:bg-green-500/10"],
            ['sky', "btn p-0 pr-1 pl-1 text-sky-500 bg-white hover:text-sky-500 hover:bg-sky-100 focus:text-sky-500 focus:bg-sky-100 active:text-sky-500 active:bg-sky-100 dark:bg-zink-700 dark:hover:bg-sky-500/10 dark:focus:bg-sky-500/10 dark:active:bg-sky-500/10"],
            ['amber', "btn p-0 pr-1 pl-1 text-amber-500 bg-white hover:text-amber-500 hover:bg-amber-100 focus:text-amber-500 focus:bg-amber-100 active:text-amber-500 active:bg-amber-100 dark:bg-zink-700 dark:hover:bg-amber-500/10 dark:focus:bg-amber-500/10 dark:active:bg-amber-500/10"],
            ['red', "btn p-0 pr-1 pl-1 text-red-500 bg-white hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"],
            ['slate', "btn p-0 pr-1 pl-1 text-slate-500 bg-white hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-700 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"],
        ])
        return colorToStyle.get(color)
    }

    const getCellRender = (cell: Cell<any, unknown>, color: string) => {
        if (cell.column.id === 'name') {
            let row = cell.row.original
            let isRowDisabled = isDisabledRow(row)
            if (isRowDisabled) {
                color = 'slate'
            }
            return (
                <button type="button"
                        disabled={isRowDisabled}
                        className={getButtonClass(color) + " max-w-sm truncate"}
                        onClick={() =>  {
                            console.log(cell.row.original)
                            if (localStorage.getItem(CURRENT_SESSION_ID)) {
                                setDisabledRows([...disabledRows, getRowCode(row)])
                                addRowHandler(row)
                            }

                        }
                        } >
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </button>
            )
        } else {
            return (
                <Fragment>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </Fragment>
            )
        }

    }

    const isDisabledRow = (row: any) => {
        let disabledRowCode = getRowCode(row)
        return disabledRows.indexOf(disabledRowCode) > -1
    }

    const getRowCode = (row: any) => {
        return row.timeStart + row.room + row.name + row.buyIn.slice(1)
    }

    const getRowColor = (row: any) => {
        if (isDisabledRow(row)) {
            return " text-slate-500"
        }
        return " text-" + getColorFromPriority(row.priority) + "-500"
    }

    return (
        <Fragment>

            <div>
                {
                    isSelect &&
                    <div className="self-center col-span-12 lg:col-span-6">
                        <label>Show
                            <select name="basic_tables_length" aria-controls="basic_tables"
                                    className="px-3 py-2 form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 inline-block w-auto"
                                    onClick={(event: any) => setPageSize(event.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                    </div>
                }

                <div className="self-center col-span-12 lg:col-span-6 lg:place-self-end">
                    {isGlobalFilter &&
                        <label>Search: <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            className="py-2 pr-4 text-sm text-topbar-item bg-topbar border border-topbar-border rounded pl-2 placeholder:text-slate-400 form-control focus-visible:outline-0 min-w-[200px] focus:border-blue-400 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-border-dark group-data-[topbar=dark]:placeholder:text-slate-500 group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-border-brand group-data-[topbar=brand]:placeholder:text-blue-300 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-500 group-data-[topbar=dark]:dark:text-zink-100"
                            placeholder={SearchPlaceholder}
                        />
                        </label>
                    }
                </div>
            </div>

            <div className={divclassName}>
                <table className={tableclassName}>
                    <thead className={theadclassName}>
                    {getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className={trclassName}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}
                                        style={ hasCustomWidth ? { textAlign:"center", width:getWidth(header)} : {textAlign:"center"}}
                                        {...{
                                            className: `${header.column.getCanSort()} ${thclassName}`,
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}>
                                        {header.isPlaceholder ? null : (
                                            <React.Fragment>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' ',
                                                    desc: ' ',
                                                }
                                                    [header.column.getIsSorted() as string] ?? null}
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </React.Fragment>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                    </thead>

                    <tbody className={tbodyclassName}>
                    {getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id} className={trclassName}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id} className={hasPriority ? tdclassName + getRowColor(row.original) : tdclassName}
                                            style={{textAlign: "center"}}>
                                            {getCellRender(cell, getColorFromPriority(row.original.priority))}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>

                    {isTfoot && <tfoot>
                    {
                        getFooterGroups()?.map((footer: any, tfKey: number) => (
                            <tr key={tfKey}>
                                {
                                    footer.headers?.map((tf: any, key: number) => (
                                        <th key={key} className="p-3 text-left group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500">
                                            {flexRender(
                                                tf.column.columnDef.header,
                                                tf.getContext()
                                            )}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tfoot>}
                </table>
            </div>

            {
                isPagination && (
                    <div className={PaginationClassName}>
                        <div className="mb-4 grow md:mb-0">
                            <div className="text-slate-500 dark:text-zink-200">Showing
                                <b> {getState().pagination.pageSize}</b> of
                                <b> {data.length}</b> Results</div>
                        </div>
                        <ul className="flex flex-wrap items-center gap-2 shrink-0">
                            <li>
                                <Link to="#!" className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto ${!getCanPreviousPage() && "disabled"}`} onClick={previousPage}>
                                    <ChevronLeft className="size-4 mr-1 rtl:rotate-180"></ChevronLeft> Prev</Link>
                            </li>
                            {getPageOptions().map((item: any, key: number) => (
                                <React.Fragment key={key}>
                                    <li>
                                        <Link to="#" className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto ${getState().pagination.pageIndex === item && "active"}`} onClick={() => setPageIndex(item)}>{item + 1}</Link>
                                    </li>
                                </React.Fragment>
                            ))}
                            <li>
                                <Link to="#!" className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto 
                ${!getCanNextPage() && ""}`} onClick={() => getCanNextPage() && nextPage()}>
                                    Next <ChevronRight className="size-4 ml-1 rtl:rotate-180"></ChevronRight> </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </Fragment>
    );
};

export default SessionTourneyTable;
