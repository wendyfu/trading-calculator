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

function App() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Lot Size Calculator</CardTitle>
        <CardDescription>Tailored for Orbi Trade</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-2 gap-4 mb-2 pb-2">
          <div className="grid items-center gap-2">
            <Label htmlFor="open-price">Open price</Label>
            <Input id="open-price" placeholder="Entry price" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="stop-loss-price">Stop loss price</Label>
            <Input id="stop-loss-price" placeholder="Stop loss price" />
          </div>
        </div>
        <div className="grid items-center gap-2 mb-2 pb-2">
          <Label htmlFor="pips">Pips</Label>
          <Input id="pips" placeholder="Pips" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid items-center gap-2 col-span-2">
            <Label htmlFor="capital">Capital</Label>
            <Input id="capital" placeholder="Capital amount" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="risk-percentage">Risk (%)</Label>
            <Input id="risk-percentage" placeholder="Risk" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-wrap gap-4 [&>div]:flex-1">
        <div>
          <p className="text-sm text-muted-foreground">Max trade size</p>
          <h3 className="font-semibold tracking-tight flex items-baseline gap-1 text-4xl tabular-nums">
            322
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
            40.00
          </h3>
        </div>
      </CardFooter>
    </Card>
  )
}

export default App
