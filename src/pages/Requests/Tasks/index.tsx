import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";
import {Dropdown} from "../../../Common/Components/Dropdown";
import {CalendarDays} from "lucide-react";

import Flatpickr from "react-flatpickr";
import {Russian} from "flatpickr/dist/l10n/ru";


const Tasks = () => {

    return (
        <React.Fragment>
            {/*<div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">*/}
                <MyBreadCrumb title={PAGE.REQUEST_TASKS.title} parentTitle='Заявки'/>

                {/*<div className="grid grid-rows-2">*/}
                    <div className="card">
                        <div className="card-body">
                            <div className='grid items-center relative grid-cols-8 gap-0'>
                                <div className="flex flex-wrap items-center gap-2">
                                    <button type="button"
                                            className="px-2.5 py-2 ltr:pl-[calc(theme('spacing.2')_*_5.5)] rtl:pr-[calc(theme('spacing.2')_*_5.5)] text-base relative text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                        <i className="ri-add-circle-line w-[34px] bg-white/10 flex absolute ltr:-left-[1px] rtl:-right-[1px] -bottom-[1px] -top-[1px] items-center justify-center"></i> Создать
                                    </button>
                                </div>
                                <div className="flex flex-wrap items-center gap-0 col-span-4">
                                    <button type="button"
                                            className="rounded-none text-base text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                        Все
                                    </button>
                                    <button type="button"
                                            className="rounded-none text-base text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                        На сегодня
                                    </button>
                                    <button type="button"
                                            className="rounded-none text-base text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                        Актуальные
                                    </button>
                                    <button type="button"
                                            className="rounded-none text-base text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                        Просроченные
                                    </button>
                                    <button type="button"
                                            className="rounded-none text-base text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                        Завершенные
                                    </button>
                                    <Dropdown className="relative">
                                        <Dropdown.Trigger type='button'
                                                          className="rounded-none text-slate-500 btn bg-slate-200 border-slate-200 hover:text-slate-600 hover:bg-slate-300 hover:border-slate-300 focus:text-slate-600 focus:bg-slate-300 focus:border-slate-300 focus:ring focus:ring-slate-100 active:text-slate-600 active:bg-slate-300 active:border-slate-300 active:ring active:ring-slate-100 dark:bg-zink-600 dark:hover:bg-zink-500 dark:border-zink-600 dark:hover:border-zink-500 dark:text-zink-200 dark:ring-zink-400/50"
                                                          id="calendar" data-bs-toggle="dropdown"><CalendarDays className='h-5 rounded-sm'></CalendarDays>


                                        </Dropdown.Trigger>

                                        <Dropdown.Content placement="right-end" as="ul"
                                                          className="absolute z-50 p-5 mt-1 list-none bg-white rounded-md shadow-md ltr:text-left rtl:text-right dropdown-menu min-w-max dark:bg-zink-600"
                                                          aria-labelledby="calendar">
                                            <div className='grid items-center grid-rows-3 gap-4'>
                                                <Flatpickr
                                                    options={{
                                                        locale: Russian,
                                                        dateFormat: "d.M.Y",
                                                    }}
                                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                />
                                                <Flatpickr
                                                    options={{
                                                        locale: Russian,
                                                        dateFormat: "d.M.Y",
                                                    }}

                                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                />
                                                <button type="button"
                                                        className="rounded-full py-1 text-base px-1.5 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                                    Применить
                                                </button>
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                <div className="flex flex-wrap items-center  absolute right-0 gap-2 col-span-3">
                                    <select
                                        className="size-min form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                        <option value="" selected>тип</option>
                                        <option value="1">звонок</option>
                                        <option value="2">письмо</option>
                                        <option value="3">встреча</option>
                                        <option value="4">другое</option>
                                    </select>
                                    <select
                                        className="size-auto form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                        <option value="" selected>приоритет</option>
                                        <option value="1">низкий</option>
                                        <option value="2">обычный</option>
                                        <option value="3">высокий</option>
                                    </select>
                                    {/*<div className="absolute right-0">*/}
                                    <select
                                        className="size-auto form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                        <option value="1">все сотрудники</option>
                                        <option value="2">общие задачи
                                        </option>
                                    </select>
                                    {/*</div>*/}
                                </div>
                                {/*<div className="flex flex-wrap items-center gap-2 rtl">*/}
                                {/*    <select*/}
                                {/*        className="size-auto form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">*/}
                                {/*        <option value="1">все сотрудники</option>*/}
                                {/*        <option value="2">общие задачи*/}
                                {/*        </option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="ltr:text-left rtl:text-right ">
                                    <tr>
                                        {/*<th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500">Order*/}
                                        {/*    ID*/}
                                        {/*</th>*/}
                                        <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500">Дата и время</th>
                                        <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500">Обращение/Заявка/Турист</th>
                                        <th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500">Задача</th>
                                        {/*<th className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500">Action</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="transition-all duration-300 ease-linear hover:bg-slate-50 dark:hover:bg-zink-600">
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Flipkart</td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Bettie
                                            Johson
                                        </td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">$1,350</td>
                                    </tr>
                                    <tr className="transition-all duration-300 ease-linear hover:bg-slate-50 dark:hover:bg-zink-600">
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Flipkart</td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Bettie
                                            Johson
                                        </td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">$1,350</td>
                                    </tr>
                                    <tr className="transition-all duration-300 ease-linear hover:bg-slate-50 dark:hover:bg-zink-600">
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Flipkart</td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">Bettie
                                            Johson
                                        </td>
                                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500">$1,350</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            {/*</div>*/}
            {/*</div>*/}
        </React.Fragment>
    );
};

export default Tasks;
