import React, { FunctionComponent, useState } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';


const DailyIncome: FunctionComponent<{}> = () => {

  const data = [
    { name: '1', uv: 2000, pv: 2013 },
    { name: '2', uv: 3300, pv: 2000 },
    { name: '3', uv: 200, pv: 198 },
    { name: '4', uv: 800, pv: 200 },
    { name: '5', uv: 200, pv: 213 },
    { name: '6', uv: 3300, pv: 2000 },
    { name: '7', uv: 3200, pv: 1398 },
    { name: '8', uv: 2800, pv: 2800 },
    { name: '9', uv: 2000, pv: 2013 },
    { name: '10', uv: 3300, pv: 2000 },
    { name: '11', uv: 3200, pv: 1398 },
    { name: '12', uv: 2800, pv: 2800 },
    { name: '13', uv: 2000, pv: 2013 },
    { name: '14', uv: 3300, pv: 2000 },
    { name: '15', uv: 3200, pv: 1398 },
    { name: '16', uv: 2800, pv: 2800 },
    { name: '17', uv: 2000, pv: 2013 },
    { name: '18', uv: 3300, pv: 2000 },
    { name: '19', uv: 3200, pv: 1398 },
    { name: '20', uv: 2800, pv: 2800 },
    { name: '21', uv: 2000, pv: 2013 },
    { name: '22', uv: 3300, pv: 2000 },
    { name: '23', uv: 3200, pv: 1398 },
    { name: '24', uv: 2800, pv: 2800 },
    { name: '25', uv: 2000, pv: 2013 },
    { name: '26', uv: 3300, pv: 2000 },
    { name: '27', uv: 3200, pv: 1398 },
    { name: '29', uv: 2800, pv: 2800 },
    { name: '30', uv: 2800, pv: 2800 },
    { name: '31', uv: 2800, pv: 2800 },
  ];

  return (
    <>
    <div className="widget-box" >
      <div className="widget-box-content">
      <p>Stack BarChart</p>
          <div className="chart-wrap">
            <BarChart width={900} height={400} data={data}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip />
              <CartesianGrid vertical={false}/>
              <Bar stackId="0" dataKey="uv" fill="#6f42c1">
                <LabelList />
              </Bar>
              <Bar stackId="0" dataKey="pv" fill="#23d2e2" />
              <Legend layout="vertical" />
            </BarChart>
          </div>
        </div>
    </div>
    </>
  )
}

export default DailyIncome
