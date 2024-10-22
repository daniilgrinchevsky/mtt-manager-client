import React, {useEffect, useState} from "react";
import {column} from "../Components/Table/ReactTable";
import axios from "axios";
import {Dropdown} from "../../Common/Components/Dropdown";
import Flatpickr from "react-flatpickr";
import {GiPokerHand} from "react-icons/gi";
import {PiPokerChipFill} from "react-icons/pi";
import TourneyRow from "./TourneyRow";
import {
    CURRENT_SESSION_ID,
    DISABLED_ROWS,
    SessionStat,
    SessionTourneyRow,
    TOURNEY_ROWS
} from "../../Common/utils/common";

import SessionStatModal from "./SessionStatModal";
import SessionTourneyTable from "./SessionTourneyTable";


const Session = () => {

    const getSessionSaveButtonText = () => {
        let isSessionCreated = localStorage.getItem(CURRENT_SESSION_ID)
        return isSessionCreated ? 'Завершить' : 'Создать'
    }

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Время',
                accessorKey: 'timeStart',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Рум',
                accessorKey: 'room',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Название',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Бай-ин',
                accessorKey: 'buyIn',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Конец',
                accessorKey: 'timeEnd',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );


    const [tableData, setTableData] = useState([])
    const [priorityFilter, setPriorityFilter] = useState( localStorage.getItem('priorityFilter') ? JSON.parse(localStorage.getItem('priorityFilter') as string) : {
        LIGHT_GREEN: false,
        GREEN: false,
        BLUE: false,
        ORANGE: false,
        RED: false,
    })
    const [roomFilter, setRoomFilter] = useState( localStorage.getItem('roomFilter') ? JSON.parse(localStorage.getItem('roomFilter') as string) : {
        POKER_KING: false,
        POKERDOM: false,
        RED_STAR: false,
        BET_ONLINE: false,
        GG: false,
        COIN_POKER: false
    });
    const [timeStartFilter, setTimeStartFilter] = useState( localStorage.getItem('timeStartFilter') ? JSON.parse(localStorage.getItem('timeStartFilter') as string) : new Date());
    const [timeEndFilter, setTimeEndFilter] = useState( localStorage.getItem('timeEndFilter') ? JSON.parse(localStorage.getItem('timeEndFilter') as string) : new Date());
    const [buyInFromFilter, setBuyInFromFilter] = useState<string>(localStorage.getItem('buyInFromFilter') ? JSON.parse(localStorage.getItem('buyInFromFilter') as string) : '');
    const [buyInToFilter, setBuyInToFilter] = useState<string>(localStorage.getItem('buyInToFilter') ? JSON.parse(localStorage.getItem('buyInToFilter') as string) : '');
    const [showPhaseFilter, setShowPhaseFilter] = useState<boolean>(localStorage.getItem('showPhaseFilter') ? JSON.parse(localStorage.getItem('showPhaseFilter') as string) : false);
    const [tourneyRows, setTourneysRows] = useState<SessionTourneyRow[]>(localStorage.getItem(TOURNEY_ROWS) ? JSON.parse(localStorage.getItem(TOURNEY_ROWS) as string) : []);
    const [disabledRows, setDisabledRows] = useState<string[]>(localStorage.getItem(DISABLED_ROWS) ? JSON.parse(localStorage.getItem(DISABLED_ROWS) as string) : [])
    const [sessionSaveButtonText, setSessionSaveButtonText] = useState<string>(getSessionSaveButtonText)
    const [showStatModal, setShowStatModal] = useState(false);
    const [sessionStat, setSessionStat] = useState<SessionStat>({
        duration: '',
        tourneyCount: 0,
        totalBuyInsUsd: 0,
        totalWinningsUsd: 0,
        profit: 0
    })

    useEffect(() => {
        fetchTableData()
    }, []);

    const fetchTableData = () => {
        let filters = getFilters()
        console.log(filters)

        axios.post(`${process.env.REACT_APP_API_URL}tourney/session-table`, filters)
            .then(response => {
                console.log(response)
                setTableData(response.data)
            })
    }

    const getFilters = () => {
        return {
            priorities: getFilterList(priorityFilter),
            rooms: getFilterList(roomFilter),
            timeStart: timeStartFilter,
            timeEnd: timeEndFilter,
            buyInFrom: buyInFromFilter,
            buyInTo: buyInToFilter,
            showPhase: showPhaseFilter,
        }
    }
    
    const getFilterList = (filter: {}) => {
        let filterList: string[] = []
        Object.keys(filter).forEach((key) => {
            // @ts-ignore
            if (filter[key]) {
                filterList.push(key)
            }
        })
        return filterList
    }

    const handlePriorityFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriorityFilter({...priorityFilter, [event.target.id] : event.target.checked })
        localStorage.setItem('priorityFilter', JSON.stringify({...priorityFilter, [event.target.id] : event.target.checked }))
    }

    const handleRoomFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomFilter({...roomFilter, [event.target.id] : event.target.checked })
        localStorage.setItem('roomFilter', JSON.stringify({...roomFilter, [event.target.id] : event.target.checked }))
    }

    const handleTimeStartFilter = (event: Date[]) => {
        setTimeStartFilter(event[0])
        localStorage.setItem('timeStartFilter', JSON.stringify(event[0]))
    }

    const handleTimeEndFilter = (event: Date[]) => {
        setTimeEndFilter(event[0])
        localStorage.setItem('timeEndFilter', JSON.stringify(event[0]))
    }

    const handleBuyInFromFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuyInFromFilter(event.target.value)
        localStorage.setItem('buyInFromFilter', JSON.stringify(event.target.value))
    }

    const handleBuyInToFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuyInToFilter(event.target.value)
        localStorage.setItem('buyInToFilter', JSON.stringify(event.target.value))
    }

    const handleShowPhaseFilter = () => {
        setShowPhaseFilter(!showPhaseFilter)
        localStorage.setItem('showPhaseFilter', JSON.stringify(!showPhaseFilter))
    }

    const handleSessionSave = () => {
        let isSessionCreated = localStorage.getItem(CURRENT_SESSION_ID)
        if (isSessionCreated) {
            let tourneyRecords: SessionTourneyRow[] = []

            tourneyRows.forEach((row) => {
                let tourneyRow = {
                    totalBuyIn: row.totalBuyIn,
                    totalWinnings: row.totalWinnings,
                    entryCount: row.entryCount,
                    tourneyId: row.tourneyId,
                }

                tourneyRecords.push(tourneyRow)
            })

            let session = {
                id: localStorage.getItem(CURRENT_SESSION_ID),
                tourneyRecords: tourneyRecords
            }

            axios.post(`${process.env.REACT_APP_API_URL}session/close`, session)
                .then(response => {
                    console.log(response)
                    localStorage.removeItem(CURRENT_SESSION_ID)
                    setSessionSaveButtonText(getSessionSaveButtonText)
                    if (response.data) {
                        setSessionStat(response.data)
                        setTourneysRows([])
                        setDisabledRows([])
                        onModalOpen()
                    }
                })
        } else {
            createNewSession()
        }
    }



    const createNewSession = () => {
        axios.get(`${process.env.REACT_APP_API_URL}session`)
            .then(response => {
                console.log(response)
                localStorage.setItem(CURRENT_SESSION_ID, response.data.id)
                setSessionSaveButtonText(getSessionSaveButtonText)
            })
    }

    useEffect(() => {
        localStorage.setItem(TOURNEY_ROWS, JSON.stringify(tourneyRows))
    }, [tourneyRows]);
    useEffect(() => {
        localStorage.setItem(DISABLED_ROWS, JSON.stringify(disabledRows))
    }, [disabledRows]);

    const createTourneyRow = (row: any) => {
        console.log(row)
        let newTourneyRow: SessionTourneyRow = {
            tourneyId: row.tourneyId,
            buyIn: row.buyIn.slice(1).replace(",", "."),
            timeStart: row.timeStart,
            timeEnd: row.timeEnd,
            room: row.room,
            name: row.name,
            priority: row.priority,
        }

        setTourneysRows([...tourneyRows, newTourneyRow])
    }


    const deleteRow = (row: SessionTourneyRow) => {
        //@ts-ignore
        let disabledRowCode = row.timeStart + row.room + row.name + row.buyIn
        console.log(disabledRowCode)
        setDisabledRows(disabledRows.filter(item => item !== disabledRowCode))
        setTourneysRows(tourneyRows.filter(item => item !== row));
    }

    const onModalOpen = () => {
        setShowStatModal(true)
    }

    const onModalHide = () => {
        setShowStatModal(false)
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-2 gap-x-5">
                <div className="card mt-5">
                    <div className="card-body">
                        <div className="grid grid-flow-row auto-rows-min gap-y-1 gap-x-2">
                            {/*<div className="grid grid-cols-5">*/}
                            <Dropdown className="relative">
                                <Dropdown.Trigger type="button"
                                                  className="text-white dropdown-toggle inline-flex justify-center items-center size-full btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                                                  id="dropdownMenuButton" data-bs-toggle="dropdown">
                                    <PiPokerChipFill size={20}/>
                                </Dropdown.Trigger>

                                <Dropdown.Content placement="bottom-end" as="ul"
                                                  className="absolute z-50 mt-1 list-none bg-white rounded-md shadow-md ltr:text-left rtl:text-right dropdown-menu min-w-max dark:bg-zink-600"
                                                  aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="LIGHT_GREEN"
                                                   className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-lime-500 checked:border-lime-500 dark:checked:bg-lime-500 dark:checked:border-lime-500 checked:disabled:bg-lime-400 checked:disabled:border-lime-400"
                                                   type="checkbox" checked={priorityFilter.LIGHT_GREEN}
                                                   onChange={handlePriorityFilterChange}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="GREEN"
                                                   className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-green-500 checked:border-green-500 dark:checked:bg-green-500 dark:checked:border-green-500 checked:disabled:bg-green-400 checked:disabled:border-green-400"
                                                   type="checkbox" checked={priorityFilter.GREEN}
                                                   onChange={handlePriorityFilterChange}/>

                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="BLUE"
                                                   className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-sky-500 checked:border-sky-500 dark:checked:bg-sky-500 dark:checked:border-sky-500 checked:disabled:bg-sky-400 checked:disabled:border-sky-400"
                                                   type="checkbox" checked={priorityFilter.BLUE}
                                                   onChange={handlePriorityFilterChange}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="ORANGE"
                                                   className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-amber-500 checked:border-amber-500 dark:checked:bg-amber-500 dark:checked:border-amber-500 checked:disabled:bg-amber-400 checked:disabled:border-amber-400"
                                                   type="checkbox" checked={priorityFilter.ORANGE}
                                                   onChange={handlePriorityFilterChange}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="RED"
                                                   className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-red-500 checked:border-red-500 dark:checked:bg-red-500 dark:checked:border-red-500 checked:disabled:bg-red-400 checked:disabled:border-red-400"
                                                   type="checkbox" checked={priorityFilter.RED}
                                                   onChange={handlePriorityFilterChange}/>
                                        </div>
                                    </li>
                                </Dropdown.Content>
                            </Dropdown>
                            <Dropdown className="relative">
                                <Dropdown.Trigger type="button"
                                                  className="text-white dropdown-toggle inline-flex justify-center items-center size-full btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                                                  id="dropdownMenuButton" data-bs-toggle="dropdown">
                                    <GiPokerHand size={20}/>
                                </Dropdown.Trigger>

                                <Dropdown.Content placement="bottom-end" as="ul"
                                                  className="absolute z-50 mt-1 list-none bg-white rounded-md shadow-md ltr:text-left rtl:text-right dropdown-menu min-w-max dark:bg-zink-600"
                                                  aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="POKER_KING"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.POKER_KING}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="pokerKing" className="align-middle">
                                                PokerKing
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="POKERDOM"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.POKERDOM}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="pokerDom" className="align-middle">
                                                Покердом
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="RED_STAR"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.RED_STAR}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="redStar" className="align-middle">
                                                RedStar
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="BET_ONLINE"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.BET_ONLINE}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="betOnline" className="align-middle">
                                                BetOnline
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="GG"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.GG}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="GG" className="align-middle">
                                                GG
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-2 px-3 py-1.5">
                                            <input id="COIN_POKER"
                                                   className="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-700 checked:border-slate-700 dark:checked:bg-zink-400 dark:checked:border-zink-400 checked:disabled:bg-zink-500 checked:disabled:border-zink-500"
                                                   type="checkbox" checked={roomFilter.COIN_POKER}
                                                   onChange={handleRoomFilterChange}/>
                                            <label htmlFor="COIN_POKER" className="align-middle">
                                                CoinPoker
                                            </label>
                                        </div>
                                    </li>
                                </Dropdown.Content>
                            </Dropdown>

                            <Flatpickr
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true
                                }}
                                value={timeStartFilter}
                                onChange={handleTimeStartFilter}
                                placeholder="Начало"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            />
                            <Flatpickr
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true
                                }}
                                value={timeEndFilter}
                                onChange={handleTimeEndFilter}
                                placeholder="Начало"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            />

                            <div>
                                <input type="number"
                                       className="rounded-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                       required
                                       value={buyInFromFilter}
                                       onChange={handleBuyInFromFilter}
                                       placeholder="от"/>
                            </div>
                            <div>
                                <input type="number"
                                       className="rounded-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                       required
                                       value={buyInToFilter}
                                       onChange={handleBuyInToFilter}
                                       placeholder="до"/>
                            </div>

                            <div className="flex items-center gap-2">
                                <input id="showPhase"
                                       className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-slate-500 checked:border-slate-500 dark:checked:bg-sky-500 dark:checked:border-slate-500 checked:disabled:bg-slate-400 checked:disabled:border-sky-400"
                                       type="checkbox" checked={showPhaseFilter}
                                       onChange={handleShowPhaseFilter}/>
                                <button type="button"
                                        onClick={fetchTableData}
                                        className="flex rounded-full items-center justify-center size-[37.5px] p-0 text-white btn bg-green-400 border-green-500 hover:text-white hover:bg-green-700 hover:border-green-700 focus:text-white focus:bg-green-700 focus:border-green-700 focus:ring focus:ring-green-100 active:text-white active:bg-green-700 active:border-green-700 active:ring active:ring-green-100 dark:ring-green-400/20">
                                    <i className="ri-equalizer-2-line text-lg"></i></button>
                            </div>


                            {/*</div>*/}
                            <SessionTourneyTable
                                disabledRows={disabledRows}
                                setDisabledRows={setDisabledRows}
                                addRowHandler={createTourneyRow}
                                isPagination={false}
                                isSelect={false}
                                isGlobalFilter={false}
                                columns={(columns || [])}
                                data={tableData}
                                customPageSize={100}
                                hasPriority={true}
                                hasCustomWidth={true}
                                divclassName="my-2 col-span-7 overflow-x-auto lg:col-span-7"
                                tableclassName="dataTable w-full text-sm align-middle whitespace-nowrap no-footer"
                                theadclassName="border-b border-slate-200 dark:border-zink-500"
                                tbodyclassName="divide-y divide-slate-200 dark:divide-zink-500"
                                thclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-3 py-4 text-slate-900 bg-slate-200/50 font-semibold text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 sorting_asc"
                                tdclassName="p-3 truncate group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500"
                                PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                            />
                        </div>
                    </div>
                </div>
                <div className="card mt-5">
                    <div className="card-body">
                        <div className="mb-4">
                            {/*<Flatpickr*/}
                            {/*    options={{*/}
                            {/*        dateFormat: "d.m.y",*/}
                            {/*    }}*/}
                            {/*    value={sessionDateFilter}*/}
                            {/*    onChange={(e) => setSessionDateFilter(e[0])}*/}
                            {/*    placeholder="Дата"*/}
                            {/*    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"*/}
                            {/*/>*/}
                            {/*<button type="button"*/}
                            {/*        onClick={handleSessionLoad}*/}
                            {/*        className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20">*/}
                            {/*    Загрузить*/}
                            {/*</button>*/}
                            {/*<button type="button"*/}
                            {/*        className="bg-white border-dashed text-slate-500 btn border-slate-500 hover:text-slate-500 hover:bg-slate-100 hover:border-slate-600 dark:bg-zink-700 dark:text-zink-200 dark:border-zink-400 dark:ring-zink-400/20 dark:hover:bg-zink-600 dark:hover:text-zink-100 dark:focus:bg-zink-600 dark:focus:text-zink-100 dark:active:bg-zink-600 dark:active:text-zink-100">*/}
                            {/*    Очистить*/}
                            {/*</button>*/}
                            <button type="button"
                                    onClick={handleSessionSave}
                                    className="text-slate-600 w-full font-semibold bg-slate-100  btn hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:ring-slate-400/10">
                                {sessionSaveButtonText}
                            </button>

                        </div>
                        {tourneyRows.map((tourneyRow) => (
                            <TourneyRow key={tourneyRow.name}
                                        row={tourneyRow}
                                        deleteRowHandler={deleteRow}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <SessionStatModal stat={sessionStat} show={showStatModal} onHide={onModalHide}></SessionStatModal>

        </React.Fragment>
    );
};

export default Session
