import styled from 'styled-components'

export const NavContainer = styled.nav`
height: 10vh;
width: 100vw;
font-weight:bold;
display: flex;
background-color: #4568DC;
color: #fff;
justify-content: space-between;
align-items:center;
box-shadow: 0px 0px 1px 0px;
`

export const WalletConnect = styled.button`
    margin-right: 20px;
    height: 50px;
    padding: 0px 25px;
    color: #4568DC;
    border: none;
    border-radius: 25px;
    background: #fff;
    font-weight: bolder;
    font-size: large;
`

export const WalletConnected = styled(WalletConnect)`
  /* background-color: green;
  color:white; */
`