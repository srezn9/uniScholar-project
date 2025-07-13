import React from 'react';
import Banner from '../components/Banner';
import TopScholarships from '../components/TopScholarships';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQSection from '../components/FAQSection';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <TopScholarships ></TopScholarships>
            <WhyChooseUs></WhyChooseUs>
             <FAQSection ></FAQSection>
        </div>
    );
};

export default Home;