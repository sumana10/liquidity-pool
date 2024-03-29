import React,{useState, useEffect} from 'react';

/* import Style of Tab Card */
import { LiquidityPool, SpanContainer, PercBlock, Per, FirstInputBox, InputContainer, ButtonContainer, InputPrice, Button, IFButton, ButtonRem, P, Container, PoolTabs, PoolTab, PoolTabList, PoolTabPanel } from '../styles/pool'

//import web3
import Web3 from "web3";

// import addresses
import { Router_address, TokenA_add, TokenB_add   } from '../contracts/addresses';

//import instances
import { Pair_, Router_, TokenA_, TokenB_  } from "../logic/instance";

import {getTokenABalance, getTokenBBalance, getReservesFromPair, approveLpToken, removeLiquidityFromPool} from "../logic/methods"



interface walletProp {
  account: any;
  library: any;
  active: boolean;
}

export const PoolCard: React.FC<walletProp> = ({ account, active, library }) => {
  
  const web3 = new Web3(Web3.givenProvider);

  const [price1, setPrice1] = useState<any>(0);
  const [price2, setprice2] = useState<any>(0);

  const [balance1, setbalance1] = useState(0);
  const [balance2, setbalance2] = useState(0);
  const [LQToken, setTokenBalance] = useState(""); //Initial Total LP token
  const [LPRemoved, setLpRemoved] = useState<string>(""); //LP token to be removed

  const [BUSDreserve, setBUSDreserve] = useState<string>(""); //Total reserve BUSD token in Pair contract
  const [BUSTreserve, setBUSTreserve] = useState<string>("");

   const [btntrigger, setTrigger] = useState(true);

  const [balanceToken1_LP, setbalancebyLP1] = useState(""); //initial TOken to be get
  const [balanceToken2_LP, setbalancebyLP2] = useState("");

  const [BUSDremoved, setBUSDRemove] = useState<any>(); //BUST and BUST tokens to be remved
  const [BUSTremoved, setBUSTRemove] = useState<any>();

  const [totalSupply, setSupply] = useState<number>(); //Total supply in pair Contract

  const [percentage, setPercentage] = useState<number>(100);

  const [buttonText, setText] = useState<string>("Supply");
  const [processing, setProcessing] = useState<boolean>(false);
  const [buttonTextRem, setRemText] = useState<string>("Approve");
  const [fundsBtn, setFundBtn] = useState<boolean>(false);

  useEffect(() => {
    
    getInitialBalance();
  }, [LQToken, totalSupply, BUSDreserve, BUSTreserve, active, account]);

  function intitalTokens(
    Lp: string,
    supply: number,
    Busd: string,
    Bust: string
  ) {
    let token1balance = (Number(Busd) / supply) * Number(Lp);
    let token2balance = (Number(Bust) / supply) * Number(Lp);
  
    setbalancebyLP1(token1balance.toString());
    setbalancebyLP2(token2balance.toString());
  }

  // console.log(library);
  
  function trigger() {
    setTrigger((prev) => !prev);
  }

  // To fetch account details ie,. balance
  async function getInitialBalance() {
    
    const [admin] = await web3.eth.getAccounts();

   
    let tokenOne : any = Number(await getTokenABalance(admin));
    tokenOne = Number(tokenOne).toFixed(4)

  
    let tokenTwo : any = Number(await getTokenBBalance(admin));
    tokenTwo = Number(tokenTwo).toFixed(4)

    if (tokenOne === 0 || tokenTwo === 0) {
      setFundBtn(true);
    }

    //get reserves from the contract to calc price of each token

    let reserves = await getReservesFromPair();
    let resA = reserves._reserve0;
    let resB = reserves._reserve1;

    setBUSDreserve(resA);
    setBUSTreserve(resB);

    const LpToken_amount = await Pair_.methods.balanceOf(admin).call();
    // console.log(LpToken_amount);
    
    if (LpToken_amount != 0) {
      const supply = await Pair_.methods.totalSupply().call();
      // console.log("supply", supply);

      let inEth = Number(web3.utils.fromWei(LpToken_amount, "ether"));
      let LP: string = inEth.toFixed(4).toString();

    
      setTokenBalance(LP);
      setLpRemoved(LP);
      setSupply(Number(supply));
      intitalTokens(LP, Number(supply), resA, resB);
       getBalanceby_LP(0);
      setFundBtn(false);
    } else {
      setTokenBalance("");
    }
   // console.log(bal1);
    setbalance1(tokenOne);
    setbalance2(tokenTwo);
  }

  // Step 1 get price of both tokens by calculating  reserve tokens
  async function getBUSTAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice1(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      let price1_wei = web3.utils.toWei(
        e.currentTarget.value.toString(),
        "ether"
      );
      let amountB = await Router_.methods
        .quote(price1_wei, BUSDreserve, BUSTreserve)
        .call();
     
      let amountB_Eth = web3.utils.fromWei(amountB.toString(), "ether");
      setprice2(Number(amountB_Eth));
    } else {
      setprice2(0);
    }
  }

  async function getBUSDAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setprice2(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      let price2_wei = web3.utils.toWei(
        e.currentTarget.value.toString(),
        "ether"
      );
      let amountA = await Router_.methods
        .quote(price2_wei, BUSTreserve, BUSDreserve)
        .call();
      let amountA_Eth = web3.utils.fromWei(amountA.toString(), "ether");
      setPrice1(Number(amountA_Eth));
    } else {
      setPrice1(0);
    }
  }


  // Step 2 Approve both the tokens

  async function Approve() {
    try {
      const [admin] = await web3.eth.getAccounts();
      let price1_wei = web3.utils.toWei(price1.toString(), "ether");
      let price2_wei = web3.utils.toWei(price2.toString(), "ether");
      setProcessing(true);
      setText("Approving BUSD..");
      await TokenA_.methods
        .approve(Router_address, price1_wei)
        .send({ from: admin })
        .then(async () => {
          setText("Approving BUST..");
          await TokenB_.methods
            .approve(Router_address, price2_wei)
            .send({ from: admin })
            .then(() => {
              setText("Supplying..");
               AddLiquidity();
            });
        });
    } catch (err) {
      if (err) {
        setText("Supply");
        setProcessing(false);
        console.log(err);
        
      }
    }
  }

   // Step 3 call AddLiquidity Method
   async function AddLiquidity() {
    try {
      let priceB = web3.utils.toWei(price2.toString(), "ether");
      let priceA = web3.utils.toWei(price1.toString(), "ether");
      let DeadLine = (Math.round(new Date().getTime() / 1000) + 900).toString();
      const [admin] = await web3.eth.getAccounts();

      const MinBUSD = price1 - (price1 * 1) / 200;
      const MinBUST = price2 - (price2 * 1) / 200;
    
      let MinBUSD_wei: string = web3.utils.toWei(MinBUSD.toString(), "ether");
      let MinBUST_wei: string = web3.utils.toWei(MinBUST.toString(), "ether");

      await Router_.methods
        .addLiquidity(
          TokenA_add,
          TokenB_add,
          priceA,
          priceB,
          MinBUSD_wei,
          MinBUST_wei,
          admin,
          DeadLine
        )
        .send({ from: admin })
        .then((res: any) => {
          console.log(res);
          setText("Supply");
          setProcessing(false);
          getInitialBalance();
          alert("Liquidity added successfully");
          setPrice1(0);
          setprice2(0);
        });
    } catch (err) {
      if (err) {
        setText("Supply");
        setProcessing(false);
      }
    }
  }

  // End  ADDING LIQUIDITY PART 1
  //  REMOVING LIQUIDITY PART 2

  // Step 1 Approve LP Token ie,. Liquidity pool Token which was received after adding Liquidity

  // Before approving calculate how much amount you want to remove

  async function getBalanceby_LP(percent: number) {
    setPercentage(percent);
    try {

      
      let BUSD = (Number(balanceToken1_LP) * percent) / 100;
      let BUST = (Number(balanceToken2_LP) * percent) / 100;
      if(percent === 100){

        let TokenTobeRemove = LQToken;
        setLpRemoved(Number(TokenTobeRemove).toFixed(4).toString());
      }else{
        let TokenTobeRemove = (Number(LQToken) * percent) / 100;
        setLpRemoved(Number(TokenTobeRemove).toFixed(4).toString());
      }
     
      setBUSDRemove(Number(BUSD.toFixed(4)));
      setBUSTRemove(Number(BUST.toFixed(4)));
      
    } catch (err) {
      //console.log("p change",err);
    }
  }

  // Step 2 Approve desired Lp token
  async function approveLP() {
    
    try {
      const [admin] = await web3.eth.getAccounts();
      setRemText("Approving BUST-LP..");
      setProcessing(true);
      const LPtoBeRemoved = web3.utils.toWei(LPRemoved, "ether");
     
      let approvalStatus = await approveLpToken(LPtoBeRemoved);

      if(approvalStatus) {

       // alert("Lp token approved")
        removeLiquidity();
     
      }
    } catch (err) {
      if (err) {
        setProcessing(false);
        setRemText("Approve");
        getInitialBalance();
      }
    }
  }

  async function removeLiquidity() {
    try {
      const [admin] = await web3.eth.getAccounts();
      let DeadLine = (Math.round(new Date().getTime() / 1000) + 2*60).toString();
      const LPtoBeRemoved = web3.utils.toWei(LPRemoved, "ether");
     
      
      const MinBUSD = BUSDremoved - BUSDremoved * (.5/100)
     
      
     const MinBUST = BUSTremoved - BUSTremoved  * ( .5/100);
    
     
      let MinBUSD_wei: string = web3.utils.toWei(MinBUSD.toString(), "ether");
      let MinBUST_wei: string = web3.utils.toWei(MinBUST.toString(), "ether");

      console.log("LP to be removed", LPtoBeRemoved);
      console.log("MinBUSD", MinBUSD_wei);
      console.log("MinBUST", MinBUST_wei);
      
      await Router_.methods
        .removeLiquidity(
          TokenA_add,
          TokenB_add,
          LPtoBeRemoved,
          MinBUSD_wei,
          MinBUST_wei,
          admin,
          DeadLine
        )
        .send({ from: admin })
        .then(() => {
          setProcessing(false);
          setRemText("Approve");

          alert("Liquidity Removed Successfully!");
          getInitialBalance();
        });
    } catch (error) {
      if (error) {
        setProcessing(false);
        setRemText("Failed");
      }
    }
  }
  
  return (
    <Container>
    <PoolTabs
                selectedTabClassName='is-selected'
                selectedTabPanelClassName='is-selected'
            >
                <PoolTabList>
                    <PoolTab>Add</PoolTab>
                    <PoolTab>Remove</PoolTab>
                </PoolTabList>
                <PoolTabPanel> 
    <LiquidityPool>
    <SpanContainer></SpanContainer>
    <FirstInputBox>
      <InputContainer>
        <div className="Input">BUSD</div>
        <div className="Balance">Balance: {balance1}</div>
      </InputContainer>
      <InputPrice
        placeholder="BUSD"
        type="number"
        value={price1}
              onChange={(e: any) => {
                getBUSTAmount(e);
              }}
      />
    </FirstInputBox>
    <div>+</div>

    <FirstInputBox>
      <InputContainer>
        <div className="Input">BUST</div>
        <div className="Balance">Balance: {balance2}</div>
      </InputContainer>
      <InputPrice
        placeholder="BUST"
        value={price2}
              onChange={(e: any) => {
                getBUSDAmount(e);
              }}
      />
    </FirstInputBox>

    <ButtonContainer>
    {fundsBtn ? (
              <IFButton disabled={true}>
                Insufficiant Funds
              </IFButton>
            ) : (
              <Button
                process={processing}
                onClick={Approve}
                disabled={processing}
              >
                {buttonText}
              </Button>
            )}
    </ButtonContainer>

    <div className="yourLiq">
    Your Liquidity:{" "}
            {LQToken ? LQToken.toString() : "You don't have any LP token"}
          </div>
          {LQToken ? (
            <div
              className="rmLq"
              onClick={() => {
                getBalanceby_LP(100);
                trigger()
              }}
            >
             
            </div>
          ) : (
            ""
          )}
    
  </LiquidityPool>
  </PoolTabPanel>
  <PoolTabPanel>
  <LiquidityPool>
          <SpanContainer></SpanContainer>
          <PercBlock>
            <Per  selected={percentage === 25}
              onClick={() => {
                getBalanceby_LP(25);
              }}
            >
              25%
            </Per>
            <Per
             selected={percentage === 50}
             onClick={() => {
               getBalanceby_LP(50);
             }}
            >
              50%
            </Per>
            <Per
             selected={percentage === 75}
             onClick={() => {
               getBalanceby_LP(75);
             }}
            >
              75%
            </Per>
            <Per
               selected={percentage === 100}
               onClick={() => {
                 getBalanceby_LP(100);
               }}
            >
              100%
            </Per>
          </PercBlock>
          <br></br>
          <span>MAX LP to be removed : {LPRemoved}</span>
          <br></br>
          <ButtonContainer>
          <div>
              <P className="p">BUSD : {BUSDremoved}</P>
              <P className="p">BUST : {BUSTremoved}</P>
            </div>
            <ButtonRem
              process={processing}
              onClick={approveLP}
              //  disbled={processing}
            >
              {buttonTextRem}
            </ButtonRem>
          </ButtonContainer>

          <br></br>
          <br></br>
        </LiquidityPool>
  </PoolTabPanel>
  </PoolTabs>
  </Container>
  )
}