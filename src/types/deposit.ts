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
    setDepositKindList: (list: DepositKind[]) => void
    depositParams: IDepositParams[]
    setDepositParams: (params: IDepositParams[]) => void
    actualCalcIndicators: (kind: string, deposits: IDepositParams[]) => void
}

export interface IDepositParams {
    code: string,
    name: string,
    param: Param[]
}

export type Param = {
    period_from: number,
    summs_and_rate:SumsAndRate[]
}

export type SumsAndRate = {
    summ_from: number,
    rate: number
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