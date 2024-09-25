import React, {useEffect, useState} from "react"
import Modal from "../../../Common/Components/Modal";
import {DollarSign, Euro, RussianRuble} from "lucide-react";
import Select from "react-select";
import {ModalProps} from "../../../Common/utils/common";
import axios from "axios";
import {useAlert} from "react-alert";

const OperationModal = ({
                           show,
                           onHide,
                           callback
                       }: ModalProps) => {

    useEffect(() => {
        fetchOperationTypeOptions()
        fetchAccountOptions()

    }, [])

    const fetchAccountOptions = () => {
        axios.get(`${process.env.REACT_APP_API_URL}enum/account`)
            .then(response => {
                setAccountOptions(response.data)
            })
    }


    const fetchOperationTypeOptions = () => {
        axios.get(`${process.env.REACT_APP_API_URL}enum/operation-type`)
            .then(response => {
                setOperationTypeOptions(response.data)
            })
    }

    const alert = useAlert()

    const [accountOptions, setAccountOptions] = useState([]);
    const [operationTypeOptions, setOperationTypeOptions] = useState([]);
    const [operationTypeOption, setOperationTypeOption] = useState()
    const [operationType, setOperationType] = useState("")
    const [account, setAccount] = useState("")
    const [accountOption, setAccountOption] = useState()
    const [value, setValue] = useState("")
    const [currency, setCurrency] = useState('')


    const handleOperationTypeChange = (event: any) => {
        setOperationTypeOption(event)
        setOperationType(event.value)
        console.log(event)
    }

    const handleAccountChange = (event: any) => {
        setAccountOption(event)
        setAccount(event.value)
        setCurrency(event.currency.value)
    }

    const handleClose = () => {
        // @ts-ignore
        setOperationTypeOption('')
        setOperationType("")
        setAccount("")
        // @ts-ignore
        setAccountOption('')
        setValue("")
        setCurrency("")
        onHide()
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

    const handleSave = () => {
        let request = {
            account: account,
            type: operationType,
            amount: value
        }

        console.log(request)
        axios.post(`${process.env.REACT_APP_API_URL}analytics/operation`, request)
            .then(response => {
                console.log(response)
                handleClose()
                callback()
            })
            .catch(error => {
                alert.error("Ошибка операции")
            })
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} id="largeModal" modal-center="true"
                   className="fixed flex flex-col modal transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-screen md:w-full bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header
                    className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Операции</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <div className="grid grid-flow-row auto-rows-min gap-y-4 m-2 mt-0 mb-3">
                        <div>
                            <label htmlFor="from"
                                   className="inline-block text-base italic mb-1 text-right">Счет</label>
                            <Select placeholder=""
                                    options={accountOptions}
                                    value={accountOption}
                                    maxMenuHeight={152}
                                    onChange={handleAccountChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="from"
                                   className="inline-block text-base italic mb-1 text-right">Тип</label>
                            <Select placeholder=""
                                    options={operationTypeOptions}
                                    value={operationTypeOption}
                                    menuPlacement="top"
                                    maxMenuHeight={116}
                                    onChange={handleOperationTypeChange}
                            />
                        </div>

                        {/*<div className="grid grid-flow-row gap-x-2">*/}
                        {/*<label htmlFor="inputPlaceholder"*/}
                        {/*       className="col-span-2 inline-block text-base italic text-left">Ушло</label>*/}
                        <div className="grid grid-cols-6 gap-x-2">
                            {/*<p className="flex justify-center items-center text-lg font-semibold">$</p>*/}
                            <span
                                className="flex items-center justify-center size-10 text-xs font-medium border border-transparent rounded-full bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:border-transparent">
                                {renderCurrencyIcon(currency)}</span>

                            <input type="number"
                                   value={value}
                                   onChange={(e) => {
                                       setValue(e.target.value)
                                   }}
                                   id="inputPlaceholder"
                                   className="form-input col-span-5 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                   placeholder=""/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer
                    className="flex items-center justify-between p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                    <button type="button"
                            onClick={handleSave}
                            className="text-lime-600 w-full font-semibold bg-lime-100  btn hover:text-white hover:bg-lime-600 focus:text-white focus:bg-lime-600 focus:ring focus:ring-lime-100 active:text-white active:bg-lime-600 active:ring active:ring-lime-100 dark:ring-lime-400/10">
                        Сохранить
                    </button>

                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default OperationModal
