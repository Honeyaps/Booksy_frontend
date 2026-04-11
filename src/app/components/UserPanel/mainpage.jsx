import { Navbar } from './userComponents/navbar/navbar';
import { Footer } from './userComponents/footer/footer';
import { SpecialCard } from './userComponents/specialCard/specialCard';
import { Card } from './userComponents/cards/card';
export const Main = () => {
    return (
        <>
        <Navbar/>
        <SpecialCard/>
        <Card/>
        <br/>
        <Footer/>
      
        
      </>
    );
}