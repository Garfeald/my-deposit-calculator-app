import {observer} from "mobx-react-lite";
import {FC, ReactElement, useEffect, useRef, useState} from "react";
import {Slider, Box, Select, MenuItem} from "@material-ui/core";
import deposit from '../../store/deposit'
import './index.css';
import {correctEntryDays, LightTooltip} from "../../helpers";
import ReactToPrint from 'react-to-print';
import {DepositKind} from "../../types/deposit";
const {deposits} = require('../../../depcalc.json')

export const DepositCalc: FC = observer((): ReactElement => {

    const [daysValue, setDaysValue] = useState<number>(1);

    const [depValue, setDepValue] = useState<number>(0);

    const [depositIncome, setDepositIncome] = useState<number>(0)

    const [totalDepositSum, setTotalDepositSum] = useState<number>(
        deposit.totalSum({
            depValue,
            percentageRate: deposit.percentageRate,
            daysValue,
            daysInYear: 365,
            toPercent: 100}))

    const handleDaysChange = (event: Event, newValue: number) => {
        setDaysValue(newValue)
        deposit.depositPeriodChange(newValue)
    };

    const handleDepChange = (event: Event, newValue: number) => {
        setDepValue(newValue);
        deposit.depositSumChange(newValue)
    };

    const depositRef = useRef(null)

    useEffect(() => {
        setDepValue(deposit.depositSum)
    },[deposit.depositSum])

    useEffect(() => {
        const {actualCalcIndicators, depositKindCode} = deposit
        actualCalcIndicators(depositKindCode, deposits)
    }, [])

    useEffect(() => {
        const {actualCalcIndicators, depositKindCode} = deposit
        actualCalcIndicators(depositKindCode, deposits)
    }, [deposit.depositSum, deposit.depositPeriod, deposit.depositKindCode, deposit.percentageRate])

    useEffect(() => {
        setTotalDepositSum(
            deposit.totalSum({
                depValue,
                percentageRate: deposit.percentageRate,
                daysValue,
                daysInYear: 365,
                toPercent: 100}))
        totalDepositSum && setDepositIncome(totalDepositSum - depValue)
    },[depValue, totalDepositSum, daysValue, deposit.percentageRate])

    useEffect(() => {
        if (daysValue < deposit.minDaysValue) {
            setDaysValue(deposit.minDaysValue)
        }
    },[deposit.minDaysValue])

    useEffect(() => {
        const {setDepositKindList, setDepositParams} = deposit
        const depositKindList = deposits && deposits.length > 0 && deposits.map((dep: DepositKind) => {
            return {code: dep.code, name: dep.name}
        })
        setDepositKindList(depositKindList)
        setDepositParams(deposits)
    }, [deposits])

    const base = 'DepositCalc'

    return (
        <div className={base} >
            <ReactToPrint
                trigger={() => <button className="Print" >???????????? PDF</button>}
                content={() => depositRef.current}
            />
            <div className={`${base}__block`} ref={depositRef}>
                <div className={`${base}__title`}>
                    <h3>
                        ???????????????????? ??????????????????????
                    </h3>
                </div>
                <div className={`${base}__settings`}>
                    <p className={`${base}__settings-title`}>
                        ??????????
                    </p>
                    <Select
                        onChange={e => deposit.depositKindChange(e)}
                        variant="outlined"
                        className={`${base}__settings-select`}
                        defaultValue={'unic'}
                    >
                        {deposit.depositKindsList.map((dep) => (
                            <MenuItem
                                key={dep.code}
                                value={dep.code}
                            >
                                {dep.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className={`${base}__settings-slider`}>
                        <Box width={490}>
                            <div className={`${base}__slider-sum`}>
                                <p>{"???????? ????????????"}</p>
                                <div className={`${base}__sum-block`}>
                                    <h3>{daysValue} {correctEntryDays(daysValue)}</h3>
                                    <LightTooltip
                                        title={<div><h1>???????? ????????????</h1></div>}
                                        placement="right"
                                        className={`${base}__slider-tooltip`}
                                    >
                                        <p>?</p>
                                    </LightTooltip>
                                </div>
                            </div>
                                <Slider
                                    min={deposit.minDaysValue}
                                    max={365}
                                    step={1}
                                    value={daysValue}
                                    // @ts-ignore
                                    onChange={handleDaysChange}
                                />
                        </Box>
                    </div>
                    <div className={`${base}__settings-slider`}>
                        <Box width={490}>
                            <div className={`${base}__slider-sum`}>
                                <p>{"?????????? ????????????"}</p>
                                <div className={`${base}__sum-block`}>
                                    <h3>{`${depValue} ??`}</h3>
                                    <LightTooltip
                                        title={<div><h1>?????????? ????????????</h1></div>}
                                        placement="right"
                                        className={`${base}__slider-tooltip`}
                                    >
                                        <p>?</p>
                                    </LightTooltip>
                                </div>
                            </div>
                                <Slider
                                    min={deposit.minSliderValue}
                                    max={10000000}
                                    step={100000}
                                    value={depValue}
                                    // @ts-ignore
                                    onChange={handleDepChange}
                                />
                        </Box>
                    </div>
                    <div className={`${base}__total`}>
                        <div className={`${base}__total-sum`}>
                            <div className={`${base}__total-item`}>
                                <p>???????????????????? ????????????</p>
                                <h3>{deposit.percentageRate && deposit.percentageRate.toFixed(2)}%</h3>
                            </div>
                            <div className={`${base}__total-item`}>
                                <p>?????????? ?????????? <span>{daysValue} {correctEntryDays(daysValue)}</span></p>
                                <h3>{totalDepositSum && totalDepositSum.toFixed(2)} ??</h3>
                            </div>
                            <div className={`${base}__total-item`}>
                                <p>??????????</p>
                                <h3>{depositIncome && depositIncome.toFixed(2)} ??</h3>
                            </div>
                        </div>
                        <div className={`${base}__total-notification`}>
                            <div className={`${base}__notification-block`}>
                                <img className={`${base}__notification-image`} src='https://i.ibb.co/zRXFrgN/Notification-Image.png' alt="Notification-Image"/>
                                <p className={`${base}__notification-text`}>?????????????? ???????????????????????? ???????????????? ????????????????????????????????. ?????? ?????????????? ???????????? ?????????????????????? ???????????????????? ????????????, ?????????????????????? ???? ???????????? ???????????????????? ????????????????.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})