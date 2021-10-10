import {observer} from "mobx-react-lite";
import {ChangeEvent, FC, ReactElement, useEffect, useState} from "react";
import {Slider, Box, Select, MenuItem} from "@material-ui/core";
import deposit from '../../store/deposit'
import './index.css';
import {LightTooltip} from "../../helpers";

export const DepositCalc: FC = observer((): ReactElement => {

    const [daysValue, setDaysValue] = useState<number>(1);

    const [depValue, setDepValue] = useState<number>(100000);

    const [totalDepositSum, setTotalDepositSum] = useState<number>(
        deposit.totalSum({
            depValue,
            percentageRate: deposit.percentageRate,
            daysValue,
            daysInYear: 365,
            toPercent: 100}))

    const [depositIncome, setDepositIncome] = useState<number>(totalDepositSum ? totalDepositSum - depValue : 0)

    const handleDaysChange = (event: Event, newValue: number) => {
        setDaysValue(newValue)
        deposit.depositPeriodChange(newValue)
    };

    const handleDepChange = (event: Event, newValue: number) => {
        setDepValue(newValue);
        deposit.depositSumChange(newValue)
    };

    useEffect(() => {
        setTotalDepositSum(
            deposit.totalSum({
                depValue,
                percentageRate: deposit.percentageRate,
                daysValue,
                daysInYear: 365,
                toPercent: 100}))
        totalDepositSum && setDepositIncome(totalDepositSum - depValue)
    },[depValue, totalDepositSum, daysValue])

    const base = 'DepositCalc'

    return (
        <div className={base}>
            <div className={`${base}__block`}>
                <div className={`${base}__title`}>
                    <h3>
                        Депозитный калькулятор
                    </h3>
                </div>
                <div className={`${base}__settings`}>
                    <p className={`${base}__settings-title`}>
                        Вклад
                    </p>
                    <Select
                        onChange={e => deposit.depositKindChange(e)}
                        variant="outlined"
                        className={`${base}__settings-select`}
                        defaultValue={'standart'}
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
                                <p>{"Срок вклада"}</p>
                                <div className={`${base}__sum-block`}>
                                    <h3>{`${daysValue} дня`}</h3>
                                    <LightTooltip
                                        title={<div><h1>Срок вклада</h1></div>}
                                        placement="right"
                                        className={`${base}__slider-tooltip`}
                                    >
                                        <p>?</p>
                                    </LightTooltip>
                                </div>
                            </div>
                                <Slider
                                    min={1}
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
                                <p>{"Сумма вклада"}</p>
                                <div className={`${base}__sum-block`}>
                                    <h3>{`${depValue} Р`}</h3>
                                    <LightTooltip
                                        title={<div><h1>Сумма вклада</h1></div>}
                                        placement="right"
                                        className={`${base}__slider-tooltip`}
                                    >
                                        <p>?</p>
                                    </LightTooltip>
                                </div>
                            </div>
                                <Slider
                                    min={100000}
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
                                <p>Процентная ставка</p>
                                <h3>{deposit.percentageRateChange(daysValue)}%</h3>
                            </div>
                            <div className={`${base}__total-item`}>
                                <p>Сумма через <span>{daysValue} дня</span></p>
                                <h3>{totalDepositSum.toFixed(2)} Р</h3>
                            </div>
                            <div className={`${base}__total-item`}>
                                <p>Доход</p>
                                <h3>{depositIncome.toFixed(2)} Р</h3>
                            </div>
                        </div>
                        <div className={`${base}__total-notification`}>
                            <div className={`${base}__notification-block`}>
                                <img className={`${base}__notification-image`} src='https://i.ibb.co/zRXFrgN/Notification-Image.png' alt="Notification-Image"/>
                                <p className={`${base}__notification-text`}>Расчеты калькулятора являются предварительными. Для расчета дохода применяются процентные ставки, действующие на момент проведения расчетов.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})