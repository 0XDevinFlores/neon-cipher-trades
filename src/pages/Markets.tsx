import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TerminalLogo from "@/components/TerminalLogo";
import TradingChart from "@/components/TradingChart";
import { Wallet, BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Markets = () => {
  const marketData = [
    { symbol: "ETH", price: "$2,540", change: "+3.7%", volume: "$2.4M", isPositive: true },
    { symbol: "BTC", price: "$67,850", change: "+2.1%", volume: "$5.8M", isPositive: true },
    { symbol: "SOL", price: "$142.30", change: "-1.4%", volume: "$890K", isPositive: false },
    { symbol: "AVAX", price: "$35.80", change: "+5.2%", volume: "$1.2M", isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Header */}
      <header className="border-b border-terminal-border bg-terminal-surface shadow-terminal">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <TerminalLogo />
            </Link>
            
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Button variant="terminal" size="sm" asChild>
                  <Link to="/markets">
                    <BarChart3 className="w-4 h-4" />
                    Markets
                  </Link>
                </Button>
                <Button variant="terminal-ghost" size="sm" asChild>
                  <Link to="/positions">Positions</Link>
                </Button>
                <Button variant="terminal-ghost" size="sm" asChild>
                  <Link to="/history">History</Link>
                </Button>
              </nav>
              
              <Button variant="terminal-connect" size="lg">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neon-green mb-2">Markets</h1>
          <p className="text-muted-foreground">Real-time options market data and analytics</p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketData.map((asset) => (
            <Card key={asset.symbol} className="bg-terminal-surface border-terminal-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-mono text-neon-cyan">{asset.symbol}</h3>
                <Activity className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{asset.price}</div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-mono ${asset.isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
                    {asset.change}
                  </span>
                  {asset.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-neon-green" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-neon-red" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Vol: {asset.volume}</div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="terminal" size="sm" asChild>
                  <Link to="/call" className="text-neon-green">CALL</Link>
                </Button>
                <Button variant="terminal" size="sm" asChild>
                  <Link to="/put" className="text-neon-red">PUT</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Chart */}
        <div className="mb-8">
          <TradingChart />
        </div>

        {/* Options Chain */}
        <Card className="bg-terminal-surface border-terminal-border p-6">
          <h3 className="text-lg font-mono text-neon-cyan mb-4">Options Chain - ETH</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-mono text-neon-green mb-3">CALLS</h4>
              <div className="space-y-2">
                {[2500, 2550, 2600, 2650].map((strike) => (
                  <div key={`call-${strike}`} className="flex items-center justify-between p-2 bg-neon-green/10 rounded border border-neon-green/30">
                    <span className="font-mono">${strike}</span>
                    <Badge variant="outline" className="text-neon-green border-neon-green">
                      Premium: $45
                    </Badge>
                    <Button variant="terminal" size="sm" asChild>
                      <Link to="/call">Trade</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-mono text-neon-red mb-3">PUTS</h4>
              <div className="space-y-2">
                {[2400, 2450, 2500, 2550].map((strike) => (
                  <div key={`put-${strike}`} className="flex items-center justify-between p-2 bg-neon-red/10 rounded border border-neon-red/30">
                    <span className="font-mono">${strike}</span>
                    <Badge variant="outline" className="text-neon-red border-neon-red">
                      Premium: $32
                    </Badge>
                    <Button variant="terminal" size="sm" asChild>
                      <Link to="/put">Trade</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Markets;