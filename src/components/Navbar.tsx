import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import detectEthereumProvider from '@metamask/detect-provider';
import { NavContainer, WalletConnect, WalletConnected } from "../styles/navbar";
import { PoolCard } from './PoolCard';




let web3: any;
declare let window: any;

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 56, 97, 42, 137],
})

export const Navbar = () => {

 
    const [accounts,setAccounts] = useState<any>('');
    const [chainid,setChainId] = useState<any>();
    const [loading,setLoading] = useState(false);
	  const [name,setName] = useState<any>();
	
	 const { active, account, library, connector, activate, deactivate } =
    useWeb3React<any>();

   let  metamaskConnect = async () =>{  
   
    try {
      console.log("clicked");
      
      setLoading(true);      
      await activate(injected)
      setAccounts(account);
      let chainid = await web3.eth.net.getId();
      setChainId(chainid)   
      console.log(account,library,'account','library'); 
      localStorage.setItem("isactive",JSON.stringify(true))
      setLoading(false); 

  } catch (error) {
      console.log(error)
  }  
  }

  let metaMaskDissconnect = async () => {
   
    try {
      deactivate()  
      localStorage.setItem("isactive",JSON.stringify(false))
      localStorage.clear();
      setAccounts('')
      setChainId('')
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function init(){
      {localStorage.getItem("isactive") && await activate(injected)}
      
    let ethereum:any = await detectEthereumProvider();
     web3 = new Web3(window.ethereum);
      web3.currentProvider.on("accountsChanged", async function () {       
        console.log(active,'----------------a----------------------')
        let accounts = await web3.eth.getAccounts();
        var networkId = await web3.eth.net.getId();
        setAccounts(accounts);
        setChainId(networkId); 
      });
    }
    init()
  },[accounts])

  return (
    <>
      <NavContainer> Address: {account !== 'undefined' && account}
       
       {active ? (
        
          <WalletConnected>Connected</WalletConnected>
          
        ) : ( 
          <WalletConnect onClick={metamaskConnect}>Connect to metamask</WalletConnect>
        )}
          
      </NavContainer>
      <PoolCard account={account}
      library={library}
      active={active}       
     ></PoolCard>
     </>
  );
};