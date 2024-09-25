import React, {useEffect, useState} from "react";
import {getColorFromPriority, SessionTourneyRow} from "../../../Common/utils/common";
import Counter from "../../../Common/Components/Counter";

interface TourneyRowProps {
    row: SessionTourneyRow,
    deleteRowHandler: any,
}

const TourneyRow = ({
    row,
    deleteRowHandler,
}: TourneyRowProps) => {

    const getNameLabelClass = (priority: string | undefined) => {
        let color = getColorFromPriority(priority)
        let colorToStyle = new Map<string, string> ([
            ['lime', "px-2.5 py-0.5 inline-block col-span-4 text-center truncate text-s font-medium rounded border bg-lime-100 border-transparent text-lime-500 dark:bg-lime-500/20 dark:border-transparent"],
            ['green', "px-2.5 py-0.5 inline-block col-span-4 text-center truncate text-s font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"],
            ['sky', "px-2.5 py-0.5 inline-block col-span-4 text-center truncate text-s font-medium rounded border bg-sky-100 border-transparent text-sky-500 dark:bg-sky-500/20 dark:border-transparent"],
            ['amber', "px-2.5 py-0.5 inline-block col-span-4 text-center truncate text-s font-medium rounded border bg-amber-100 border-transparent text-amber-500 dark:bg-amber-500/20 dark:border-transparent"],
            ['red', "px-2.5 py-0.5 inline-block col-span-4 text-center truncate text-s font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent"],
        ])
        return colorToStyle.get(color)
    }

    useEffect(() => {
        calculateTotalBuyIn(1)
    }, []);


    const [totalBuyIn, setTotalBuyIn] = useState(row.buyIn);
    const [winnings, setWinnings] = useState("");

    const handleTotalBuyIn = (value: any) => {
        setTotalBuyIn(value)
        row.totalBuyIn = value
    }

    const handleTotalWinnings = (value: any) => {
        setWinnings(value)
        row.totalWinnings = value
    }

    const calculateTotalBuyIn = (count: any) => {
        let totalBuyIn = Number(count) * Number(row.buyIn);
        console.log(count);
        console.log(totalBuyIn);
        setTotalBuyIn(totalBuyIn.toString());
        row.totalBuyIn = totalBuyIn.toString()
        row.entryCount = Number(count)
    }

    const getTimeSpanValue = (row: any) => {
        if (row.timeEnd) {
            return row.timeStart + ' - ' + row.timeEnd
        } else {
            return row.timeStart
        }
    }

    return (
        <React.Fragment>
            <div className="grid grid-flow-col grid-cols-10 gap-x-1 mt-1.5">
                <span
                    className="px-2.5 py-0.5 col-span-2 inline-block text-s text-center font-medium rounded border bg-white text-black dark:bg-black-500/20 dark:border-transparent">
                    {getTimeSpanValue(row)}</span>
                <span
                    className="px-2.5 py-0.5 col-span-1 text-center inline-block text-s font-medium rounded border bg-white text-black dark:bg-black/20 dark:border-transparent">
                    {row.room}</span>
                <span
                    className={getNameLabelClass(row.priority)}
                    style={{cursor: "pointer"}}
                    onClick={() => deleteRowHandler(row)}>
                    {row.name}</span>
                <input type="string"
                       className="visible rounded-full text-center col-span-1 form-input h-6 w-13 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                       required
                       value={totalBuyIn}
                       onChange={(e) => {
                           handleTotalBuyIn(e.target.value)
                       }}
                       placeholder="Бай-ин"/>
                <Counter
                    calculateHandler={calculateTotalBuyIn}
                    initialValue={1}
                    className="inline-flex text-center input-step"
                    inputClass="w-full text-center ltr:pl-2 rtl:pr-2 h-6 border-y product-quantity dark:bg-zink-700 focus:shadow-none dark:border-zink-500"
                    decrementClass="border size-6 leading-[15px] minusBtn bg-white dark:bg-zink-700 dark:border-zink-500 ltr:rounded-l-full rtl:rounded-r-full transition-all duration-200 ease-linear border-slate-200 text-slate-500 dark:text-zink-200 hover:bg-slate-500 dark:hover:bg-zink-500 hover:text-slate-50 dark:hover:text-zink-50 hover:border-slate-500 dark:hover:border-zink-500 focus:bg-slate-500 dark:focus:bg-zink-500 focus:border-slate-500 dark:focus:border-zink-500 focus:text-slate-50 dark:focus:text-zink-50"
                    incrementClass="transition-all duration-200 ease-linear bg-white border dark:bg-zink-700 dark:border-zink-500 ltr:rounded-r-full rtl:rounded-l-full size-6 border-slate-200 plusBtn text-slate-500 dark:text-zink-200 hover:bg-slate-500 dark:hover:bg-zink-500 hover:text-slate-50 dark:hover:text-zink-50 hover:border-slate-500 dark:hover:border-zink-500 focus:bg-slate-500 dark:focus:bg-zink-500 focus:border-slate-500 dark:focus:border-zink-500 focus:text-slate-50 dark:focus:text-zink-50"
                />
                <input type="string"
                       className="visible rounded-full text-center col-span-1 form-input h-6 w-13 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                       required
                       value={winnings}
                       onChange={(e) => {
                           handleTotalWinnings(e.target.value)
                       }}
                       placeholder=""/>
            </div>
        </React.Fragment>
    )
}

export default TourneyRow;
