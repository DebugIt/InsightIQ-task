import React, { useState } from 'react'
import { IoMdEye } from 'react-icons/io'
import { IoEyeOff } from 'react-icons/io5'

const InputField = ({ placeholder, type, label, value, textfunc }) => {

    const [showPass, setShowPass] = useState(false)

  return (
    <>
        <div id="component-container">
            {
                type === "password" ? (
                    <>
                        <p>{label}</p>
                        <div id="pwd-field" className='flex gap-2 my-1 p-2 border rounded-md items-center hover:border-black transition-all'>
                            <input 
                                type={showPass ? "text" : "password"} 
                                value={value}
                                onChange={textfunc}
                                placeholder={placeholder}
                                className='p-1 px-4 w-full outline-none'
                            />
                            {
                                showPass ? (
                                    <IoMdEye onClick={() => setShowPass(!showPass)}/>
                                ) : (
                                    <IoEyeOff onClick={() => setShowPass(!showPass)}/>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <p>{label}</p>
                        <input 
                            type={type} 
                            value={value}
                            onChange={textfunc}
                            placeholder={placeholder}
                            className='my-1 p-3 px-4 border rounded-md outline-none w-full hover:border-black transition-all'
                        />
                    </>
                )
            }
        </div>
    </>
  )
}

export default InputField