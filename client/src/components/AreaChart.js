import {
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
} from "recharts";

const AreaChartComponent = ({data})=>{
    
    return (
        <ResponsiveContainer height={400} width="100%">
            <AreaChart data={data} margin={{top: 50,}}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="2%" stopColor="#2cb1bc" stopOpacity={0}/>
                        <stop offset="98%" stopColor="#2cb1bc" stopOpacity={0.7}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="count" stroke="#2cb1bc" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AreaChartComponent;