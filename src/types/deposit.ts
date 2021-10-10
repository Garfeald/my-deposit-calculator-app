import {ChangeEvent} from "react";
import deposit from "../store/deposit";

export interface IDeposit {
    depositKind: DepositKind
    depositKindsList: DepositKind[]
    depositKindChange: (e: ChangeEvent<{ name?: string | undefined; value: DepositKind | unknown}>) => void
    depositPeriod: number
    depositSum: number
    depositPeriodChange: (days: number) => void
    depositSumChange: (sum: number) => void
    percentageRate: number
    percentageRateChange: (days: number) => string
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