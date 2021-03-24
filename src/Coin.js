import React, { useState} from 'react';
import styled from 'styled-components';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CoinInfoDetails from './CoinInfoDetails';


const CoinEntry = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-right: 0.5rem;
`
const CoinInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 50px;
  padding: 0.25rem;
  margin: 0.5rem auto;
  color: #DEB992  ;
  border-bottom: ${props => props.clicked ? '0px solid #DEB992' : '1px solid #DEB992'  };
  &:hover {
      background-color: #ffffff10;
  }
  cursor: pointer;
`
const CoinImage = styled.img`
  width: auto;
  height: auto;
`
const CoinName = styled.div`
  width: 40%;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`

const CoinPrice = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const CoinPriceChange = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.price_change >= 0 ? 'green' : 'red' };

`

const CoinFavorite = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #80808075;
  &:hover {
    color: #DEB992;
  }
`
const Coin = ({id, name, price, price_change, image}) => {

  const [clicked, setClicked] = useState(false)

  const onClick = () => {
    setClicked(!clicked);
    console.log('click');
  }

  return (
    <CoinEntry >
      <CoinInfo onClick={onClick} clicked={clicked}>
        <CoinImage src={image} alt='crypto'></CoinImage>
        <CoinName> {name} </CoinName>
        <CoinPrice> {price.toFixed(2)} $ </CoinPrice>
        <CoinPriceChange price_change={price_change} > {price_change.toFixed(2)} % </CoinPriceChange>
        <CoinFavorite>
          <FontAwesomeIcon icon={faStar} />
        </CoinFavorite>
      </CoinInfo>
      {  clicked &&  <CoinInfoDetails id={id}/> }
    </CoinEntry>
  )
}

export default Coin;