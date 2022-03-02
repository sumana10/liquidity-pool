import Web3 from "web3";
import { Pair_Address, Router_address, TokenA_add, TokenB_add   } from '../contracts/addresses';
import { Pair, Router, TokenA, TokenB  } from '../contracts/abi';

const web3 = new Web3(
  Web3.givenProvider || "https://data-seed-prebsc-2-s3.binance.org:8545/"
);

export const getTokenABalance = async (address: string) =>{
  try{

    let tokenInstance = new web3.eth.Contract(TokenA, TokenA_add);

    let balance = web3.utils.fromWei(await tokenInstance.methods.balanceOf(address).call(), "ether")

    return balance;

  }catch(error){
    console.log(error);
  }
}
export const getTokenBBalance = async (address: string) =>{
  try{

    let tokenInstance = new web3.eth.Contract(TokenB, TokenB_add);

    let balance = web3.utils.fromWei(await tokenInstance.methods.balanceOf(address).call(), "ether")

    return balance;

  }catch(error){
    console.log(error);
  }
}

export const getReservesFromPair = async () => {
  try {
    let Pair_ = new web3.eth.Contract(Pair, Pair_Address);
    let reserves = await Pair_.methods.getReserves().call();

    return reserves;
  } catch (error) {
   console.log(error)
  }
};

// export const getPriceOfOtherToken = async (
//   price: any,
//   reserveA: any,
//   reserveB: any
// ) => {
//   try {
    
//     let Router_ = new web3.eth.Contract(Router, Router_address);
//     let amount = await Router_.methods
//       .quote(price, reserveA, reserveB)
//       .call();
//     return amount;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const approveLpToken = async (lpTokenValue: any) => {
  try {
    let userAddress = await web3.eth.getAccounts();

    let Pair_ = new web3.eth.Contract(Pair, Pair_Address);

    let allowance = await Pair_.methods
      .allowance(userAddress[0], Router_address)
      .call();

    //console.log("allowance----", allowance);
    let updatedAmount: any;

    if (
      Number(web3.utils.fromWei(allowance, "ether")) ===
      Number(web3.utils.fromWei(lpTokenValue, "ether"))
    ) {
      return true;
    } else if (
      Number(web3.utils.fromWei(allowance, "ether")) >
      Number(web3.utils.fromWei(lpTokenValue, "ether"))
    ) {
      return true;
    } else if (
      Number(web3.utils.fromWei(allowance, "ether")) <
      Number(web3.utils.fromWei(lpTokenValue, "ether"))
    ) {
      updatedAmount = lpTokenValue;
    }

    let approval = await Pair_.methods
      .approve(Router_address, updatedAmount)
      .send({ from: userAddress[0] });

    //console.log("approval----", approval);

    return approval;
  } catch (error) {
    //console.log("approveLpToken Error:", error);
    alert("Approval of LP Token Failed");
  }
};

export const removeLiquidityFromPool = async (
  tokenA: any,
  tokenB: any,
  liquidity: any,
  amountAMin: any,
  amountBMin: any,
  to: any,
  deadline: any
) => {
  try {
    let Spender = new web3.eth.Contract(Router, Router_address);

    let userAddress = await web3.eth.getAccounts();

    let tx = await Spender.methods
      .removeLiquidity(
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        to,
        deadline
      )
      .send({
        from: userAddress[0],
      });

    return tx;
  } catch (error) {
    //console.log("removeLiquidity Error: ", error);
    alert("Removing Liquidity Failed");
  }
};
