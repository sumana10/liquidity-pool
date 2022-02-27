import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

interface Process{
  process?:Boolean
}
interface Active{
  selected?:Boolean
}

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 65px);
`;

export const PoolTabs = styled(Tabs)`
    width:90vw;
    max-width: 30rem;
    background: #B06AB3;
    border-radius: 0.5rem;    
    padding: 1rem;
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
`;


export const PoolTabList:any = styled(TabList)`
    display: flex;
    justify-Content: space-evenly;
    font-weight: 500;
    color: #fff;
    text-transform: capitalize; 
    font-size: 1.3rem;
    cursor: pointer;
    padding: 0;
`;

PoolTabList.tabsRole = 'TabList';

export const PoolTab:any = styled(Tab)`
   list-style-type: none;

  &.is-selected {
    border-bottom: 1px solid rgb(236 239 79);;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, .5)
  }
`;
PoolTab.tabsRole = 'Tab';


export const PoolTabPanel:any = styled(TabPanel)`
  &.is-selected {
    display: block;
  }
`;

PoolTabPanel.tabsRole = 'TabPanel';

export const LiquidityPool = styled.div`
  height: 25rem;
  border-radius: 10px;
  font-weight: bolder;
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex: 1 1 0%;
  min-width: 280px;
  -webkit-box-align: center;
  .yourLiq{
    margin-top: 1.8rem;
  }

  .rmLq{
    text-decoration: underline;
    font-size: 15px;
    color: #ff3f34;
    cursor: pointer;
  }
`
export const SpanContainer = styled.span`
height: 10px;
width: 100%;
font-size: x-large;
margin-top: 1rem;
`
export const FirstInputBox = styled.div`
width: 100%;
`

export const InputContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

.Input{
font-size: small;
margin-left: 30px;

}

.Balance{
  font-size:small;
  margin-right: 30px;
}
`

export const ButtonContainer = styled.div`
 height: 50px;
 width: 100%;
 margin-top: 1.5rem;
 display: flex;
 justify-content: space-around;
 align-items: center;
`
export const InputPrice = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  width: 80%;
  background: #ffffff;
  border: none;
  border-radius: 3px;
  outline-color: #0984e3;

  ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    } 
`

export const PercBlock = styled.div`

height: 50px;
width: 100%;
display: flex;
justify-content: space-evenly;
align-items: center;
`

export const Per = styled.div<Active>`
height: 100%;
  width: 20%;
  font-weight:bold;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff;
  color: #4568DC; */
  background-color: ${(props:any) => props.selected?"#4568DC":"#ffffff"};
  color: ${(props:any) => props.selected?"#fff":"#4568DC"};
  cursor: pointer;
  border-radius: 2px;
`
export const  Button = styled.button<Process>`
height: 50px;
width: 80%;
border-radius: 3px;
background-color: white;
color: #4568DC;
font-weight: bolder;
font-size: large;
font-family: Arial, Helvetica, sans-serif;
border: none;
opacity: ${(props:any)=>props.process?0.5:1};
`
export const IFButton = styled(Button)`
background-color:#eb2f06;
color: white;
opacity: 0.5;
`
export const P = styled.p`
font-size: 15px;
`

export const ButtonRem = styled(Button)<Process>`
width: 50%;
opacity: ${(props:any)=>props.process?0.5:1};
`