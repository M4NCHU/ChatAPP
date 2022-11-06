

const Icon = ({icon, classes="", size, hover}) => {
  return (
    <>
        <svg className={`
          ${size ? "w-" + size + " h-" + size  : "w-6 h-6"}
          cursor-pointer ${hover ? "hover:" + hover : " hover:text-secondary"}
           ${classes}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
    </>
  )
}

export default Icon