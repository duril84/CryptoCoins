import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div> {`${label.toString()}`} </div>
        <div> price: ${payload[0].value.toFixed(4)} </div>
      </div>
    );
  }
  return null;
};

class Chart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={500}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Area type="monotone" dataKey="price" stroke="#1BA098" fill="#1BA098" dot={{r: 0}} activeDot={{ r: 3 }} />
        {/* <Brush /> */}
        </AreaChart>
      </ResponsiveContainer>
      
    );
  }
}


export default Chart;

