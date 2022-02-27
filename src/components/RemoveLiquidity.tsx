import React from 'react'
import { LiquidityPool, SpanContainer, ButtonContainer, PercBlock, Per, Button} from '../styles/pool'


function RemoveLiquidity() {
  return (
    <LiquidityPool>
          <SpanContainer></SpanContainer>
          <PercBlock>
            <Per
            >
              25%
            </Per>
            <Per
             
            >
              50%
            </Per>
            <Per
             
            >
              75%
            </Per>
            <Per
              
            >
              100%
            </Per>
          </PercBlock>
          <br></br>
          <span>MAX LP to be removed :</span>
          <br></br>
          <ButtonContainer>
           <Button>Remove</Button>
          </ButtonContainer>

          <br></br>
          {/* <span>Or</span> */}
          <br></br>
          {/* <Button>Supply</Button> */}
        </LiquidityPool>
  )
}

export default RemoveLiquidity