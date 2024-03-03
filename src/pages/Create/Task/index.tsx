import React from 'react';
import Modal from "../../../Common/Components/Modal";
import Flatpickr from "react-flatpickr";
import {Russian} from "flatpickr/dist/l10n/ru.js"
import {Clock} from "lucide-react";

interface props {
    show: boolean;
    onHide: any;
}


const Task: React.FC<props> = ({ show, onHide}) => {

    const today = new Date()

    const addMinutes = (date: Date, minutes: number): Date => {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() + minutes);
        return result;
    };


    return (
        <React.Fragment>
            <Modal show={show} onHide={onHide} id="largeModal" modal-center="true"
                   className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                   dialogClassName="w-screen md:w-[40rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header
                    className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Создание задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">

                    {/*<div className='grid items-center grid-rows-3 gap-3'>*/}
                    {/*    <div>*/}
                    <h6 className="mb-4 text-15">Дата и время</h6>
                    <div className="grid items-center grid-cols-1 gap-4 xl:grid-cols-2">
                        <Flatpickr
                            options={{
                                locale: Russian,
                                defaultDate: today,
                                dateFormat: "d.M.Y",
                            }}
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                        />
                        <div className="flex items-center">
                                  <span
                                      className="inline-block px-3 py-2 border ltr:border-r-0 rtl:border-l-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-l-md rtl:rounded-r-md"> <Clock opacity='0.5'/> </span>
                            <div className="grid items-center grid-cols-1 gap-3 xl:grid-cols-2">
                                <Flatpickr
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        defaultDate: today.getTime(),
                                        time_24hr: true,
                                    }}
                                    placeholder="Select Time"
                                    className="ltr:rounded-l-none rtl:rounded-r-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                                <Flatpickr
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        defaultDate: addMinutes(today, 30).getTime(),
                                        time_24hr: true,
                                    }}
                                    placeholder="Select Time"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
                    <br/>

                    {/*<div>*/}
                    <div className="grid items-center grid-cols-2 gap-1 ">
                        <div>
                            <h6 className="mb-4 text-15 text-align:left">Тип</h6>
                        </div>
                        <div>
                            <h6 className="mb-4 text-15 text-align:right">Приоритет</h6>
                        </div>
                    </div>

                    <div className="grid gap-1 grid-cols-2">
                        <div className="grid items-center grid-rows-2 gap-1">
                            <div className="grid gap-1 grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <input id="checkboxCircle1"
                                           className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500"
                                           type="checkbox" value=""/>
                                    <label htmlFor="checkboxCircle1" className="align-middle">
                                        Звонок
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input id="checkboxCircle1"
                                           className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500"
                                           type="checkbox" value=""/>
                                    <label htmlFor="checkboxCircle1" className="align-middle">
                                        Встреча
                                    </label>
                                </div>

                            </div>
                            <div className="grid gap-1 grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <input id="checkboxCircle1"
                                           className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500"
                                           type="checkbox" value=""/>
                                    <label htmlFor="checkboxCircle1" className="align-middle">
                                        Письмо
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input id="checkboxCircle1"
                                           className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500"
                                           type="checkbox" value=""/>
                                    <label htmlFor="checkboxCircle1" className="align-middle">
                                        Другое
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="grid items-center grid-cols-3 gap-1">
                            <div className='row-start-1'>
                                <div className="flex items-center gap-2">

                                    <input id="radioBordered6"
                                           className="size-4 bg-white border rounded-full appearance-none cursor-pointer dark:bg-zink-700 border-slate-200 dark:border-zink-500 checked:bg-red-500 checked:border-red-500 dark:checked:bg-red-400 dark:checked:border-red-400"
                                           type="radio" value=""/>
                                    <label htmlFor="radioBordered6" className="align-middle">
                                        высокий
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input id="radioBordered3"
                                           className="size-4 bg-white border rounded-full appearance-none cursor-pointer dark:bg-zink-700 border-slate-200 dark:border-zink-500 checked:bg-orange-500 checked:border-orange-500 dark:checked:bg-orange-400 dark:checked:border-orange-400"
                                           type="radio" value=""/>
                                    <label htmlFor="radioBordered3" className="align-middle">
                                        обычный
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input id="radioBordered2"
                                           className="size-4 bg-white border rounded-full appearance-none cursor-pointer dark:bg-zink-700 border-slate-200 dark:border-zink-500 checked:bg-green-500 checked:border-green-500 dark:checked:bg-green-400 dark:checked:border-green-400"
                                           type="radio" value=""/>
                                    <label htmlFor="radioBordered2" className="align-middle">
                                        низкий
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*</div>*/}
                    <br/>
                    {/*<div>*/}
                    <h6 className="mb-4 text-15">Ответственный</h6>
                    <div>
                        <select
                            className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                            <option defaultValue="true">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    {/*</div>*/}
                    <br/>
                    <h6 className="mb-4 text-15">Задача</h6>
                    <div>
                        <textarea
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            id="textArea" rows={4}></textarea>
                    </div>

                </Modal.Body>
                <Modal.Footer
                    className="flex items-center justify-between p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                    <button type="button"
                            className="text-white bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10">
                        Сохранить
                    </button>
                    <button type="button"
                            className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">
                        Отмена
                    </button>

                </Modal.Footer>
            </Modal>


        </React.Fragment>
    );
};

export default Task;
