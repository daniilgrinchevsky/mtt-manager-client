import React, {useEffect, useState} from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import {column} from "../Components/Table/ReactTable";

import {useAlert} from 'react-alert'
import ConfirmModal from "../ConfirmModal";
import EntityTable from "../EntityTable";
import {Enum} from "../../Common/utils/common";

const Tourneys = () => {

    const [roomOptions, setRoomOptions] = useState([]);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [tourneyTypeOptions, setTourneyTypeOptions] = useState([]);
    const [tourneySpeedOptions, setTourneySpeedOptions] = useState([]);
    const [tourneyPeriodOptions, setTourneyPeriodOptions] = useState([]);

    const [id, setId] = useState(null);
    const [tourneyName, setTourneyName] = useState("");
    const [buyIn, setBuyIn] = useState("");
    const [currencyOption, setCurrencyOption] = useState({ value: null, label: null });
    const [roomOption, setRoomOption] = useState<Enum | null> (null);
    const [timeStart, setTimeStart] = useState(new Date());
    const [timeEnd, setTimeEnd] = useState<Date | undefined>(undefined);
    const [tourneySpeedOption, setTourneySpeedOption] = useState({ value: null, label: null });
    const [tourneyTypeOption, setTourneyTypeOption] = useState({ value: null, label: null });
    const [tourneyPeriodOption, setTourneyPeriodOption] = useState({ value: null, label: null });
    const [isPhase, setPhase] = useState(false);
    const [size, setSize] = useState("");

    const [tableData, setTableData] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchTourneyOptions()
        fetchTableData()
    }, []);

    const fetchTourneyOptions = () => {
        axios.get(`${process.env.REACT_APP_API_URL}enum/tourney-create`)
            .then(response => {
                console.log(response)
                setRoomOptions(response.data.room)
                setCurrencyOptions(response.data.currency)
                setTourneyTypeOptions(response.data.tourneyType)
                setTourneySpeedOptions(response.data.tourneySpeed)
                setTourneySpeedOption(response.data.tourneySpeed[0])
                setTourneyPeriodOptions(response.data.tourneyPeriod)
                setCurrencyOption(response.data.currency[0])
                setTourneyPeriodOption(response.data.tourneyPeriod[0])
                setTourneyTypeOption(response.data.tourneyType[0])
            })
    }

    const fetchTableData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}tourney/table`)
            .then(response => {
                console.log(response.data)
                setTableData(response.data)
            })
    }

    const handleCurrencyChange = (event: any) => {
        setCurrencyOption(event)
    }
    const handleRoomChange = (event: any) => {
        setRoomOption(event)
        setCurrencyOption(event.defaultCurrency)
    }
    const handleTourneySpeedChange = (event: any) => {
        setTourneySpeedOption(event)
    }
    const handleTourneyTypeChange = (event: any) => {
        setTourneyTypeOption(event)
    }
    const handleTourneyPeriodChange = (event: any) => {
        setTourneyPeriodOption(event)
    }

    const handleSave = () => {
        if (tourneyName === "") {
            return
        }

        let tourney = {
            id: id,
            name: tourneyName,
            room: roomOption ? roomOption.value : null,
            buyin: Number(buyIn.replace(",", ".")),
            currency: currencyOption.value,
            timeStart: timeStart,
            timeEnd: timeEnd,
            speed: tourneySpeedOption.value,
            type: tourneyTypeOption.value,
            period: tourneyPeriodOption.value,
            isPhase: isPhase,
            size: size
        }

        console.log(tourney)
        axios.post(`${process.env.REACT_APP_API_URL}tourney`, tourney)
            .then(response => {
                console.log(response)
                fetchTableData()
                handleReset()
                alert.success("Сохранено")
            })
            .catch(error => {
                console.log(error)
                alert.error("Ошибка сохранения")
            })
    }

    //@ts-ignore
    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Название',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Рум',
                accessorKey: 'room.label',
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
                header: 'Скорость',
                accessorKey: 'speed.label',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Тип',
                accessorKey: 'type.label',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Размер',
                accessorKey: 'size',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Начало',
                accessorKey: 'timeStart',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Конец',
                accessorKey: 'timeEnd',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Период',
                accessorKey: 'period.label',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );

    const handleRowClick = (row: any) => {
        let timeStart = new Date()
        timeStart.setHours(row.timeStart.split(':')[0], row.timeStart.split(':')[1]);

        let timeEnd = new Date()
        timeEnd.setHours(row.timeEnd.split(':')[0], row.timeEnd.split(':')[1]);
        console.log(row)
        setId(row.id)
        setTourneyName(row.name)
        setBuyIn(row.buyIn.replace(",", '.'))
        setCurrencyOption(row.currency)
        setRoomOption(row.room)
        setTimeStart(timeStart)
        setTimeEnd(timeEnd)
        setTourneySpeedOption(row.speed)
        setTourneyTypeOption(row.type)
        setTourneyPeriodOption(row.period)
        setSize(row.size)
        setPhase(row.isPhase)
    }

    const handleReset = () => {
        setId(null)
        setTourneyName("")
        setBuyIn("")
        setCurrencyOption(currencyOptions[0])
        setRoomOption(null)
        setTimeStart(new Date())
        setTimeEnd(undefined)
        setTourneySpeedOption(tourneySpeedOptions[0])
        setTourneyTypeOption(tourneyTypeOptions[0])
        setTourneyPeriodOption(tourneyPeriodOptions[0])
        setSize("")
        setPhase(false)
    }

    const handleDelete = () => {
        console.log(id)
        if (id != null) {
            setShowDeleteModal(true)
        }
    }

    const deleteTourney = () => {
        setShowDeleteModal(false)
        handleReset()
        axios.delete(`${process.env.REACT_APP_API_URL}tourney/${id}`)
            .then(response => {
                alert.success("Удалено")
                fetchTableData()
            })
            .catch(error => {
                alert.error("Ошибка удаления")
            })
    }


    const alert = useAlert()


    return (
        <React.Fragment>
            <div className="grid grid-cols-1 gap-x-5">
                <div className="card mt-5">
                    <div className="card-body">
                        {/*<form action="/" onSubmit={(event: any) => event.preventDefault()}>*/}
                        <div className='grid grid-cols-6 grid-rows-2 gap-3'>
                            <div className="col-span-2">
                                <input type="text"
                                       className="rounded-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                       required
                                       value={tourneyName}
                                       onChange={(e) => {
                                           setTourneyName(e.target.value)
                                       }}
                                       placeholder="Название"/>
                            </div>
                            <div>
                                <input type="number"
                                       className="rounded-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                       required
                                       value={buyIn}
                                       onChange={(e) => {
                                           setBuyIn(e.target.value)
                                       }}
                                       placeholder="Бай-ин"/>
                            </div>
                            <Select placeholder="Рум"
                                    options={roomOptions}
                                    value={roomOption}
                                    onChange={handleRoomChange}
                            >
                            </Select>
                            <div>
                            <Flatpickr
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true
                                }}
                                value={timeStart}
                                onChange={(e) => setTimeStart(e[0])}
                                placeholder="Начало"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            />
                            </div>
                            <Flatpickr
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                }}
                                value={timeEnd}
                                onChange={(e) => setTimeEnd(e[0])}
                                placeholder="Конец"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            />
                            <Select placeholder="Валюта"
                                    options={currencyOptions}
                                    value={currencyOption}
                                    onChange={handleCurrencyChange}
                            >
                            </Select>
                            <Select placeholder="Скорость"
                                    options={tourneySpeedOptions}
                                    value={tourneySpeedOption}
                                    onChange={handleTourneySpeedChange}>
                            </Select>
                            <Select placeholder="Тип"
                                    options={tourneyTypeOptions}
                                    value={tourneyTypeOption}
                                    onChange={handleTourneyTypeChange}>
                            </Select>
                            <Select placeholder="Период"
                                    options={tourneyPeriodOptions}
                                    value={tourneyPeriodOption}
                                    maxMenuHeight={400}
                                    onChange={handleTourneyPeriodChange}>
                            </Select>
                            <div className="grid grid-cols-2 gap-x-3">
                                <div>
                                    <input type="number"
                                           className="rounded-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                           required
                                           value={size}
                                           onChange={(e) => {
                                               setSize(e.target.value)
                                           }}
                                           placeholder="Размер"/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input id="checkboxCircle4"
                                           className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-sky-500 checked:border-sky-500 dark:checked:bg-sky-500 dark:checked:border-sky-500 checked:disabled:bg-sky-400 checked:disabled:border-sky-400"
                                           type="checkbox"
                                           checked={isPhase}
                                           onChange={(e) => setPhase(!isPhase)}/>
                                    <label htmlFor="checkboxCircle4" className="align-middle">
                                        Фазовый
                                    </label>
                                </div>
                            </div>

                            {/*<button type="button"*/}
                            {/*        className="text-white w-1/3 bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10"*/}
                            {/*        onClick={handleSave}>*/}
                            {/*    Сохранить*/}
                            {/*</button>*/}
                            <div className="grid grid-cols-3">
                                <button type="button"
                                        onClick={handleReset}
                                        className="flex w-full text-lg items-center justify-center p-0 rounded-e-none text-white btn bg-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 active:text-white dark:ring-slate-400/20">
                                    <i className="ri-loop-left-line"></i></button>

                                <button type="button"
                                        onClick={handleDelete}
                                        className="flex w-full text-xl  items-center justify-center p-0 rounded-e-none rounded-s-none text-white btn bg-pink-500 hover:text-white hover:bg-pink-600 hover:border-pink-600 focus:text-white focus:bg-pink-600 active:text-white active:bg-pink-600 dark:ring-pink-400/20">
                                    <i className="ri-delete-bin-2-line"></i></button>

                                <button type="button"
                                        onClick={handleSave}
                                        className="flex w-full text-xl items-center justify-center p-0 rounded-s-none text-white btn bg-lime-500 hover:text-white hover:bg-lime-600 hover:border-lime-600 focus:text-white focus:bg-lime-600 active:text-white active:bg-lime-600 dark:ring-lime-400/20">
                                    <i className="ri-save-line"></i></button>

                            </div>


                        </div>
                        {/*</form>*/}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Все турниры</h6>

                    <EntityTable
                        isPagination={true}
                        isSelect={true}
                        isGlobalFilter={true}
                        columns={(columns || [])}
                        data={(tableData || [])}
                        customPageSize={10}
                        rowClickHandler={handleRowClick}
                        hasPriority={true}
                        divclassName="my-2 col-span-12 overflow-x-auto lg:col-span-12"
                        tableclassName="dataTable w-full text-sm align-middle whitespace-nowrap no-footer"
                        theadclassName="border-b border-slate-200 dark:border-zink-500"
                        tbodyclassName="divide-y divide-slate-200 dark:divide-zink-500"
                        thclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-3 py-4 text-slate-900 bg-slate-200/50 font-semibold text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 sorting_asc"
                        tdclassName="select-none text-base p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />
                </div>
            </div>

            <ConfirmModal show={showDeleteModal}
                          onHide={() => setShowDeleteModal(false)}
                          body="Удаляем турнир?"
                          onSubmit={deleteTourney}/>
        </React.Fragment>
    );
};

export default Tourneys;
