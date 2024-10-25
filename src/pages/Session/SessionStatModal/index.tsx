import React, {Fragment} from "react"
import {ModalProps, SessionStat} from "../../../Common/utils/common";
import Modal from "../../../Common/Components/Modal";
import CountUp from "react-countup";
import {CircleDollarSign, Coins, Timer, TrendingDown, TrendingUp, Trophy} from "lucide-react";


interface SessionStatModalProps extends ModalProps {
    stat: SessionStat
}


const SessionStatModal = ({
    stat,
    show,
    onHide,
}: SessionStatModalProps) => {



    const getProfitCard = () => {

        if (stat.profit < 0) {
            return (
                <Fragment>
                    <div
                        className="flex items-center justify-center mx-auto rounded-full size-12 bg-red-100 text-red-500 dark:bg-red-500/20">
                        <TrendingDown />
                    </div>
                    <h5 className="mt-1 mb-1">$
                        <CountUp end={Math.abs(stat.profit)} decimals={2} className="counter-value"/>
                        </h5>
                    <p className="text-slate-500 dark:text-zink-200">Проигрыш</p>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div
                        className="flex items-center justify-center mx-auto rounded-full size-12 bg-lime-100 text-lime-500 dark:bg-emerald-500/20">
                        <TrendingUp/>
                    </div>
                    <h5 className="mt-1 mb-1">$
                        <CountUp end={stat.profit} decimals={2} className="counter-value"/>
                    </h5>
                    <p className="text-slate-500 dark:text-zink-200">Профит</p>
                </Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={onHide} id="largeModal" modal-center="true"
                   className="fixed flex flex-col modal transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-max bg-slate-100 shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header
                    className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Статистика</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 pb-0 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="card">
                            <div className="text-center card-body">
                                <div
                                    className="flex items-center justify-center mx-auto rounded-full size-12 bg-purple-100 text-purple-500 dark:bg-slate-500/20">
                                    <Timer />
                                </div>
                                <h5 className="mt-1 mb-1">{stat.duration}</h5>
                                <p className="text-slate-500 dark:text-zink-200">Продолжительность</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="text-center card-body">
                                <div
                                    className="flex items-center justify-center mx-auto rounded-full size-12 bg-amber-100 text-amber-500 dark:bg--500/20">
                                        <Trophy />
                                </div>
                                <h5 className="mt-1 mb-1">
                                    <CountUp end={stat.tourneyCount} decimals={0} className="counter-value"/>
                                    </h5>
                                <p className="text-slate-500 dark:text-zink-200">Турниры</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="text-center card-body">
                                <div
                                    className="flex items-center justify-center mx-auto rounded-full size-12 bg-sky-100 text-sky-500 dark:bg-custom-500/20">
                                    <Coins />
                                </div>
                                <h5 className="mt-1 mb-1">$
                                    <CountUp end={stat.totalBuyInsUsd} decimals={2} className="counter-value"/>
                                    </h5>
                                <p className="text-slate-500 dark:text-zink-200">Бай-ины</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="text-center card-body">
                                <div
                                    className="flex items-center justify-center mx-auto rounded-full size-12 bg-green-100 text-green-500 dark:bg-green-500/20">
                                    <CircleDollarSign />
                                </div>
                                <h5 className="mt-1 mb-1">$
                                    <CountUp end={stat.totalWinningsUsd} decimals={2} className="counter-value"/>
                                    </h5>
                                <p className="text-slate-500 dark:text-zink-200">Выигрыши</p>
                            </div>
                        </div>
                        <div className="card col-span-2">
                            <div className="text-center card-body">

                                {getProfitCard()}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default SessionStatModal
