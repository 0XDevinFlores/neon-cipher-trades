import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TerminalLogo from "@/components/TerminalLogo";
import TradingChart from "@/components/TradingChart";
import { Wallet, TrendingUp, Shield, BarChart3, Calculator, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Call = () => {
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
                <Button variant="terminal-ghost" size="sm" asChild>
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
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-neon-green" />
            <h1 className="text-3xl font-bold text-neon-green">CALL Options</h1>
          </div>
          <p className="text-muted-foreground">Buy bullish options with encrypted strike prices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trading Form */}
          <div className="space-y-6">
            <Card className="bg-terminal-surface border-terminal-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-mono text-neon-green">Place CALL Order</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="asset" className="text-neon-cyan">Asset</Label>
                    <select 
                      id="asset"
                      className="w-full mt-1 p-3 bg-background border border-terminal-border rounded font-mono focus:border-neon-green"
                    >
                      <option value="ETH">ETH - Ethereum</option>
                      <option value="BTC">BTC - Bitcoin</option>
                      <option value="SOL">SOL - Solana</option>
                      <option value="AVAX">AVAX - Avalanche</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="expiry" className="text-neon-cyan">Expiry Date</Label>
                    <select 
                      id="expiry"
                      className="w-full mt-1 p-3 bg-background border border-terminal-border rounded font-mono focus:border-neon-green"
                    >
                      <option value="2024-12-29">Dec 29, 2024</option>
                      <option value="2025-01-15">Jan 15, 2025</option>
                      <option value="2025-01-31">Jan 31, 2025</option>
                      <option value="2025-02-28">Feb 28, 2025</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="strike" className="text-neon-cyan">Strike Price (USD)</Label>
                  <Input 
                    id="strike"
                    type="number"
                    placeholder="2500"
                    className="mt-1 bg-background border-terminal-border focus:border-neon-green font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Strike price will be encrypted after order placement
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="size" className="text-neon-cyan">Position Size</Label>
                  <Input 
                    id="size"
                    type="number"
                    placeholder="1.0"
                    step="0.1"
                    className="mt-1 bg-background border-terminal-border focus:border-neon-green font-mono"
                  />
                </div>
                
                <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neon-green font-mono">Estimated Premium:</span>
                    <span className="text-lg font-bold text-neon-green">$245.50</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Max Profit:</span>
                    <span>Unlimited</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Max Loss:</span>
                    <span>$245.50 (Premium)</span>
                  </div>
                </div>
                
                <Button className="w-full bg-neon-green hover:bg-neon-green/90 text-black font-bold py-6 text-lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  BUY CALL OPTION
                </Button>
              </div>
            </Card>

            {/* Privacy Protection */}
            <Card className="bg-terminal-surface border-terminal-border p-6">
              <div className="flex items-center gap-2 text-neon-purple text-sm mb-4">
                <Shield className="w-5 h-5" />
                <span className="font-bold">Privacy Protection</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-neon-purple mt-0.5" />
                  <div>
                    <div className="font-mono text-neon-purple">Encrypted Strike Prices</div>
                    <div className="text-xs text-muted-foreground">
                      Your strike price is encrypted using time-locked commitments
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calculator className="w-4 h-4 text-neon-cyan mt-0.5" />
                  <div>
                    <div className="font-mono text-neon-cyan">Zero Knowledge Proofs</div>
                    <div className="text-xs text-muted-foreground">
                      Positions verified without revealing sensitive data
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-neon-green mt-0.5" />
                  <div>
                    <div className="font-mono text-neon-green">Transparent Settlement</div>
                    <div className="text-xs text-muted-foreground">
                      Full details revealed automatically at expiry
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Chart and Info */}
          <div className="space-y-6">
            <TradingChart />
            
            <Card className="bg-terminal-surface border-terminal-border p-6">
              <h4 className="text-lg font-mono text-neon-cyan mb-4">CALL Options Strategy</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded">
                  <h5 className="font-mono text-neon-green mb-2">When to use CALL options:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Bullish on the underlying asset</li>
                    <li>• Expecting price to rise above strike + premium</li>
                    <li>• Want unlimited upside potential</li>
                    <li>• Prefer limited risk (premium paid)</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Breakeven Price:</div>
                    <div className="font-mono text-neon-green">Strike + Premium</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Time Decay:</div>
                    <div className="font-mono text-neon-red">Works Against You</div>
                  </div>
                </div>
                
                <div className="p-3 bg-background border border-terminal-border rounded">
                  <div className="text-xs text-muted-foreground mb-2">Current Market Data:</div>
                  <div className="grid grid-cols-3 gap-4 text-sm font-mono">
                    <div>
                      <div className="text-neon-cyan">ETH Price</div>
                      <div className="text-neon-green">$2,540</div>
                    </div>
                    <div>
                      <div className="text-neon-cyan">IV</div>
                      <div className="text-neon-purple">45.2%</div>
                    </div>
                    <div>
                      <div className="text-neon-cyan">Volume</div>
                      <div className="text-foreground">2.4M</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Call;