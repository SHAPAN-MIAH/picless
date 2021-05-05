import React, { FunctionComponent, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts'
import { isMobile } from 'react-device-detect'

const data = [
  {
    name: '18-24',
    Hombre: 4000,
    Mujer: 2400,
  },
  {
    name: '25-34',
    Hombre: 3000,
    Mujer: 1398,
  },
  {
    name: '35-44',
    Hombre: 2000,
    Mujer: 9800,
  },
  {
    name: '45-54',
    Hombre: 2780,
    Mujer: 3908,
  },
  {
    name: '55-64',
    Hombre: 1890,
    Mujer: 4800,
  },
  {
    name: '65+',
    Hombre: 2390,
    Mujer: 3800,
  },
]
const Barcharts: FunctionComponent<{}> = () => {
  const DataFormater = (number: number) => {
    if (number > 1000000000) {
      return (number / 100000000).toString() + '%'
    } else if (number > 1000000) {
      return (number / 100000).toString() + '%'
    } else if (number > 1000) {
      return (number / 100).toString() + '%'
    } else {
      return number.toString() + '%'
    }
  }

  return (
    <>
      <div className="widget-box" style={{ margin: '10px 0 5px 0' }}>
        <h5 className="section-title">Age and Gender</h5>
        <div className="widget-box-content">
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={500} height={300} data={data} barSize={30}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={DataFormater} />
                <Tooltip />
                <Legend />
                <CartesianGrid vertical={false} stroke="#E8EBEE" height={100} />
                <Bar dataKey="Hombre" fill="#007bff" background={{ fill: '#eee' }} />
                <Bar dataKey="Mujer" fill="#23d2e2" background={{ fill: '#eee' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Barcharts
