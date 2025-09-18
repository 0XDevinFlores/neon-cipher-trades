import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TerminalLogo from "@/components/TerminalLogo";
import EncryptedPositions from "@/components/EncryptedPositions";
import { Wallet, Shield, BarChart3, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Positions = () => {
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
                <Button variant="terminal" size="sm" asChild>
                  <Link to="/positions">
                    <Shield className="w-4 h-4" />
                    Positions
                  </Link>
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
          <h1 className="text-3xl font-bold text-neon-green mb-2">Your Positions</h1>
          <p className="text-muted-foreground">Encrypted positions with time-locked reveals</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-green transition-all duration-300">
            <div className="text-2xl font-bold text-neon-green mb-2">$12,450</div>
            <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-cyan transition-all duration-300">
            <div className="text-2xl font-bold text-neon-cyan mb-2">+$2,340</div>
            <div className="text-sm text-muted-foreground">Unrealized P&L</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-purple transition-all duration-300">
            <div className="text-2xl font-bold text-neon-purple mb-2">8</div>
            <div className="text-sm text-muted-foreground">Active Positions</div>
          </Card>
        </div>

        {/* Privacy Controls */}
        <Card className="bg-terminal-surface border-terminal-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono text-neon-cyan">Privacy Controls</h3>
            <div className="flex items-center gap-4">
              <Button variant="terminal" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Show Encrypted
              </Button>
              <Button variant="terminal-ghost" size="sm">
                <EyeOff className="w-4 h-4 mr-2" />
                Hide All
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded">
            <div className="flex items-center gap-2 text-neon-purple text-sm mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-bold">Zero Knowledge Protection</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your position details are encrypted using time-locked commitments. 
              Strike prices and exact positions remain private until expiry or manual reveal.
            </p>
          </div>
        </Card>

        {/* Active Positions */}
        <div className="mb-8">
          <h3 className="text-lg font-mono text-neon-cyan mb-4">Active Positions</h3>
          
          <div className="space-y-4">
            <Card className="bg-terminal-surface border-terminal-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green">CALL</Badge>
                  <span className="font-mono text-lg">ETH</span>
                </div>
                <div className="text-right">
                  <div className="text-neon-green font-bold">+$450</div>
                  <div className="text-xs text-muted-foreground">P&L</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Strike</div>
                  <div className="font-mono text-neon-cyan">**ENCRYPTED**</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-mono text-neon-cyan">**HIDDEN**</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Expiry</div>
                  <div className="font-mono">Dec 29, 2024</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <Badge variant="outline" className="text-neon-green border-neon-green">Active</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-terminal-surface border-terminal-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-neon-red/20 text-neon-red border-neon-red">PUT</Badge>
                  <span className="font-mono text-lg">BTC</span>
                </div>
                <div className="text-right">
                  <div className="text-neon-red font-bold">-$120</div>
                  <div className="text-xs text-muted-foreground">P&L</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Strike</div>
                  <div className="font-mono text-neon-cyan">**ENCRYPTED**</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-mono text-neon-cyan">**HIDDEN**</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Expiry</div>
                  <div className="font-mono">Jan 15, 2025</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <Badge variant="outline" className="text-neon-green border-neon-green">Active</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Encrypted Positions Component */}
        <EncryptedPositions />
      </main>
    </div>
  );
};

export default Positions;