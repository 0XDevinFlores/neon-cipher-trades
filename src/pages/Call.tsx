import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TerminalLogo from "@/components/TerminalLogo";
import TradingChart from "@/components/TradingChart";
import { Wallet, TrendingUp, Shield, BarChart3, Calculator, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useNeonCipherContract } from '../hooks/useContract';
import { toast } from 'sonner';

const Call = () => {
  const { isConnected, address } = useAccount();
  const { createPosition } = useNeonCipherContract();
  
  const [formData, setFormData] = useState({
    asset: 'ETH',
    expiry: '2024-12-29',
    strike: '',
    size: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(2540);
  const [premium, setPremium] = useState(245.50);

  // Calculate premium based on strike price and current price
  useEffect(() => {
    if (formData.strike && formData.size) {
      const strike = parseFloat(formData.strike);
      const size = parseFloat(formData.size);
      const intrinsicValue = Math.max(0, currentPrice - strike);
      const timeValue = Math.max(0, (currentPrice * 0.1) - intrinsicValue);
      const calculatedPremium = (intrinsicValue + timeValue) * size;
      setPremium(calculatedPremium);
    }
  }, [formData.strike, formData.size, currentPrice]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.strike || !formData.size) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const strikePrice = Math.round(parseFloat(formData.strike) * 100); // Convert to cents
      const quantity = Math.round(parseFloat(formData.size) * 100); // Convert to cents
      const premiumAmount = Math.round(premium * 100); // Convert to cents
      const expiryTime = Math.floor(new Date(formData.expiry).getTime() / 1000);

      const tx = await createPosition.writeAsync({
        args: [strikePrice, quantity, premiumAmount, true, expiryTime],
        value: BigInt(Math.round(premium * 1e18)), // Convert to wei
      });

      toast.success('CALL option created successfully!');
      console.log('Transaction hash:', tx);
    } catch (error) {
      console.error('Error creating CALL option:', error);
      toast.error('Failed to create CALL option');
    } finally {
      setIsLoading(false);
    }
  };

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
                      value={formData.asset}
                      onChange={(e) => handleInputChange('asset', e.target.value)}
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
                      value={formData.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
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
                    value={formData.strike}
                    onChange={(e) => handleInputChange('strike', e.target.value)}
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
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    className="mt-1 bg-background border-terminal-border focus:border-neon-green font-mono"
                  />
                </div>
                
                <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neon-green font-mono">Estimated Premium:</span>
                    <span className="text-lg font-bold text-neon-green">${premium.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Max Profit:</span>
                    <span>Unlimited</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Max Loss:</span>
                    <span>${premium.toFixed(2)} (Premium)</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !isConnected}
                  className="w-full bg-neon-green hover:bg-neon-green/90 text-black font-bold py-6 text-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Option...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      BUY CALL OPTION
                    </>
                  )}
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
                      <div className="text-neon-cyan">{formData.asset} Price</div>
                      <div className="text-neon-green">${currentPrice.toLocaleString()}</div>
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