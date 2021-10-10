import {makeAutoObservable} from "mobx";
import {DepositKind, IDeposit, TotalSum} from "../types/deposit";
import {ChangeEvent} from "react";

class Deposit implements IDeposit{
    depositKind = {code: "standart", name: "Стандартный"}
    depositKindsList = [
        {code: "unic", name: "Универсальный"},
        {code: "standart", name: "Стандартный"},
        {code: "replenish", name: "Пополняемый",}
    ]
    depositPeriod = 1
    depositSum = 100000
    percentageRate = 4.0
    constructor() {
        makeAutoObservable(this)
    }

    depositKindChange = (e: ChangeEvent<{ name?: string | undefined; value: DepositKind | unknown}>) => {
        const {value} = e.target
        this.depositKind = value as DepositKind
    }

    depositPeriodChange = (days: number) => {
        this.depositPeriod = days
    }

    depositSumChange = (sum: number) => {
        this.depositSum = sum
    }

    percentageRateChange = (days: number) => {
        if (days > 10) {
            this.percentageRate = 5
            return this.percentageRate.toFixed(1)
        }
        else {
            this.percentageRate = 4
            return this.percentageRate.toFixed(1)
        }
    }

    totalSum = ({depValue, percentageRate, daysValue, daysInYear, toPercent}: TotalSum) => {
        return depValue + (depValue * percentageRate * daysValue / daysInYear / toPercent)
    }
}

export default new Deposit;