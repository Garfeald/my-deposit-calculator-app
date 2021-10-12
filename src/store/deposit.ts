import {makeAutoObservable} from "mobx";
import {DepositKind, IDeposit, TotalSum} from "../types/deposit";
import {ChangeEvent} from "react";

class Deposit implements IDeposit{
    depositKindCode = "unic"
    depositKindsList = [
        {code: "unic", name: "Универсальный"},
        {code: "standart", name: "Стандартный"},
        {code: "replenish", name: "Пополняемый",}
    ]
    depositPeriod = 1
    depositSum = 0
    percentageRate = 0
    minSliderValue = 0
    minDaysValue = 1
    constructor() {
        makeAutoObservable(this)
    }

    depositKindChange = (e: ChangeEvent<{ name?: string | undefined; value: DepositKind | unknown}>) => {
        const {value} = e.target
        this.depositKindCode = value as string
        this.actualDepositKind(value as string)
    }

    depositPeriodChange = (days: number) => {
        this.depositPeriod = days
    }

    depositSumChange = (sum: number) => {
        this.depositSum = sum
    }

    // Расчёт итоговой суммы

    totalSum = ({depValue, percentageRate, daysValue, daysInYear, toPercent}: TotalSum) => {
        return depValue + (depValue * percentageRate * daysValue / daysInYear / toPercent)
    }

    actualDepositKind = (kind: string) => {
        switch (kind) {
            case 'unic':
                this.minDaysValue = 1
                if(this.depositPeriod < 2){
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 2, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 2.75
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 3
                    }
                }
                if(this.depositPeriod >= 2 && this.depositPeriod < 7) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.25, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 7 && this.depositPeriod < 14) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.5, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.05
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 14 && this.depositPeriod < 21) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.75, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.1
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 21 && this.depositPeriod < 31) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 4, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.15
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 31 && this.depositPeriod < 91) {
                    this.minSliderValue = 500000
                    if(this.depositSum <= 1000000) {
                        return this.depositSum = 500000, this.percentageRate = 4.9, this.minSliderValue = 500000
                    }
                    if(this.depositSum >= 1000000 && this.depositSum <= 7999999) {
                        return this.percentageRate = 5.15
                    }
                    if(this.depositSum >= 8000000) {
                        return this.percentageRate = 5.4
                    }
                }
                if(this.depositPeriod >= 91) {
                    this.minSliderValue = 500000
                    if(this.depositSum <= 1000000) {
                        return this.depositSum = 500000, this.percentageRate = 4.8, this.minSliderValue = 500000
                    }
                    if(this.depositSum >= 1000000 && this.depositSum <= 7999999) {
                        return this.percentageRate = 5.05
                    }
                    if(this.depositSum >= 8000000) {
                        return this.percentageRate = 5.3
                    }
                }
                break
            case 'standart':
                this.minDaysValue = 1
                if(this.depositPeriod < 2){
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 2, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 2.75
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 3
                    }
                }
                else if (this.depositPeriod >= 2 && this.depositPeriod < 7) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.25, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 7 && this.depositPeriod < 14) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.5, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.05
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 14 && this.depositPeriod < 21) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 3.75, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.1
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 21 && this.depositPeriod < 31) {
                    this.minSliderValue = 1000000
                    if(this.depositSum < 1000000) {
                        return this.depositSum = 1000000
                    }
                    if(this.depositSum < 3000000) {
                        return this.percentageRate = 4, this.minSliderValue = 1000000
                    }
                    if(this.depositSum >= 3000000 && this.depositSum <= 4999999) {
                        return this.percentageRate = 4.15
                    }
                    if(this.depositSum >= 5000000) {
                        return this.percentageRate = 4.25
                    }
                }
                if(this.depositPeriod >= 31 && this.depositPeriod < 91) {
                    this.minSliderValue = 500000
                    if(this.depositSum <= 1000000) {
                        return this.depositSum = 500000, this.percentageRate = 5, this.minSliderValue = 500000
                    }
                    if(this.depositSum >= 1000000 && this.depositSum <= 7999999) {
                        return this.percentageRate = 5.25
                    }
                    if(this.depositSum >= 8000000) {
                        return this.percentageRate = 5.5
                    }
                }
                if(this.depositPeriod >= 91) {
                    this.minSliderValue = 500000
                    if(this.depositSum <= 1000000) {
                        return this.depositSum = 500000, this.percentageRate = 4.9, this.minSliderValue = 500000
                    }
                    if(this.depositSum >= 1000000 && this.depositSum <= 7999999) {
                        return this.percentageRate = 5.15
                    }
                    if(this.depositSum >= 8000000) {
                        return this.percentageRate = 5.4
                    }
                }
                break
            case "replenish":
                this.minDaysValue = 91
                if(this.depositPeriod < 121) {
                    this.minSliderValue = 5000000
                    this.percentageRate = 4.74
                    if(this.depositSum <= 5000000) {
                        return this.depositSum = 5000000, this.percentageRate = 4.74, this.minSliderValue = 5000000
                    }
                }
                if(this.depositPeriod >= 121) {
                    this.minSliderValue = 5000000
                    this.percentageRate = 4.75
                    if(this.depositSum <= 5000000) {
                        return this.depositSum = 5000000, this.percentageRate = 4.75, this.minSliderValue = 5000000
                    }
                }
                break
            default:
                break

        }
    }
}

export default new Deposit;