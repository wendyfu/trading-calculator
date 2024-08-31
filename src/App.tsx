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
import { ChangeEvent, useActionState, useState, useRef } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Transition } from 'react-transition-group'

interface CalculatorState {
  openPrice: string
  stopLossPrice: string
  pips: string
  capital: number
  riskPercentage: number
  [key: string]: number | string
}

const CALCULATION_METHOD = {
  OPEN_STOP_LOSS: 'OPEN_STOP_LOSS',
  PIPS: 'PIPS',
}

const XAU_USD_CONTRACT_SIZE = 100

const PAIRS = [
  {
    value: 'XAU/USD',
    label: 'XAU/USD',
  },
  {
    value: 'Nasdaq US100',
    label: 'Nasdaq US100',
  },
  {
    value: 'Crude Oil CLU',
    label: 'Crude Oil CLU',
  },
]

const formatToTwoDecimal = (value: number) => Math.floor(value * 100) / 100

function App() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('XAU/USD')

  const [calculationMethod, setCalculationMethod] = useState(
    CALCULATION_METHOD.PIPS
  )

  const [state, action] = useActionState<CalculatorState>(
    (state: CalculatorState) => {
      if (!parseFloat(state.openPrice) || !parseFloat(state.stopLossPrice)) {
        return state
      }

      const maxRiskAmount = (state.capital * state.riskPercentage) / 100

      const openPrice = parseFloat(state.openPrice)
      const stopLossPrice = parseFloat(state.stopLossPrice)

      const pips = Math.abs(openPrice - stopLossPrice) * 10
      state.pips = formatToTwoDecimal(pips).toString()

      if (pips === 0) {
        setLotSize('')
        setRiskAmount('')
        return state
      }

      const maxLotSize = formatToTwoDecimal(
        maxRiskAmount /
          (Math.abs(openPrice - stopLossPrice) * XAU_USD_CONTRACT_SIZE)
      )

      setLotSize(maxLotSize.toString())

      setRiskAmount(
        (
          Math.abs(openPrice - stopLossPrice) *
          XAU_USD_CONTRACT_SIZE *
          maxLotSize
        ).toFixed(2)
      )

      return state
    },
    {
      openPrice: '',
      stopLossPrice: '',
      pips: '',
      capital: 2000,
      riskPercentage: 2,
    }
  )

  const [lotSize, setLotSize] = useState('')
  const [riskAmount, setRiskAmount] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    state[name] = value
    action()
  }

  const [startTransition, setStartTransition] = useState(false)
  const transitionNodeRef = useRef<HTMLDivElement | null>(null)

  const transitionStyles = {
    entering: {
      opacity: 1,
      height: 70,
      transition: 'all 0.125s ease-in-out, opacity 0.25s ease-in-out 0.125s',
    },
    entered: {
      opacity: 1,
      height: 70,
      transition: 'all 0.125s ease-in-out, opacity 0.25s ease-in-out 0.125s',
    },
    exiting: {
      opacity: 0,
      height: 70,
      transition: 'all 0.25s ease-in-out, opacity 0s',
    },
    exited: {
      opacity: 0,
      height: 0,
      margin: 0,
      padding: 0,
      transition: 'all 0.25s ease-in-out, opacity 0s',
    },
  }

  const onCalculationMethodChange = (value: string) => {
    setCalculationMethod(value)
    setStartTransition(!startTransition)
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Lot Size Calculator</CardTitle>
        <CardDescription>Tailored for Orbi Trade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid items-center gap-2 mb-2 pb-2">
          <Label>Pairs</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {value
                  ? PAIRS.find((pair) => pair.value === value)?.label
                  : 'Select pairs...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0">
              <Command>
                <CommandInput placeholder="Search pairs..." />
                <CommandList>
                  <CommandGroup>
                    {PAIRS.map((pair) => (
                      <CommandItem
                        key={pair.value}
                        value={pair.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === pair.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {pair.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid items-center gap-2 mb-2 pb-2">
          <Label>Calculate by...</Label>
          <RadioGroup
            value={calculationMethod}
            onValueChange={onCalculationMethodChange}
          >
            <div className="flex gap-2 items-center">
              <RadioGroupItem value={CALCULATION_METHOD.PIPS} />
              <Label
                htmlFor={CALCULATION_METHOD.PIPS}
                onClick={() =>
                  onCalculationMethodChange(CALCULATION_METHOD.PIPS)
                }
                className="cursor-pointer"
              >
                Pips
              </Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem value={CALCULATION_METHOD.OPEN_STOP_LOSS} />
              <Label
                htmlFor={CALCULATION_METHOD.OPEN_STOP_LOSS}
                onClick={() =>
                  onCalculationMethodChange(CALCULATION_METHOD.OPEN_STOP_LOSS)
                }
                className="cursor-pointer"
              >
                Open and stop loss price
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Transition nodeRef={transitionNodeRef} in={startTransition}>
          {(transitionState: 'entering' | 'entered' | 'exiting' | 'exited') => (
            <div
              className="grid grid-cols-2 gap-4 mb-2 pb-2"
              ref={transitionNodeRef}
              style={{
                ...transitionStyles[transitionState],
              }}
            >
              {calculationMethod === CALCULATION_METHOD.OPEN_STOP_LOSS && (
                <>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="open-price">Open price</Label>
                    <Input
                      id="open-price"
                      placeholder="e.g. 2345.67"
                      onChange={handleChange}
                      name="openPrice"
                      value={state.openPrice}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="stop-loss-price">Stop loss price</Label>
                    <Input
                      id="stop-loss-price"
                      placeholder="e.g. 2345.67"
                      onChange={handleChange}
                      name="stopLossPrice"
                      value={state.stopLossPrice}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </Transition>
        {/* {calculationMethod === CALCULATION_METHOD.OPEN_STOP_LOSS ? (
          
        ) : null} */}
        <div className="grid items-center gap-2">
          <Label htmlFor="pips">Pip amount</Label>
          <Input
            id="pips"
            disabled={calculationMethod === CALCULATION_METHOD.OPEN_STOP_LOSS}
            placeholder="e.g. 200"
            onChange={handleChange}
            name="pips"
            value={state.pips}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 pt-2">
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
