import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, TrendingUp, TrendingDown } from "lucide-react";

const EncryptedPositions = () => {
  const positions = [
    {
      id: "POS001",
      asset: "ETH",
      type: "CALL",
      status: "encrypted",
      pnl: null,
      expiry: "2024-03-15",
      encrypted: true,
    },
    {
      id: "POS002", 
      asset: "BTC",
      type: "PUT",
      status: "encrypted",
      pnl: null,
      expiry: "2024-03-20",
      encrypted: true,
    },
    {
      id: "POS003",
      asset: "SOL",
      type: "CALL",
      status: "expired",
      pnl: +1250.50,
      expiry: "2024-02-28",
      encrypted: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-5 h-5 text-neon-purple" />
        <h2 className="text-xl font-bold font-mono text-neon-green">
          Private Positions
        </h2>
      </div>

      <div className="grid gap-4">
        {positions.map((position) => (
          <Card
            key={position.id}
            className="bg-terminal-surface border-terminal-border p-6 hover:shadow-glow-green transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan font-mono"
                >
                  {position.asset}
                </Badge>
                <Badge
                  variant="outline"
                  className={`font-mono ${
                    position.type === "CALL"
                      ? "bg-neon-green/10 text-neon-green border-neon-green"
                      : "bg-neon-red/10 text-neon-red border-neon-red"
                  }`}
                >
                  {position.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                {position.encrypted ? (
                  <div className="flex items-center gap-2 text-neon-purple">
                    <Lock className="w-4 h-4 animate-pulse-glow" />
                    <span className="text-sm font-mono">ENCRYPTED</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-mono">VISIBLE</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
              <div>
                <span className="text-muted-foreground">Position ID</span>
                <div className="text-foreground">{position.id}</div>
              </div>

              <div>
                <span className="text-muted-foreground">Strike Price</span>
                <div className="text-foreground">
                  {position.encrypted ? (
                    <span className="text-neon-purple">••••••</span>
                  ) : (
                    "$2,500"
                  )}
                </div>
              </div>

              <div>
                <span className="text-muted-foreground">P&L</span>
                <div className="flex items-center gap-1">
                  {position.encrypted ? (
                    <span className="text-neon-purple">••••••</span>
                  ) : position.pnl !== null ? (
                    <>
                      {position.pnl > 0 ? (
                        <TrendingUp className="w-4 h-4 text-neon-green" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-neon-red" />
                      )}
                      <span
                        className={
                          position.pnl > 0 ? "text-neon-green" : "text-neon-red"
                        }
                      >
                        ${Math.abs(position.pnl).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-muted-foreground">Expiry</span>
                <div className="text-foreground">{position.expiry}</div>
              </div>
            </div>

            {position.encrypted && (
              <div className="mt-4 p-3 bg-neon-purple/10 border border-neon-purple/30 rounded">
                <div className="flex items-center gap-2 text-neon-purple text-sm font-mono">
                  <Lock className="w-4 h-4" />
                  <span>
                    Strike price and P&L will be revealed at expiry
                  </span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EncryptedPositions;