import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChangeEvent, useActionState, useState } from 'react'

interface CalculatorState {
  openPrice: number
  stopLossPrice: number
  pips: number
  capital: number
  riskPercentage: number
  [key: string]: number // Add index signature
}

function App() {
  const [lotSize, setLotSize] = useState(0)
  const [riskAmount, setRiskAmount] = useState(0)

  const [state, action] = useActionState<CalculatorState>(
    (state: CalculatorState) => {
      return state
    },
    {
      openPrice: 0,
      stopLossPrice: 0,
      pips: 0,
      capital: 2000,
      riskPercentage: 2,
    }
  )
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    state[name] = parseFloat(value) || 0
    action()
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Lot Size Calculator</CardTitle>
        <CardDescription>Tailored for Orbi Trade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-2 pb-2">
          <div className="grid items-center gap-2">
            <Label htmlFor="open-price">Open price</Label>
            <Input
              id="open-price"
              placeholder="Entry price"
              onChange={handleChange}
              name="openPrice"
              value={state.openPrice}
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="stop-loss-price">Stop loss price</Label>
            <Input
              id="stop-loss-price"
              placeholder="Stop loss price"
              onChange={handleChange}
              name="stopLossPrice"
              value={state.stopLossPrice}
            />
          </div>
        </div>
        <div className="grid items-center gap-2 mb-2 pb-2">
          <Label htmlFor="pips">Pips</Label>
          <Input
            id="pips"
            placeholder="Pips"
            onChange={handleChange}
            name="pips"
            value={state.pips}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid items-center gap-2 col-span-2">
            <Label htmlFor="capital">Capital</Label>
            <Input
              id="capital"
              placeholder="Capital amount"
              onChange={handleChange}
              name="capital"
              value={state.capital}
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="risk-percentage">Risk (%)</Label>
            <Input
              id="risk-percentage"
              placeholder="Risk"
              onChange={handleChange}
              name="riskPercentage"
              value={state.riskPercentage}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-wrap gap-4 [&>div]:flex-1">
        <div>
          <p className="text-sm text-muted-foreground">Max trade size</p>
          <h3 className="font-semibold tracking-tight flex items-baseline gap-1 text-4xl tabular-nums">
            {lotSize || '--'}
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              lot(s)
            </span>
          </h3>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Risk amount</p>
          <h3 className="font-semibold tracking-tight flex items-baseline gap-1 text-4xl tabular-nums">
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              US$
            </span>
            {riskAmount || '--'}
          </h3>
        </div>
      </CardFooter>
    </Card>
  )
}

export default App
