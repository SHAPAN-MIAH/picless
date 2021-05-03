import React, { FunctionComponent, useState } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';


const DailyIncome: FunctionComponent<{}> = () => {

  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];

  return (
    <>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
                type="monotone"
                dataKey="Users.count"
                name="Users"
                stroke="rgb(106, 110, 229)"
                fill="rgba(106, 110, 229, .16)"
              />
        </AreaChart>
    </>
  )
}

export default DailyIncome
