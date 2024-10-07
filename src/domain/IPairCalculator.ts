import Decimal from 'decimal.js'
import { PAIRS_PIP_MOVEMENT } from '@/domain/pairs'

export abstract class PairCalculator {
  abstract calculateMaxLotSize(maxRiskAmount: Decimal, pips: Decimal): Decimal

  abstract calculateRiskAmount(pips: Decimal, maxLotSize: Decimal): Decimal

  calculatePips(openPrice: number, stopLossPrice: number): number {
    return new Decimal(openPrice)
      .sub(stopLossPrice)
      .abs()
      .div(PAIRS_PIP_MOVEMENT.XAUUSD)
      .toNumber()
  }
}
