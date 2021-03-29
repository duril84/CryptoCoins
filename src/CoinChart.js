import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Chart from './Chart';
import Loading from './Loading';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 100%;
  padding: 5px;
  border: 1px dotted #1ba0984f;
`

const ButtonToggle = styled.button`
  width: auto;
  height: 20px;
  margin: 0px 10px;
  background: transparent;
  border: 1px solid;
  border-radius: 5px;
  color: ${props => (props.active? '#DEB992' : '#1ba0984f')};
  outline-style: none;
  &:hover {
    color: #DEB992;
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
`;

const buttonsNames = [ `1 day`, `7 days`, `14 days`, `30 days`, `365 days` ];

const ToggleGroup = (props) => {
  const [active, setActive] = useState(buttonsNames[0]);

  return (
    <ButtonGroup>
      {buttonsNames.map(name => (
        <ButtonToggle key={name} active={active === name} onClick={() => {props.chooseDays(name.split(" ")); setActive(name);} }  >
          {name}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  )
}


const CoinChart = (props) => {
  const [priceHistory, setPriceHistory] = useState(null);
  const [daysInterval, setDaysInterval] = useState(1);

  useEffect(() =>{
    axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${daysInterval}`)
    .then(response => {
      const data = response.data.prices.map( (history) => ( { name: (new Date ( history.[0] )).toString().slice(4,10), date: new Date ( history.[0] ), price: history.[1] } ) )
      setPriceHistory(data);
    })
    .catch(error => console.log(error))
  }, [props.id,daysInterval]);

  const chooseDays = (daysNumber) => {
    setDaysInterval(daysNumber);
  }

  if ( priceHistory === null ) 
    return ( <div><Loading type={'spin'}/></div> )
  else
    return (
    <ChartContainer>
      <ToggleGroup chooseDays={chooseDays}/>
      <Chart data={priceHistory}/>
    </ChartContainer>
  )
}

export default CoinChart;