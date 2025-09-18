const TickerTape = () => {
  const tickerData = [
    { symbol: "BTC", price: "$42,350", change: "+2.5%" },
    { symbol: "ETH", price: "$2,890", change: "-1.2%" },
    { symbol: "SOL", price: "$98.45", change: "+5.8%" },
    { symbol: "AVAX", price: "$24.67", change: "+3.1%" },
    { symbol: "MATIC", price: "$0.89", change: "-0.8%" },
    { symbol: "DOT", price: "$6.78", change: "+1.9%" },
    { symbol: "LINK", price: "$15.23", change: "+4.2%" },
    { symbol: "ADA", price: "$0.52", change: "-2.1%" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-terminal-surface border-t border-terminal-border overflow-hidden h-12 z-50">
      <div className="flex items-center h-full animate-ticker-scroll whitespace-nowrap">
        {/* Duplicate the content for seamless loop */}
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mx-8 font-mono text-sm"
          >
            <span className="text-neon-cyan font-bold">{item.symbol}</span>
            <span className="text-foreground">{item.price}</span>
            <span
              className={`font-bold animate-flicker ${
                item.change.startsWith("+")
                  ? "text-neon-green"
                  : "text-neon-red"
              }`}
            >
              {item.change}
            </span>
            <div className="w-px h-4 bg-terminal-border mx-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;