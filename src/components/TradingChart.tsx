import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const TradingChart = () => {
  const data = [
    { time: "09:00", price: 2450, volume: 120 },
    { time: "10:00", price: 2475, volume: 150 },
    { time: "11:00", price: 2425, volume: 180 },
    { time: "12:00", price: 2500, volume: 200 },
    { time: "13:00", price: 2520, volume: 175 },
    { time: "14:00", price: 2490, volume: 160 },
    { time: "15:00", price: 2510, volume: 190 },
    { time: "16:00", price: 2540, volume: 220 },
  ];

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded p-6 h-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-mono text-neon-green">ETH Options Flow</h3>
        <div className="flex items-center gap-4 text-sm font-mono">
          <span className="text-neon-cyan">Last: $2,540</span>
          <span className="text-neon-green">+3.7%</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(120 30% 60%)', fontSize: 12, fontFamily: 'monospace' }}
          />
          <YAxis 
            hide
          />
          <YAxis 
            yAxisId="volume"
            orientation="right"
            hide
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(120 100% 50%)"
            strokeWidth={2}
            dot={false}
            filter="drop-shadow(0 0 6px hsl(120 100% 50% / 0.6))"
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="hsl(180 100% 50%)"
            strokeWidth={1}
            dot={false}
            opacity={0.6}
            yAxisId="volume"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingChart;