import React, { FunctionComponent, useState } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';


const DailyIncome: FunctionComponent<{}> = () => {

  const data = [
    { name: 'food', uv: 2000, pv: 2013 },
    { name: 'cosmetic', uv: 3300, pv: 2000 },
    { name: 'storage', uv: 3200, pv: 1398 },
    { name: 'digital', uv: 2800, pv: 2800 },
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
            <Bar stackId="0" dataKey="uv" fill="#6f42c1">
              <LabelList />
            </Bar>
            <Bar stackId="0" dataKey="pv" fill="#23d2e2" />
            <Legend layout="vertical" />
          </BarChart>
        </div>

    </>
  )
}

export default DailyIncome
