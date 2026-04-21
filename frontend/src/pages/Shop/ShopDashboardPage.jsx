import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx';
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar.jsx';
function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px 800px:]w-[330px]'>
          <DashBoardSideBar active={1}/>
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage