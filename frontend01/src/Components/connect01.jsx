import React from 'react'

function Connect01() {
  return (
    <>
      <div className='connectChannelContiner'>
        <h1 id='connectHeading'>Let's set things up</h1>
        <h3 id='connectSubHead'>Connect Your first Channel</h3>
        <div className="gridContainer">
          <div className="card" id='facebook'>
            <div className="iconContainer"><i class="iconn fa-brands fa-facebook"></i></div>
            <h4>Facebook</h4>
            <span>Page or Group</span>
          </div>
          <div className="card" id='instagram'>
            <div className="iconContainer"><i class="iconn fa-brands fa-instagram"></i></div>
            <h4>Instagram</h4>
            <span>Business, Creator or Personal</span>
          </div>
          <div className="card" id='linkedin'>
            <div className="iconContainer"><i class="iconn fa-brands fa-linkedin"></i></div>
            <h4>LinkedIn</h4>
            <span>Page or Group</span>
          </div>
          <div className="card" id='twitter'>
            <div className="iconContainer"><i class="iconn fa-brands fa-x-twitter"></i></div>
            
            <h4>Twitter</h4>
            <span>Page or Group</span>
          </div>
        </div>
      </div>
    </>
  )}

export default Connect01