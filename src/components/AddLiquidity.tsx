import React from 'react'
import { LiquidityPool, SpanContainer, FirstInputBox, InputContainer, ButtonContainer, InputPrice, Button } from '../styles/pool'

interface addProp {
  balance1: any;
  balance2: any;
}
export const AddLiquidity: React.FC<addProp> = ({ balance1, balance2 }) => {
  return (
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
      />
    </FirstInputBox>

    <ButtonContainer>
     <Button>Supply</Button>
    </ButtonContainer>

    <div className="yourLiq">
     
    </div>
    
  </LiquidityPool>
  )
}

