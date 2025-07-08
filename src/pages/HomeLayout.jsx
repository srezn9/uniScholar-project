import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet className="w-11/12 mx-auto"></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;