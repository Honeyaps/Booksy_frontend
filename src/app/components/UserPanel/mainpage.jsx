import React, { Suspense } from "react";
import { Navbar } from './userComponents/navbar/navbar';
import { Footer } from './userComponents/footer/footer';

const SpecialCard = React.lazy(() =>
  import('./userComponents/specialCard/specialCard')
);

const Card = React.lazy(() =>
  import('./userComponents/cards/card')
);
export const Main = () => {
    return (
        <>
        <Navbar/>
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <SpecialCard />
         <Card/>
      </Suspense>
       
        <br/>
        <Footer/>
      
        
      </>
    );
}