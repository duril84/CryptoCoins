import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Coin from './Coin';
import styled from 'styled-components';
import Loading from './Loading';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: 0;
  min-height: 100vh;
  background-color: #051622;
  `
const Logo = styled.div`
  font-family: 'Cormorant Unicase', serif;
  color: #1BA098;
  padding-bottom: 2rem;
`
 
const LogoPart1 = styled.div`
  font-size: 5rem;
  border-bottom: 1px solid;
` 
const LogoPart2 = styled.div`
  font-family: monospace;
  font-size: 1rem;
  float: right;
`
    
const Search = styled.input`
  margin-bottom: 2rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-width: 0.25rem;
  border-radius: 15px;
  border-color: #DEB992;
  outline: none;
  text-align: center;
`

const App = () => {
  const [ coins, setCoins ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() =>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      setCoins(response.data);
    })
    .catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  // Add loader !!!!
  if ( coins.length === 0 ) 
    return ( <Loading/> )
  else
    return (
      <Container>
        <Logo> 
          <LogoPart1>CryptoCoin$</LogoPart1>
          <LogoPart2>powered by coingecko</LogoPart2>
        </Logo>

        <form>
          <Search type='text' placeholder='search' onChange={handleChange}/>
        </form>

        {/* <ToggleGroup coins={filteredCoins}></ToggleGroup> */}

        {filteredCoins.map(coin => {
          return (
            <Coin 
              key={coin.id}
              id={coin.id}
              name={coin.name}
              price={coin.current_price}
              price_change = {coin.price_change_percentage_24h}
              image={coin.image}>
            </Coin>
          )
        })}

      </Container>
    )
}

// const Collection = styled.ul`
  
// `

// const CollectionElement = styled.li`

// `

// const CollectionElementEntry = styled.div`
//   display: ${props => (props.active ? 'none' : 'block')};
// `

// const App = () => {
//   const [ active, setActive ] = useState(null);
  
//   const collection = ['red', 'blue', 'green', 'yellow', 'black'];

//   return (
    
//     <Collection>
//       {collection.map(e => 
//         <CollectionElement onClick={()=> active!==e ? setActive(e) : setActive(null)}>
//            {e}
//            <CollectionElementEntry active={e!==active}>
//              test tetsdadfaf
//            </CollectionElementEntry>
//         </CollectionElement>
//       )}
//     </Collection>

//   )

// }

export default App;
