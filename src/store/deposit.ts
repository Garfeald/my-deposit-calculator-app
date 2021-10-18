import {makeAutoObservable} from "mobx";
import {DepositKind, IDeposit, IDepositParams, TotalSum} from "../types/deposit";
import {ChangeEvent} from "react";

class Deposit implements IDeposit{
    depositKindCode = "unic"
    depositKindsList: DepositKind[] = []
    depositParams: IDepositParams[] = []
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
        this.actualCalcIndicators(value as string, this.depositParams)
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

    setDepositKindList = (list: DepositKind[]) => {
        this.depositKindsList = list
    }

    setDepositParams = (params: IDepositParams[]) => {
        this.depositParams = params
    }

    actualCalcIndicators = (kind: string, deposits: IDepositParams[]) => {
        // choosing kind
        this.depositParams = deposits.filter(deposit => deposit.code === kind)
        // minDayValue
        this.minDaysValue = this.depositParams
            .map(dep => dep.param)
            .flat()
            .map(param => param.period_from)
            .sort((a, b) => a - b)
            .shift() as number
        // min depositSum
        if(!this.depositSum) {
            this.depositSum = this.depositParams
                .map(deposit => deposit.param
                    .filter(dep => dep.period_from === this.minDaysValue)
                    .map(sum => sum.summs_and_rate)
                    .flat())
                .flat()
                .map(param => param.summ_from)
                .sort((a, b) => a - b)
                .shift() as number
        }
        if(this.minSliderValue && this.depositSum <= this.minSliderValue) {
            this.depositSum = this.minSliderValue
        }
        //
        this.depositParams.filter(deposit => deposit.param.filter(dep => {
            if(this.depositPeriod <= this.minDaysValue) {
                this.depositPeriod = this.minDaysValue
            }
            if(this.depositPeriod >= dep.period_from) {
                // minSliderValue
                this.minSliderValue = dep.summs_and_rate
                    .map((sum) => sum.summ_from)
                    .sort((a, b) => a - b)
                    .shift() as number
                // Rate
                this.percentageRate = dep.summs_and_rate
                    .filter(rate => rate.summ_from <= this.depositSum).flat()
                    .map((sum) => sum.rate)
                    .sort((a, b) => a - b)
                    .pop() as number
            }
        }))
    }
}

export default new Deposit;