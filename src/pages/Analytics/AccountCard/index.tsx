import React, {useEffect, useState} from "react";

interface AccountCardProps {
    mainBalance: string,
    secondBalance?: string,
    currency: string,
    logo: any
}

const AccountCard = ({
    mainBalance,
    secondBalance,
    currency,
    logo
}: AccountCardProps) => {

    useEffect(() => {
        setActiveBalance(mainBalance)
        setActiveCurrency(currency)
    }, [mainBalance, currency]);

    const [activeBalance, setActiveBalance] = useState<string>('')
    const [activeCurrency, setActiveCurrency] = useState<string>('')

    const handleLogoClick = () => {
        if (secondBalance) {
            let newCurrencyLabel = activeBalance === mainBalance ? '$' : currency
            setActiveCurrency(newCurrencyLabel)
            let newActiveBalance = activeBalance === mainBalance ? secondBalance : mainBalance
            setActiveBalance(newActiveBalance)
        }
    }

    return (
        <React.Fragment>
            <div className="card mb-3 col-span-2">
                <div className="card-body">
                    <div className="grid grid-cols-2 justify-items-center items-center">
                        <div className="flex justify-center items-center row-span-2">
                            <img onClick={handleLogoClick} className="size-full w-2/3 rounded-lg" src={logo} alt=""/>
                        </div>
                        <div className="row-span-2">
                            <strong className="text-xl select-none text-center">{activeCurrency + ' ' + activeBalance}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AccountCard;
