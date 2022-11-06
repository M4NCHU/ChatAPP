import React, { useEffect } from 'react'

const InputBasic = ({classes, ...props}) => {





  return (
    <input type={props.type} id={props.id} name={props.name} className={`bg-secondary opacity-50 text-sm sm:text-base ${props.pHolderColor ? "" + props.pHolderColor : "placeholder-white"} ${props.pl ? "pl-" + props.pl : ""} rounded-lg border border-none ${props.h ? "h-" + props.h : ""} ${props.w ? "w-" + props.w : ""} focus:outline-none focus:border-indigo-400 transition ease-in-out text-white ${classes}`}
    placeholder={props.placeholder} onChange={props.onChange} onClick={props.onClick} />
  )
}

export default InputBasic