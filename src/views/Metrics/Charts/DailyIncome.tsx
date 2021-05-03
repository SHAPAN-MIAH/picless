import React, { FunctionComponent, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import { isMobile } from 'react-device-detect'


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
    <div className="widget-box">
    <h3 className="section-title">Daily Earnings report (Stacked column chart)</h3>
      <div className="widget-box-content">
          <div className="chart-wrap">
            <ResponsiveContainer width='100%' height={ isMobile ? 280 : 400}>
              <BarChart data={data} >
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <CartesianGrid vertical={false} stroke="#E8EBEE" height={100} />
                <Bar stackId="0" dataKey="uv" barSize={10} fill="#6f42c1"/>
                <Bar stackId="0" dataKey="pv" barSize={10} fill="#23d2e2" />
                <Legend width={100} wrapperStyle={{  right: 20,  borderRadius: 3, lineHeight: '40px' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
    </>
  )
}

export default DailyIncome
