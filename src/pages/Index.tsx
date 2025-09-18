import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TerminalLogo from "@/components/TerminalLogo";
import TickerTape from "@/components/TickerTape";
import EncryptedPositions from "@/components/EncryptedPositions";
import TradingChart from "@/components/TradingChart";
import { Wallet, Shield, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background text-foreground font-mono pb-16">
      {/* Header */}
      <header className="border-b border-terminal-border bg-terminal-surface shadow-terminal">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <TerminalLogo />
            
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
                <Button variant="terminal-ghost" size="sm" asChild>
                  <Link to="/history">
                    <Clock className="w-4 h-4" />
                    History
                  </Link>
                </Button>
              </nav>
              
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button variant="terminal-connect" size="lg" onClick={openConnectModal}>
                              <Wallet className="w-4 h-4" />
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button variant="terminal-connect" size="lg" onClick={openChainModal}>
                              Wrong network
                            </Button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-2">
                            <Button variant="terminal-ghost" size="sm" onClick={openChainModal}>
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </Button>
                            <Button variant="terminal-connect" size="lg" onClick={openAccountModal}>
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-neon-green">Options Trading</span>
            <br />
            <span className="text-neon-cyan">in Confidential Mode</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Execute private options trades with encrypted strike prices and positions. 
            Full transparency only at expiry.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="bg-neon-purple/10 text-neon-purple border-neon-purple font-mono px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Zero Knowledge Proofs
            </Badge>
            <Badge variant="outline" className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan font-mono px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Time-Locked Encryption
            </Badge>
            <Badge variant="outline" className="bg-neon-green/10 text-neon-green border-neon-green font-mono px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              DeFi Native
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-green transition-all duration-300">
            <div className="text-2xl font-bold text-neon-green mb-2">$2.4M</div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-cyan transition-all duration-300">
            <div className="text-2xl font-bold text-neon-cyan mb-2">1,247</div>
            <div className="text-sm text-muted-foreground">Active Positions</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-purple transition-all duration-300">
            <div className="text-2xl font-bold text-neon-purple mb-2">98.5%</div>
            <div className="text-sm text-muted-foreground">Privacy Rating</div>
          </Card>
          <Card className="bg-terminal-surface border-terminal-border p-6 text-center hover:shadow-glow-green transition-all duration-300">
            <div className="text-2xl font-bold text-neon-green mb-2">24h</div>
            <div className="text-sm text-muted-foreground">Avg Settlement</div>
          </Card>
        </div>

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TradingChart />
          
          <Card className="bg-terminal-surface border-terminal-border p-6">
            <h3 className="text-lg font-mono text-neon-cyan mb-4">Quick Trade</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="terminal" className="py-8 flex-col gap-2" asChild>
                  <Link to="/call">
                    <span className="text-neon-green font-bold">CALL</span>
                    <span className="text-xs text-muted-foreground">Buy bullish</span>
                  </Link>
                </Button>
                <Button variant="terminal" className="py-8 flex-col gap-2" asChild>
                  <Link to="/put">
                    <span className="text-neon-red font-bold">PUT</span>
                    <span className="text-xs text-muted-foreground">Buy bearish</span>
                  </Link>
                </Button>
              </div>
              
              <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded">
                <div className="flex items-center gap-2 text-neon-purple text-sm mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-bold">Privacy Protected</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your strike prices and position sizes are encrypted using time-locked
                  commitments. Details revealed only at expiry.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Encrypted Positions */}
        <EncryptedPositions />
      </main>

      {/* Ticker Tape */}
      <TickerTape />
    </div>
  );
};

export default Index;