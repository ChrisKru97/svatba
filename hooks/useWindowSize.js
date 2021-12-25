import { useState, useEffect } from "react";

 const  useWindowSize = ()=> {
     const [windowSize, setWindowSize] = useState({
       width: 0,
       height: 0,
     });

     const hasWindow = typeof window !== 'undefined'

     useEffect(() => {
       if (hasWindow) {
         const  handleResize = () => {
           setWindowSize({
             width: window.innerWidth,
             height: window.innerHeight,
           });
         }

         window.addEventListener("resize", handleResize);

         handleResize();

         return () => window.removeEventListener("resize", handleResize);
       }
     }, [hasWindow]); 

     return windowSize;
   }

   export default useWindowSize 