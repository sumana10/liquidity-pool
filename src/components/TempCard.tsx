import React from 'react'

interface walletProp {
  account: any;
  library: any;
  active: boolean;
}
export const TempCard: React.FC<walletProp> = ({ account, active, library }) => {
  return (
    <div>TempCard</div>
  )
}
