import React, { FunctionComponent, useState } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';


const DailyIncome: FunctionComponent<{}> = () => {

  const data = [
    { name: 'food', uv: -2000, pv: -2013, amt: -4500, bmk: -4301, time: 1, uvError: [100, 50], pvError: [110, 20] },
    { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, bmk: 2000, time: 2, uvError: 120, pvError: 50 },
    { name: 'storage', uv: 3200, pv: 1398, amt: 5000, bmk: 3000, time: 3, uvError: [120, 80], pvError: [200, 100] },
    { name: 'digital', uv: 2800, pv: 2800, amt: 4000, bmk: 1500, time: 4, uvError: 100, pvError: 30 },
  ];

  return (
    <>
      <p>Stack BarChart</p>
        <div className="bar-chart-wrapper">
          <BarChart width={400} height={400} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid vertical={false} />
            <Bar stackId="0" dataKey="uv" fill="#ff7300">
              <LabelList />
            </Bar>
            <Bar stackId="0" dataKey="pv" fill="#387908" />
            <Bar dataKey="amt" fill="#387908">
              <LabelList />
            </Bar>
            <Legend layout="vertical" />
          </BarChart>
        </div>

    </>
  )
}

export default DailyIncome
