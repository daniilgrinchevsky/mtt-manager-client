import React, {Fragment} from "react"

interface StatCardProps {
    value: string,
    title: string,
    color: string,
    isSecondIcon?: boolean,
    secondColor?: string,
    secondTitle?: string,
    secondIcon?: React.ReactNode,
    icon: React.ReactNode,
}

const StatCard = ({
    value,
    title,
    icon,
    color,
    isSecondIcon,
    secondColor,
    secondTitle,
    secondIcon,
}: StatCardProps) => {


    const getCard = () => {
        if (isSecondIcon) {
            return (
                <Fragment>
                    <div
                        className={`flex items-center justify-center mx-auto rounded-full size-16 bg-${secondColor}-100 text-${secondColor}-500 dark:bg-slate-500/20`}>
                        {secondIcon}
                    </div>
                    <h5 className="mt-2 mb-0">{value}</h5>
                    <p className="text-slate-500 mt-0.5 dark:text-zink-200">{secondTitle}</p>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div
                        className={`flex items-center justify-center mx-auto rounded-full size-16 bg-${color}-100 text-${color}-100 text-${color}-500 dark:bg-slate-500/20`}>
                        {icon}
                    </div>
                    <h5 className="mt-2 mb-0">{value}</h5>
                    <p className="text-slate-500 mt-0.5 dark:text-zink-200">{title}</p>
                </Fragment>
            )
        }
    }


    return (
        <React.Fragment>
            <div className="card mb-3 border-solid border-2 h-full shadow-none border-slate-100  col-span-2">
                <div className="text-center card-body h-full m-0">
                    {getCard()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatCard
