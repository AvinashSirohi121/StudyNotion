import React from 'react'

const HighlightText = ({text,fromColor, toColor}) => {
  
  return (
    
   <span className="font-[700] bg-clip-text text-transparent bg-gradient-to-t from-blue-1200 via-blue-1100 to-blue-1000">{" "}
    {text}
    </span>
  
  )
}



export default HighlightText