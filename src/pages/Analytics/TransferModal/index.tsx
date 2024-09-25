import React, {useEffect, useState} from "react"
import Modal from "../../../Common/Components/Modal";
import {DollarSign, Euro, RussianRuble} from "lucide-react";
import Select from "react-select";
import {ModalProps} from "../../../Common/utils/common";
import axios from "axios";
import {useAlert} from "react-alert";

const TransferModal = ({
                           show,
                           onHide,
                           callback
                       }: ModalProps) => {

    useEffect(() => {
        // fetchCurrencyOptions()
        fetchAccountOptions()

    }, [])

    const fetchAccountOptions = () => {
        axios.get(`${process.env.REACT_APP_API_URL}enum/account`)
            .then(response => {
                console.log(response.data)
                setAccountOptions(response.data)
            })
    }

    const alert = useAlert()

    const [accountOptions, setAccountOptions] = useState([]);
    const [accountFrom, setAccountFrom] = useState("")
    const [accountFromOption, setAccountFromOption] = useState()
    const [accountTo, setAccountTo] = useState("")
    const [accountToOption, setAccountToOption] = useState()
    const [valueFrom, setValueFrom] = useState("")
    const [valueTo, setValueTo] = useState("")
    const [currencyFrom, setCurrencyFrom] = useState('')
    const [currencyTo, setCurrencyTo] = useState('')
    const [commission, setCommission] = useState("")

    const handleAccountFromChange = (event: any) => {
        setAccountFromOption(event)
        setAccountFrom(event.value)
        setCurrencyFrom(event.currency.value)
    }

    const handleAccountToChange = (event: any) => {
        setAccountToOption(event)
        setAccountTo(event.value)
        setCurrencyTo(event.currency.value)
    }

    const handleClose = () => {
        setAccountFrom("")
        // @ts-ignore
        setAccountFromOption('')
        setAccountTo("")
        // @ts-ignore
        setAccountToOption("")
        setValueFrom("")
        setValueTo("")
        setCurrencyTo("")
        setCurrencyTo("")
        setCommission("")
        onHide()
    }

    const handleSave = () => {
        let request = {
            accountFrom: accountFrom,
            accountTo: accountTo,
            valueFrom: valueFrom,
            valueTo: valueTo,
            commission: commission
        }

        axios.post(`${process.env.REACT_APP_API_URL}analytics/transfer`, request)
            .then(response => {
                console.log(response)
                handleClose()
                callback()
            })
            .catch(error => {
                alert.error("Ошибка операции")
            })
    }

    const renderCurrencyIcon = (currency: any) => {
        if (currency === 'USD') {
            return (
                <DollarSign className="size-1/2"></DollarSign>
            )
        }
        if (currency === 'EUR') {
            return (
                <Euro className="size-1/2"></Euro>
            )
        }
        if (currency === 'RUB') {
            return (
                <RussianRuble className="size-1/2"></RussianRuble>
            )
        }
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} id="largeModal" modal-center="true"
                   className="fixed flex flex-col modal transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-screen md:w-full bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header
                    className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">
                        {/*Создать перевод*/}
                        <button type="button"
                                className="bg-white text-end -m-2.5 text-16 -mb-3 -mt-3 text-black btn hover:text-black hover:bg-slate-100 focus:text-black-500 focus:bg-slate-100 active:text-black-500 active:bg-slate-100 dark:bg-zink-700 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10">
                            Создать перевод
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <div className="grid grid-flow-row auto-rows-min gap-y-4 m-2 mt-0 mb-3">
                        <div>

                            <label htmlFor="from"
                                   className="inline-block text-base italic mb-1 text-right">Откуда</label>
                            <Select placeholder=""
                                    options={accountOptions}
                                    value={accountFromOption}
                                    onChange={handleAccountFromChange}
                            />
                        </div>
                        {/*<div className="grid grid-flow-row gap-x-2">*/}
                            {/*<label htmlFor="inputPlaceholder"*/}
                            {/*       className="col-span-2 inline-block text-base italic text-left">Ушло</label>*/}
                        <div className="grid grid-cols-6 gap-x-2">
                            {/*<p className="flex justify-center items-center text-lg font-semibold">$</p>*/}
                            <span
                                className="flex items-center justify-center size-10 text-xs font-medium border border-transparent rounded-full bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:border-transparent">
                                {renderCurrencyIcon(currencyFrom)}</span>

                            <input type="number"
                                   value={valueFrom}
                                   onChange={(e) => {
                                       setValueFrom(e.target.value)
                                   }}
                                   id="inputPlaceholder"
                                   className="form-input col-span-5 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                   placeholder=""/>
                        </div>
                        {/*</div>*/}
                        <div>
                            <label htmlFor="from" className="inline-block text-base mb-1 italic text-left">Куда</label>
                            <Select placeholder=""
                                    options={accountOptions}
                                    value={accountToOption}
                                    maxMenuHeight={152}
                                    onChange={handleAccountToChange}
                            />
                        </div>

                        {/*<div className="grid grid-flow-row gap-y-2 gap-x-2">*/}
                        {/*    <label htmlFor="inputPlaceholder"*/}
                        {/*           className="col-span-2 inline-block text-base italic text-left">Пришло</label>*/}

                        <div className="grid grid-cols-6 gap-x-2">
                            {/*<p className="flex justify-center items-center text-lg font-semibold">$</p>*/}
                            <span
                                className="flex items-center justify-center size-10 text-xs font-medium border border-transparent rounded-full bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:border-transparent">
                                {renderCurrencyIcon(currencyTo)}</span>
                            <input type="number"
                                   value={valueTo}
                                   onChange={(e) => {
                                       setValueTo(e.target.value)
                                   }}
                                   id="inputPlaceholder"
                                   className="form-input col-span-5 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                   placeholder=""/>

                        </div>

                        {/*<Select placeholder=""*/}
                        {/*        menuPlacement="top"*/}
                        {/*        options={currencyOptions}*/}
                        {/*        value={currencyToOption}*/}
                        {/*        onChange={handleCurrencyToChange}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        {/*<div className="grid grid-flow-row gap-y-2 gap-x-2">*/}
                        <div>
                            <label htmlFor="inputPlaceholder"
                                   className="col-span-2 inline-block text-base italic text-left">Комиссия</label>
                        </div>


                        <div className="grid grid-cols-6 gap-x-2 -mt-3">
                            {/*<p className="flex justify-center items-center text-lg font-semibold">$</p>*/}
                            <span
                                className="flex items-center justify-center size-10 text-xs font-medium border border-transparent rounded-full bg-pink-100 text-pink-500 dark:bg-pink-500/20 dark:border-transparent">
                                {renderCurrencyIcon(currencyFrom)}</span>
                            <input type="number"
                                   value={commission}
                                   id="inputPlaceholder"
                                   onChange={(e) => {
                                       setCommission(e.target.value)
                                   }}
                                   className="form-input col-span-5 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                   placeholder=""/>

                            {/*<Select placeholder=""*/}
                            {/*        menuPlacement="top"*/}
                            {/*        options={currencyOptions}*/}
                            {/*        value={currencyCommissionOption}*/}
                            {/*        onChange={handleCurrencyCommissionChange}*/}
                            {/*/>*/}
                        </div>
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <label htmlFor="from" className="inline-block mb-2 text-base font-medium">Неучтенное</label>*/}
                        {/*    <Select placeholder=""*/}

                        {/*        // options={roomOptions}*/}
                        {/*        // value={roomOption}*/}
                        {/*        // onChange={handleRoomChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </Modal.Body>
                <Modal.Footer
                    className="flex items-center justify-between p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                    <button type="button"
                            onClick={handleSave}
                            className="text-lime-600 w-full font-semibold bg-lime-100  btn hover:text-white hover:bg-lime-600 focus:text-white focus:bg-lime-600 focus:ring focus:ring-lime-100 active:text-white active:bg-lime-600 active:ring active:ring-lime-100 dark:ring-lime-400/10">
                        Сохранить
                    </button>
                    {/*<button onClick={onHide}*/}
                    {/*        type="button"*/}
                    {/*        className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">*/}
                    {/*    Отмена*/}
                    {/*</button>*/}

                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default TransferModal
