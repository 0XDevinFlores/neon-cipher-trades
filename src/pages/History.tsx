import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TerminalLogo from "@/components/TerminalLogo";
import { Wallet, Clock, BarChart3, Shield, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const tradeHistory = [
    {
      id: 1,
      date: "2024-12-15",
      time: "14:32:15",
      type: "CALL",
      asset: "ETH",
      strike: "$2,400",
      size: "5.0",
      premium: "$225",
      status: "Expired",
      pnl: "+$450",
      isPositive: true
    },
    {
      id: 2,
      date: "2024-12-10",
      time: "09:15:42",
      type: "PUT",
      asset: "BTC",
      strike: "$65,000",
      size: "2.0",
      premium: "$180",
      status: "Closed",
      pnl: "-$80",
      isPositive: false
    },
    {
      id: 3,
      date: "2024-12-08",
      time: "16:45:30",
      type: "CALL",
      asset: "SOL",
      strike: "**ENCRYPTED**",
      size: "**HIDDEN**",
      premium: "$95",
      status: "Active",
      pnl: "+$120",
      isPositive: true
    }
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
                <Button variant="terminal-ghost" size="sm" asChild>
                  <Link to="/markets">
                    <BarChart3 className="w-4 h-4" />
                    Markets
                  </Link>
                </Button>
                <Button variant="terminal-ghost" size="sm" asChild>
                  <Link to="/positions">
                    <Shield className="w-4 h-4" />
                    Positions
                  </Link>
                </Button>
                <Button variant="terminal" size="sm" asChild>
                  <Link to="/history">
                    <Clock className="w-4 h-4" />
                    History
                  </Link>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-green mb-2">Trading History</h1>
            <p className="text-muted-foreground">Complete record of your options trading activity</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="terminal-ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="terminal" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-green transition-all duration-300">
            <div className="text-2xl font-bold text-neon-green mb-2">42</div>
            <div className="text-sm text-muted-foreground">Total Trades</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-cyan transition-all duration-300">
            <div className="text-2xl font-bold text-neon-cyan mb-2">$8,450</div>
            <div className="text-sm text-muted-foreground">Total P&L</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-purple transition-all duration-300">
            <div className="text-2xl font-bold text-neon-purple mb-2">71%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-green transition-all duration-300">
            <div className="text-2xl font-bold text-neon-green mb-2">$2,840</div>
            <div className="text-sm text-muted-foreground">Avg Trade Size</div>
          </Card>
        </div>

        {/* Privacy Notice */}
        <Card className="bg-terminal-surface border-terminal-border p-6 mb-8">
          <div className="flex items-center gap-2 text-neon-purple text-sm mb-2">
            <Shield className="w-4 h-4" />
            <span className="font-bold">Privacy Protection Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Some trade details are encrypted and will be revealed upon expiry. 
            This ensures maximum privacy while maintaining verifiable trading history.
          </p>
        </Card>

        {/* Trade History Table */}
        <Card className="bg-terminal-surface border-terminal-border p-6">
          <h3 className="text-lg font-mono text-neon-cyan mb-4">Recent Trades</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-terminal-border">
                  <th className="text-left p-3 text-sm text-muted-foreground">Date/Time</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Type</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Asset</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Strike</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Size</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Premium</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-sm text-muted-foreground">P&L</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-terminal-border/50 hover:bg-neon-cyan/5">
                    <td className="p-3">
                      <div className="font-mono text-sm">
                        <div>{trade.date}</div>
                        <div className="text-xs text-muted-foreground">{trade.time}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={trade.type === 'CALL' ? 'bg-neon-green/20 text-neon-green border-neon-green' : 'bg-neon-red/20 text-neon-red border-neon-red'}>
                        {trade.type}
                      </Badge>
                    </td>
                    <td className="p-3 font-mono text-neon-cyan">{trade.asset}</td>
                    <td className="p-3 font-mono text-sm">{trade.strike}</td>
                    <td className="p-3 font-mono text-sm">{trade.size}</td>
                    <td className="p-3 font-mono text-sm">{trade.premium}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={
                        trade.status === 'Active' ? 'text-neon-green border-neon-green' :
                        trade.status === 'Expired' ? 'text-neon-cyan border-neon-cyan' :
                        'text-muted-foreground border-muted-foreground'
                      }>
                        {trade.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className={`font-mono font-bold ${trade.isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
                        {trade.pnl}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default History;