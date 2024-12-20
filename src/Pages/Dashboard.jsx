import React from 'react'
import { useSelector } from 'react-redux'
import LeftPanal from '../components/common/LeftPanal'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  const isLoading = profileLoading || authLoading;

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <LeftPanal />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};


export default Dashboard