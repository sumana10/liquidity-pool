import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { NavContainer, WalletConnect, WalletConnected } from "../styles/navbar";
import { PoolCard } from './PoolCard';


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 56, 97, 42, 137],
})

export const Navbar = () => {

 
	 const { active, account, library, activate, deactivate } =
    useWeb3React<any>();

    const  connect = async () =>{
      
      try {
        await activate(injected).then(()=>{
         console.log("connected");
         localStorage.setItem('isWalletConnected', 'true')
         
        });
        
      } catch (err) {
        console.log(err);
      }
    }
    
    const  disconnect = async () =>{
      
      try {
        deactivate()
        localStorage.setItem('isWalletConnected', 'false')
        localStorage.clear()
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      const connectWalletOnPageLoad = async () => {
        if (localStorage?.getItem('isWalletConnected') === 'true') {
          try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', 'true')
          } catch (err) {
            console.log(err)
          }
        }
      }
      connectWalletOnPageLoad()
    }, []);
    

  
  

  return (
    <>
      <NavContainer> Address: {account !== 'undefined' && account}
       
       {active ? (
        
          <WalletConnected onClick={disconnect}>Connected</WalletConnected>
          
        ) : ( 
          <WalletConnect onClick={connect}>Connect to metamask</WalletConnect>
        )}
          
      </NavContainer>
      <PoolCard account={account}
      library={library}
      active={active}       
     ></PoolCard>
     </>
  );
};