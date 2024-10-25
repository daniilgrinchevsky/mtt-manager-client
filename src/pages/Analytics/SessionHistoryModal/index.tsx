import React, {useEffect, useRef, useState} from "react"
import Modal from "../../../Common/Components/Modal";
import {ModalProps, SessionStat} from "../../../Common/utils/common";
import EntityTable from "../../EntityTable";
import {column} from "../../Components/Table/ReactTable";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import SessionStatModal from "../../Session/SessionStatModal";


const SessionHistoryModal = ({
                           show,
                           onHide,
                           callback
                       }: ModalProps) => {

    useEffect(() => {
    }, [])

    //@ts-ignore
    const historyColumns: column[] = React.useMemo(
        () => [
            {
                header: 'Начало',
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
                accessorFn: (row: any) => `${row.currency.label} ${row.buyIn}`,
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Выигрыш',
                accessorFn: (row: any) => `${row.currency.label} ${row.totalWinnings}`,
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Входы',
                accessorKey: 'entryCount',
                enableColumnFilter: false,
                enableSorting: true,
            },

        ],
        []
    );

    const ref = useRef(null);

    const clearDate = () => {
        // @ts-ignore
        ref.current.flatpickr.clear();
    }

    const [historyTableData, setHistoryTableData] = useState([])
    const handleSessionLoad = (date: Date) => {
        if (date) {
            let request = {
                date: date
            }
            axios.post(`${process.env.REACT_APP_API_URL}tourney-record`, request)
                .then(response => {
                    console.log(response.data)
                    setHistoryTableData(response.data)
                })
        }
    }

    const handleClose = () => {
        clearDate()
        setHistoryTableData([])
        onHide()
    }

    const [showStatModal, setShowStatModal] = useState(false);
    const [sessionStat, setSessionStat] = useState<SessionStat>({
        duration: '',
        tourneyCount: 0,
        totalBuyInsUsd: 0,
        totalWinningsUsd: 0,
        profit: 0
    })

    const [sessionHistoryDateFilter, setSessionHistoryDateFilter] = useState(new Date());

    const onModalHide = () => {
        setShowStatModal(false)
    }

    const getSessionStat = () => {
        if (sessionHistoryDateFilter) {
            let filterRequest = {
                date: sessionHistoryDateFilter
            }
            axios.post(`${process.env.REACT_APP_API_URL}session/stat`, filterRequest)
                .then(response => {
                    if (response.data.tourneyCount > 0) {
                        setSessionStat(response.data)
                        setShowStatModal(true)
                    }
                })
        }
    }


    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} id="largeModal" modal-center="true" closeOnClickOutside={true}
                   className="fixed flex flex-col modal transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-screen md:w-full bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                              closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">История сессий</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <div className='grid grid-cols-2 mb-2.5'>
                        <div className="flex place-self-start">
                            <button
                                onClick={getSessionStat}
                                type="button"
                                className="text-white me-6 btn text-base bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Статистика
                            </button>
                            {/*<h6 className="flex-1 text-15">История сессий</h6>*/}
                        </div>
                        <div className="flex place-self-end">
                            <Flatpickr
                                options={{
                                    dateFormat: "d.m.y",
                                    defaultDate: undefined
                                }}
                                ref={ref}
                                value={sessionHistoryDateFilter}
                                onChange={(e) => {
                                    handleSessionLoad(e[0])
                                    setSessionHistoryDateFilter(e[0])
                                }}
                                placeholder="Дата"
                                className="form-input border-slate-200 w-32 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            />
                        </div>
                    </div>

                    <EntityTable
                        isPagination={true}
                        isSelect={true}
                        isGlobalFilter={true}
                        columns={(historyColumns || [])}
                        data={(historyTableData || [])}
                        customPageSize={25}
                        hasPriority={true}
                        rowClickHandler={() => void 0}
                        divclassName="my-2 col-span-12 overflow-x-auto lg:col-span-12"
                        tableclassName="dataTable w-full text-sm align-middle whitespace-nowrap no-footer"
                        theadclassName="border-b border-slate-200 dark:border-zink-500"
                        tbodyclassName="divide-y divide-slate-200 dark:divide-zink-500"
                        thclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-3 py-4 text-slate-900 bg-slate-200/50 font-semibold text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 sorting_asc"
                        tdclassName="select-none text-base p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />
                </Modal.Body>
                <SessionStatModal stat={sessionStat} show={showStatModal} onHide={onModalHide}></SessionStatModal>
            </Modal>
        </React.Fragment>
    )
}

export default SessionHistoryModal
