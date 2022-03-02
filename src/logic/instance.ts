import Web3 from "web3";
import { Pair_Address, Router_address, TokenA_add, TokenB_add   } from '../contracts/addresses';
import { Pair, Router, TokenA, TokenB  } from '../contracts/abi';

const web3 = new Web3(Web3.givenProvider)

export const  Pair_: any = new web3.eth.Contract(Pair,Pair_Address);

export const Router_:any = new web3.eth.Contract(Router, Router_address);

export const TokenA_ :any = new web3.eth.Contract(TokenA,TokenA_add);

export const TokenB_ :any = new web3.eth.Contract(TokenB,TokenB_add);
 

    