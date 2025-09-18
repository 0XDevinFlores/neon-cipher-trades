import { Activity, Zap } from "lucide-react";

const TerminalLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Candlestick with Circuit Lines */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Circuit Background */}
          <div className="absolute inset-0 opacity-30">
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-neon-cyan">
              <path 
                d="M5 20 L15 20 L15 10 L25 10 L25 30 L35 30" 
                stroke="currentColor" 
                strokeWidth="1" 
                fill="none"
                className="animate-pulse-glow"
              />
              <circle cx="15" cy="20" r="1.5" fill="currentColor" />
              <circle cx="25" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </div>
          
          {/* Candlestick Icon */}
          <Activity className="w-6 h-6 text-neon-green relative z-10 animate-pulse-glow" />
        </div>
        
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-neon-green rounded-full opacity-20 blur-md animate-pulse-glow" />
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-mono text-neon-green">
          DeFi<span className="text-neon-cyan">Options</span>
        </h1>
        <div className="flex items-center gap-1 text-xs text-neon-purple font-mono">
          <Zap className="w-3 h-3" />
          <span>ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLogo;