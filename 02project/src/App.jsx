import { useState, useCallback,useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [special, setSpecial] = useState(false)
  const [Password, setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)

  const generater= useCallback(() => {
    let pass= ""
    let str = "QWERTYUIOPLKHJGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq"

    if (num) {
      str += "1234567890"
    }
    if(special) {
      str += "~`!@#$%^&*:;+=-_"
    }

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
      setPassword(pass)

  },
    
    [length, num, special, setPassword])

    const copyPasswordToCliboard = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(Password)
    },[Password])

    useEffect(()=>{generater()}, [length,num,special,generater])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password generater</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        
<div  className='flex shadow rounded-lg overflow-hidden mb-4'>
  <input 
  type="text"
  value={Password}
  className='outline-none w-full py-1 px-3'
  placeholder='password'
  readOnly
  ref={passwordRef}
  />

  <button onClick={copyPasswordToCliboard}
   className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'
  >copy</button>
</div>

<div className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
  <input type="range"
  min={6}
  max={25}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>{setLength(e.target.value)}}/>
  <label htmlFor="">Length:{length}</label>
</div>
<div className='flex items-center gap-x-1'>
  <input type="checkbox" 
  defaultChecked={num}
  id='numberinput'
  onChange={()=>{setNum((prev)=> !prev)}}/>
  <label htmlFor="numberinput">numbers</label>
</div>

<div className='flex items-center gap-x-1'>
  <input type="checkbox" 
  defaultChecked={special}
  id='secialinput'
  onChange={()=>{setSpecial((prev)=> !prev)}}/>
  <label htmlFor="specialinput">special chars</label>
</div>
</div>

        </div>
    </>
  )
}

export default App
