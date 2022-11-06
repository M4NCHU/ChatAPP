import React, { Children } from 'react'

const Button = ({children, ...props}) => {

  
  return (
    <>
        <button type={props.type} disabled={props.disabled} className={`
          ${props.disabled ? "opacity-50" : " "}
          ${props.w ? "w-" + props.w : ""} ${props.h ? "w-" + props.h : ""} ${props.bg ? props.bg : "glass "} ${props.bgHover ? "hover:" + props.bgHover : " hover:bg-blue-900 "} ${props.text ? props.text : "text-primary "} ${props.weight ? "font-"+props.weight : " "} ${props.paddingY ? " py-"+props.paddingY : " py-1 "} ${props.paddingX ? " px-"+props.paddingX : " px-4 "} ${props.marginR ? " mr-"+props.marginR : " mr-0 "} ${props.marginB ? " mb-"+props.marginB : " mb-0 "} ${props.marginT ? " mt-"+props.marginT : " mt-0 "} ${props.marginL ? " ml-"+props.marginL : " ml-0 "} ${props.border ? " mb-"+props.border : " border-none "} ${props.rounded ? " rounded-"+props.rounded : " rounded-sm "  }
          `}
          >
            {children}
        </button>
    </>
  )
}

export default Button