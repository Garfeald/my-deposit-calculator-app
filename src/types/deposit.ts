import {ChangeEvent} from "react";
import deposit from "../store/deposit";

export interface IDeposit {
    depositKindCode: string
    depositKindsList: DepositKind[]
    depositKindChange: (e: ChangeEvent<{ name?: string | undefined; value: DepositKind | unknown}>) => void
    depositPeriod: number
    depositSum: number
    minSliderValue: number
    depositPeriodChange: (days: number) => void
    depositSumChange: (sum: number) => void
    percentageRate: number
    totalSum: ({depValue, percentageRate, daysValue, daysInYear, toPercent}: TotalSum) => number
}

export type DepositKind = {
    code: string,
    name: string
}

export type TotalSum = {
    depValue: number,
    percentageRate: number,
    daysValue: number,
    daysInYear: number,
    toPercent: number
}