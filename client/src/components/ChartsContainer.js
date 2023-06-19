import React, {useState} from "react";
import {useAppContext} from "../context/appContext";
import { BarChartComponent, AreaChartComponent } from "../components";
import Wrapper from "../assets/wrappers/ChartsContainer";

export default function ChartsContainer(){
    const [barChart , setBarChart] = useState(true);
    const {monthlyApplication : data} = useAppContext();

    return (
        <Wrapper>
            <h4>Monthly Application</h4>
            <button type="button" onClick={()=>{setBarChart(!barChart)}}>
                {barChart ? "AreaChart" : "BarChart"}
            </button>
            {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    );
}

