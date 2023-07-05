'use client';
import {Toaster} from 'react-hot-toast';

function Providers({children}) {
  return (
    <>
    <Toaster position='top-center' reverseOrder={false} />
    {children}
    </>
  )
}

export default Providers