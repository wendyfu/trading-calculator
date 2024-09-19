export enum PAIRS {
  XAU_USD = 'XAUUSD',
  BTC_USD = 'BTCUSD',
  BNB_USD = 'BNBUSD',
}

export const PAIRS_CONTRACT_SIZE: Record<PAIRS, number> = {
  [PAIRS.XAU_USD]: 100,
  [PAIRS.BTC_USD]: 0,
  [PAIRS.BNB_USD]: 0,
}

export const PAIRS_PIP_MOVEMENT: Record<PAIRS, number> = {
  [PAIRS.XAU_USD]: 0.1,
  [PAIRS.BTC_USD]: 0,
  [PAIRS.BNB_USD]: 0,
}

export const PAIRS_OPTIONS: {
  value: PAIRS
  label: string
}[] = [
  {
    value: PAIRS.XAU_USD,
    label: 'XAUUSD',
  },
  {
    value: PAIRS.BTC_USD,
    label: 'BTCUSD',
  },
  {
    value: PAIRS.BNB_USD,
    label: 'BNBUSD',
  },
]
