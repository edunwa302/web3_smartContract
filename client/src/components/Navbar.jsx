import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

// assets
import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';


const NavbarItem = ({title, classProps}) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}` }>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex justify-between items-center md:justify-center p-4">
            <div className="flex md:flex-[0.5] justify-start items-center">
                <img src={logo2} alt="logo" className='w-32 h-16 cursor-pointer'/>
            </div>
            <ul className='text-white flex-initial hidden md:flex list-none flex-row justify-between items-center'>
                {["market","Exchange","Tutorials","Wallets"].map((item,index) => (
                    <NavbarItem key={index + item} title={item} />
                ))}
                <li className='bg-[#2952e3] py-3 px-7 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>
            </ul>
            {/* mobile */}
            <div className="flex  relative">
                {
                    toggleMenu ? 
                        <AiOutlineClose fontSize={28} className="text-white cursor-pointer md:hidden" onClick={() => setToggleMenu(false)} /> : 
                        <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer md:hidden" onClick={() => setToggleMenu(true)}/>
                    
                }
                {
                    toggleMenu && (
                        <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
                            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                            <li className="text-xl w-full my-2">
                                <AiOutlineClose onClick={() => setToggleMenu(false)} />
                            </li>
                            {["market","Exchange","Tutorials","Wallets"].map((item,index) => (
                                <NavbarItem key={index + item} title={item} classProps="my-2 text-lg" />
                            ))}
                        </ul>
                    )
                }
            </div>
        </nav>
    ) 
}
 
export default Navbar;