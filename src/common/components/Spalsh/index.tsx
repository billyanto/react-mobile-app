import { useState, useEffect } from 'react'
import './style.css'
import React from 'react'

function Splash() {
    const [opacity, setOpacity] = useState(1)
    const [display, setDisplay] = useState('block')

    useEffect(() => {
        const fadeOut = setTimeout(() => setOpacity(0), 1000)

        const hideSplash = setTimeout(() => setDisplay('none'), 2000)

        return () => {
            clearTimeout(fadeOut)
            clearTimeout(hideSplash)
        }
    }, [])

    return (
      <div
        className="d-flex flex-column splash-screen"
        style={{
          opacity: opacity,
          display: display,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <h1 className="mx-auto my-auto">APP</h1>
        <div className="text-center mb-5 ">
          Powered by&nbsp;
          <u>
            <strong>APP</strong>
          </u>
        </div>
      </div>
    );
}

export default Splash
