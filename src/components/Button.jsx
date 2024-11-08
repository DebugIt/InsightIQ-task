import React from 'react'

const Button = ({ title, css, clickFunction }) => {
  return (
    <div onClick={clickFunction} className={` w-full my-1 px-3 text-center p-2 rounded-md bg-black hover:bg-[#292929] transition-all cursor-pointer select-none text-white ${css} `}>
        <button>
            {title}
        </button>
    </div>
  )
}

export default Button