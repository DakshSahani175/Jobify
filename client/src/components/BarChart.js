import {
    BarChart,
    Bar, 
    CartesianGrid,
    XAxis, 
    YAxis, 
    Legend, 
    Tooltip, 
    ResponsiveContainer ,
} from "recharts";

const BarChartComponent = ({data})=>{
    
    return (
        <ResponsiveContainer width="100%" height={400} >
            <BarChart data={data} margin={{top: 50,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartComponent;