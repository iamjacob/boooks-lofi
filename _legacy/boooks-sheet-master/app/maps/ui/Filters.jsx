import React from 'react'
import { Tornado } from 'lucide-react'

const Filters = () => {
  return (
    <button
    className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"
    onClick={()=>{console.log('Filters')}}
    >

<Tornado/>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tornado-icon lucide-tornado"><path d="M21 4H3"/><path d="M18 8H6"/><path d="M19 12H9"/><path d="M16 16h-6"/><path d="M11 20H9"/></svg> */}
    
    </button>
  )
}

export default Filters