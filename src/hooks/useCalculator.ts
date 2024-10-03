import { CALCULATION_METHOD } from '@/domain/constant'
import { PairCalculator } from '@/domain/IPairCalculator'
import { XAUUSDPairCalculator } from '@/domain/XAUUSDPairCalculator'
import Decimal from 'decimal.js'
import { useActionState, useState } from 'react'

interface CalculatorState {
  openPrice: string
  stopLossPrice: string
  pips: string
  capital: string
  riskPercentage: string
  [key: string]: number | string
}

export const useCalculator = () => {
  const pairCalculator: PairCalculator = new XAUUSDPairCalculator()

  const [calculationMethod, setCalculationMethod] = useState(
    CALCULATION_METHOD.PIPS
  )

  const [lotSize, setLotSize] = useState('')
  const [riskAmount, setRiskAmount] = useState('')

  const validateInputNumber = (value: string): boolean => {
    if (!value) {
      return false
    }

    const number = parseFloat(value)
    if (isNaN(number) || number < 0) {
      return false
    }

    return true
  }

  const isValidInput = (state: CalculatorState): boolean => {
    if (
      !validateInputNumber(state.capital) ||
      !validateInputNumber(state.riskPercentage)
    ) {
      setLotSize('')
      setRiskAmount('')
      return false
    }

    if (calculationMethod === CALCULATION_METHOD.OPEN_STOP_LOSS) {
      return (
        validateInputNumber(state.openPrice) &&
        validateInputNumber(state.stopLossPrice)
      )
    } else {
      return validateInputNumber(state.pips)
    }
  }

  const [state, action] = useActionState<CalculatorState>(
    (state: CalculatorState) => {
      if (!isValidInput(state)) {
        return state
      }

      if (!state.capital || !state.riskPercentage) {
        setLotSize('')
        setRiskAmount('')
        return state
      }

      const maxRiskAmount = new Decimal(state.capital)
        .mul(state.riskPercentage)
        .div(100)

      let pips = new Decimal(0)
      if (calculationMethod === CALCULATION_METHOD.PIPS) {
        pips = new Decimal(parseFloat(state.pips))
      } else {
        const openPrice = new Decimal(state.openPrice)
        const stopLossPrice = new Decimal(state.stopLossPrice)

        pips = openPrice.sub(stopLossPrice).abs().mul(10)
        state.pips = pips.toFixed(2, Decimal.ROUND_DOWN)
      }

      if (pips.isZero()) {
        setLotSize('')
        setRiskAmount('')
        return state
      }

      const maxLotSize = pairCalculator.calculateMaxLotSize(maxRiskAmount, pips)
      setLotSize(maxLotSize.toFixed(2, Decimal.ROUND_DOWN))

      const riskAmount = pairCalculator.calculateRiskAmount(pips, maxLotSize)
      setRiskAmount(riskAmount.toFixed(2))

      return state
    },
    {
      openPrice: '',
      stopLossPrice: '',
      pips: '',
      capital: 2000,
      riskPercentage: 5,
    }
  )

  const reset = () => {
    state.openPrice = ''
    state.stopLossPrice = ''
    state.pips = ''
    setLotSize('')
    setRiskAmount('')
  }

  return {
    state,
    action,
    calculationMethod,
    setCalculationMethod,
    lotSize,
    riskAmount,
    reset,
  }
}
