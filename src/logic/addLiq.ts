import { Pair, Pair_Address } from "../contracts/Pair";
import { Router, Router_address } from "../contracts/Router";
import Web3 from "web3";
import { TokenA_add,TokenA } from "../contracts/TokenA";
import { TokenB, TokenB_add} from "../contracts/TokenB";

const web3 = new Web3(Web3.givenProvider)

export const  Pair_: any = new web3.eth.Contract(Pair,Pair_Address);

export const Router_:any = new web3.eth.Contract(Router, Router_address);

export const TokenA_ :any = new web3.eth.Contract(TokenA,TokenA_add);

export const TokenB_ :any = new web3.eth.Contract(TokenB,TokenB_add);
 

    