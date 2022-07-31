import React from 'react'
import "../styles/loading.scss"
export const LoadingPage = () => {
  return (
    <div className="wrap">
      <div className="loading">
      <div className="bounceball" />
      <div className="text">NOW LOADING</div>
    </div>
  </div>
  )
}
