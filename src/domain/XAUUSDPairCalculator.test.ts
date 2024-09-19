import { describe, it, expect } from 'vitest'
import Decimal from 'decimal.js'
import { XAUUSDPairCalculator } from './XAUUSDPairCalculator'

describe('XAUUSDPairCalculator', () => {
  const calculator = new XAUUSDPairCalculator()

  it('should calculate the maximum lot size correctly', () => {
    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(100))
    ).toEqual(new Decimal(0.1))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(200))
    ).toEqual(new Decimal(0.05))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(300))
    ).toEqual(new Decimal(0.03))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(450))
    ).toEqual(new Decimal(0.02))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(520))
    ).toEqual(new Decimal(0.01))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(990))
    ).toEqual(new Decimal(0.01))

    expect(
      calculator.calculateMaxLotSize(new Decimal(100), new Decimal(1100))
    ).toEqual(new Decimal(0))
  })

  it('should calculate the risk amount correctly', () => {
    expect(
      calculator.calculateRiskAmount(new Decimal(100), new Decimal(0.1))
    ).toEqual(new Decimal(100))

    expect(
      calculator.calculateRiskAmount(new Decimal(125), new Decimal(0.2))
    ).toEqual(new Decimal(250))

    expect(
      calculator.calculateRiskAmount(new Decimal(210.5), new Decimal(1))
    ).toEqual(new Decimal(2105))
  })
})
