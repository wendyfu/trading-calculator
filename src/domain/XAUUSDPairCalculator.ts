import { PairCalculator } from '@/domain/IPairCalculator'
import Decimal from 'decimal.js'
import { PAIRS_CONTRACT_SIZE } from '@/domain/pairs'

export class XAUUSDPairCalculator extends PairCalculator {
  calculateMaxLotSize(maxRiskAmount: Decimal, pips: Decimal): Decimal {
    return maxRiskAmount
      .div(pips.mul(PAIRS_CONTRACT_SIZE.XAUUSD))
      .toDecimalPlaces(3, Decimal.ROUND_DOWN)
      .mul(10)
  }

  calculateRiskAmount(pips: Decimal, maxLotSize: Decimal): Decimal {
    return pips.div(10).mul(PAIRS_CONTRACT_SIZE.XAUUSD).mul(maxLotSize)
  }
}
