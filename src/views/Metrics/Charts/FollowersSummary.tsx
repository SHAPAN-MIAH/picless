import React, { FunctionComponent, useState } from 'react'
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'USA', value: 500 },
  { name: 'JAPAN', value: 300 },
  { name: 'U.K', value: 100 },
  { name: 'CANADA', value: 50 },
  { name: 'FRANCE', value: 50 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius =  22 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'}  fontSize={12}>
      {`${data[index].name} - ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  const COLORS = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#fff', '#6c757d', '#343a40', '#007bff', '#6c757d', '#28a745', '#17a2b8', '#ffc107', '#dc3545', '#f8f9fa', '#343a40'];


const FollowersSummary: FunctionComponent<{}> = () => {

  return (
    <>
        <div className="widget-box" style={{ margin: '10px 0 5px 0' }}>
            <h3 className="section-title">Followers summary</h3>
            <h4 className="section-title">Country</h4>
            <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={renderCustomizedLabel}
                outerRadius={70}
                dataKey="value"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
        </div>
    </>
  )
}

export default FollowersSummary
