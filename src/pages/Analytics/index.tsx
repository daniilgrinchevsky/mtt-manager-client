import React, {useEffect, useState} from "react";
import pokerKingLogo from "assets/images/analytics/poker_king.png"
import pokerdomLogo from "assets/images/analytics/pokerdom-2.png"
import redStarLogo from "assets/images/analytics/redstar.png"
import ggLogo from "assets/images/analytics/ggpoker.png"
import betOnlineLogo from "assets/images/analytics/betonline.png"
import usdtLogo from "assets/images/analytics/usdt.png"
import tinkoffLogo from "assets/images/analytics/tinkoff.png"
import coinPokerLogo from "assets/images/analytics/coin_poker.png"
import AccountCard from "./AccountCard";
import TransferModal from "./TransferModal";
import axios from "axios";
import OperationModal from "./OperationModal";
import EntityTable from "../EntityTable";
import {column} from "../Components/Table/ReactTable";
import Tab from "../../Common/Components/Tab/Tab";
import {Nav} from "../../Common/Components/Tab/Nav";

import {
    ChartLine,
    ChartNoAxesColumnIncreasing,
    CircleDollarSign,
    Coins,
    Spade,
    Timer,
    TrendingDown,
    TrendingUp,
    Trophy
} from "lucide-react";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import {Enum} from "../../Common/utils/common";
import StatCard from "./StatCard";

import ProfitChart from "./ProfitChart";
import {useAlert} from "react-alert";
import SessionHistoryModal from "./SessionHistoryModal";

interface Stats {
    sessionCount: any,
    tourneyCount: any,
    averageSessionDuration: any,
    averageBuyIn: any,
    profitUsd: any,
    roi: any
}

const Analytics = () => {

    //@ts-ignore
    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Дата',
                accessorKey: 'date',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Время',
                accessorKey: 'time',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Счет',
                accessorKey: 'account.label',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Тип операции',
                accessorKey: 'type.label',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Сумма',
                accessorFn: (row: any) => `${row.account.currency.label} ${row.amount}`,
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Баланс',
                accessorFn: (row: any) => `${row.account.currency.label} ${row.balance}`,
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );

    const alert = useAlert()

    const [pokerKingUsdBalance, setPokerKingUsdBalance] = useState("");
    const [pokerDomBalance, setPokerDomBalance] = useState("");
    const [pokerDomUsdBalance, setPokerDomUsdBalance] = useState("");
    const [redStarBalance, setRedStarBalance] = useState("");
    const [redStarUsdBalance, setRedStarUsdBalance] = useState("");
    const [ggUsdBalance, setGgUsdBalance] = useState("");
    const [coinPokerUsdBalance, setCoinPokerUsdBalance] = useState("");
    const [betOnlineUsdBalance, setBetOnlineUsdBalance] = useState("");
    const [usdtBalance, setUsdtBalance] = useState("")
    const [bankAccountBalance, setBankAccountBalance] = useState("");
    const [bankAccountUsdBalance, setBankAccountUsdBalance] = useState("");
    const [totalBalanceUsd, setTotalBalanceUsd] = useState("")

    const [roomOptions, setRoomOptions] = useState([]);
    const [roomOption, setRoomOption] = useState<Enum | null> ({value: undefined, label:"Все румы"});
    const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
    const [dateTo, setDateTo] = useState<Date | undefined>(new Date())

    const [stats, setStats] = useState<Stats | undefined>()
    const [tableData, setTableData] = useState([])
    const [showTransferModal, setShowTransferModal] = useState(false);
    const onTransferModalOpen = () => {
        setShowTransferModal(true)
    }

    const onTransferModalHide = () => {
        setShowTransferModal(false)
    }

    const [showOperationModal, setShowOperationModal] = useState(false);
    const onOperationModalOpen = () => {
        setShowOperationModal(true)
    }

    const onOperationModalHide = () => {
        setShowOperationModal(false)
    }

    const [showSessionHistoryModal, setShowSessionHistoryModal] = useState(false);
    const onSessionHistoryModalOpen = () => {
        setShowSessionHistoryModal(true)
    }

    const onSessionHistoryModalHide = () => {
        setShowSessionHistoryModal(false)
    }

    const modalCallback = () => {
        fetchBalance()
        fetchTableData()
        alert.success("Операция успешна")
    }

    const fetchBalance = () => {
        axios.get(`${process.env.REACT_APP_API_URL}analytics/balance`)
            .then(response => {
                setPokerKingUsdBalance(response.data.pokerKing)
                setPokerDomBalance(response.data.pokerDom)
                setPokerDomUsdBalance(response.data.pokerDomUsd)
                setRedStarBalance(response.data.redStar)
                setRedStarUsdBalance(response.data.redStarUsd)
                setGgUsdBalance(response.data.gg)
                setCoinPokerUsdBalance(response.data.coinPokerUsd)
                setBetOnlineUsdBalance(response.data.betOnline)
                setUsdtBalance(response.data.usdt)
                setBankAccountBalance(response.data.bankAccount)
                setBankAccountUsdBalance(response.data.bankAccountUsd)
                setTotalBalanceUsd(response.data.totalBalanceUsd)
            })

    }

    const fetchTableData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}analytics/account-operations`)
            .then(response => {
                setTableData(response.data)
            })
    }

    const fetchRooms = () => {
        axios.get(`${process.env.REACT_APP_API_URL}enum/room`)
            .then(response => {
                let roomOptions = response.data
                roomOptions.push({value: undefined, label:"Все румы"})
                setRoomOptions(roomOptions.reverse())
            })
    }

    const fetchStats = () => {
        let filterRequest = {
            dateFrom: dateFrom,
            dateTo: dateTo ? dateTo : new Date(),
            room: roomOption?.value ? roomOption.value : null,
        }

        console.log(filterRequest)
        axios.post(`${process.env.REACT_APP_API_URL}analytics/stats`, filterRequest)
            .then(response => {
                setStats(response.data)
            })
    }

    const handleRoomChange = (event: any) => {
        setRoomOption(event)
    }

    useEffect(() => {
        fetchBalance()
        fetchTableData()
        fetchRooms()
        fetchStats()
    }, [dateTo, dateFrom]);

    return (
        <React.Fragment>
            <div className="grid grid-cols-12 grid-flow-row auto-rows-min gap-x-3 mt-5">
                <AccountCard mainBalance={redStarBalance} secondBalance={redStarUsdBalance} currency="€" logo={redStarLogo}/>
                <AccountCard mainBalance={coinPokerUsdBalance} currency="$" logo={coinPokerLogo}/>
                <AccountCard mainBalance={pokerKingUsdBalance} logo={pokerKingLogo} currency="$"/>
                <div className="card col-span-6 row-span-3 mb-3">
                    <div className="card-body">
                        <div>
                            <Tab.Container defaultActiveKey="stat">
                                <div className="grid grid-cols-6 gap-x-2">
                                <Nav
                                    className="flex col-span-2 flex-wrap w-full text-sm font-medium text-center border-b border-slate-200 dark:border-zink-500 nav-tabs">
                                    <Nav.Item eventKey="stat" className="group">
                                        <a href="#!" data-tab-toggle data-target="stat"
                                           className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">
                                            <ChartNoAxesColumnIncreasing className="inline-block size-4 mr-1"></ChartNoAxesColumnIncreasing><span className="align-middle">Статистика</span></a>
                                    </Nav.Item>
                                    <Nav.Item eventKey="graph" className="group">
                                        <a href="#!" data-tab-toggle data-target="graph"
                                           className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">
                                            <ChartLine className="inline-block size-4 mr-1"></ChartLine><span className="align-middle">График</span></a>
                                    </Nav.Item>
                                </Nav>
                                <div className="flex col-span-4 place-self-end ">
                                    <Select
                                        className="w-full text-center me-2"
                                        placeholder="Все румы"
                                        options={roomOptions}
                                        value={roomOption}
                                        onChange={handleRoomChange}
                                    />
                                    <Flatpickr
                                        options={{
                                            dateFormat: "d.m.y",
                                        }}
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e[0])}
                                        placeholder="От"
                                        className="form-input w-3/4 text-center rounded-full border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    />
                                    <Flatpickr
                                        options={{
                                            dateFormat: "d.m.y",
                                        }}
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e[0])}
                                        placeholder="До"
                                        className="form-input ms-2 w-3/4 text-center rounded-full border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    />

                                </div>
                                </div>
                                <Tab.Content className="mt-3 tab-content">
                                    <Tab.Pane eventKey="stat" id="stat">
                                        <div className="grid grid-cols-6 grid-flow-row auto-rows-min gap-x-3 mt-2 gap-y-3 -mb-5 ">
                                            <StatCard value={stats?.sessionCount} title="Сессии" color="slate" icon={<Spade size={33}/>}/>
                                            <StatCard value={stats?.tourneyCount} title="Турниры" color="amber" icon={<Trophy size={33}/>}/>
                                            <StatCard value={stats?.averageSessionDuration} title="Ср. продолжительность" color="purple" icon={<Timer size={33}/>}/>
                                            <StatCard value={'$' + stats?.averageBuyIn} title="Cр. бай-ин" color="sky" icon={<Coins size={33}/>}/>
                                            <StatCard value={'$' + Math.abs(stats?.profitUsd)} title="Профит" color="green" secondColor="red" icon={<CircleDollarSign size={33}/>} secondIcon={<CircleDollarSign size={33}/>} secondTitle="Проигрыш" isSecondIcon={stats?.profitUsd < 0} />
                                            <StatCard value={stats?.roi + '%'} title="ROI" color="lime" secondColor="pink" icon={<TrendingUp size={33}/>} secondIcon={<TrendingDown size={33}/>} secondTitle="ROI" isSecondIcon={stats?.roi < 0}/>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="graph" id="graph">
                                        <ProfitChart chartId="profitChart"/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
                <AccountCard mainBalance={betOnlineUsdBalance} logo={betOnlineLogo} currency="$"/>
                <AccountCard mainBalance={pokerDomBalance} secondBalance={pokerDomUsdBalance}
                             currency="₽" logo={pokerdomLogo}/>

                <AccountCard mainBalance={ggUsdBalance} logo={ggLogo} currency="$"/>
                <AccountCard mainBalance={bankAccountBalance}
                             secondBalance={bankAccountUsdBalance} currency="₽" logo={tinkoffLogo}/>
                <AccountCard mainBalance={usdtBalance} logo={usdtLogo} currency="$"/>
                <div className="card mb-3 col-span-2">
                    <div className="grid grid-cols-2 grid-flow-row content-center auto-rows-min gap-x-6 gap-y-5 mt-8">
                        <span
                            className="py-2 px-2.5 content-center text-center ms-6 text-base border font-bold rounded bg-slate-600 border-slate-600 text-white">
                            {'$ ' + totalBalanceUsd}</span>
                        <button
                            onClick={onSessionHistoryModalOpen}
                            type="button"
                            className="text-white me-6 btn text-base bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            История сессий
                        </button>
                        <button
                            onClick={onTransferModalOpen}
                            type="button"
                            className="px-2.5 py-2 ms-6 ltr:pl-[calc(theme('spacing.2')_*_5.5)] rtl:pr-[calc(theme('spacing.2')_*_5.5)] text-base relative text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            <i className="ri-add-circle-line w-1/3 text-lg  bg-white/10 flex absolute ltr:-left-[1px] rtl:-right-[1px] -bottom-[1px] -top-[1px] items-center justify-center"></i>Перевод
                        </button>
                        <button
                            onClick={onOperationModalOpen}
                            type="button"
                            className="text-white me-6 btn text-base bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            Другие операции
                        </button>

                    </div>
                </div>
                <div className="card col-span-12 mt-2">
                    <div className="card-body">
                        <h6 className="mb-4 text-15">История операций</h6>

                        <EntityTable
                            isPagination={true}
                            isSelect={true}
                            isGlobalFilter={true}
                            columns={(columns || [])}
                            data={(tableData || [])}
                            customPageSize={10}
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
                    </div>
                </div>

                <TransferModal show={showTransferModal} onHide={onTransferModalHide} callback={modalCallback}/>
                <OperationModal show={showOperationModal} onHide={onOperationModalHide} callback={modalCallback}/>
                <SessionHistoryModal show={showSessionHistoryModal} onHide={onSessionHistoryModalHide}/>
            </div>

        </React.Fragment>
    );
}

export default Analytics;
