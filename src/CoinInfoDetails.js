import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CoinChart from './CoinChart';
import Loading from './Loading';

const InfoDetails = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  height: auto;
  padding: 1rem 0.25rem;
  margin: 0.5rem auto;
  color: #DEB992  ;
  border-bottom: 1px solid #DEB992;
`
const Prices = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px dotted #1ba0984f;
`

const CoinPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`
const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  border: 1px dotted #1ba0984f;
`

const CoinInfoDetails = ({id}) => {
  const [details, setDetails] = useState(null);

  useEffect(() =>{
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then(response => {
      setDetails(response.data);
    })
    .catch(error => console.log(error))
  }, [id]);

  if ( details === null ) 
    return ( <Loading type={'spin'}/> )
  else
    return (
      <InfoDetails>
        <Prices>
          <CoinPrice> {details.market_data.current_price.usd.toFixed(4)} $ </CoinPrice>
          <CoinPrice> {details.market_data.current_price.eur.toFixed(4)} € </CoinPrice>
          <CoinPrice> {details.market_data.current_price.pln.toFixed(4)} PLN </CoinPrice>
        </Prices>
        <ChartContainer>
          <CoinChart id={id}/>
        </ChartContainer>
      </InfoDetails>
    )
}

export default CoinInfoDetails
