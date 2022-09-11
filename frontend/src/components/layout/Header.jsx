import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainLogo } from '../../assets/images';
import { GiHamburgerMenu } from 'react-icons/gi';
import { DrawerMenu, User } from '../../utils';
import { useAuth } from '../../context';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrFavorite, GrUserAdmin } from 'react-icons/gr';
import { nanoid } from 'nanoid';

const Header = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();

  const NAVBAR = [
    {
      title: 'Tus reservas',
      icon: <AiOutlineCalendar />,
      link: '/yourreservations',
    },
    {
      title: 'Tus favoritos',
      icon: <GrFavorite />,
      link: '/yourfavourites',
    },
  ];

  const handleOpenDrawer = () => {
    setisDrawerOpen(true);
  };

  const buttonRendering = () => {
    if (location.pathname === '/login') {
      return (
        <Link to='/signup' className='btn-secondary'>
          Crear cuenta
        </Link>
      );
    } else if (location.pathname === '/signup') {
      return (
        <Link to='/login' className='btn-secondary'>
          Iniciar sesión
        </Link>
      );
    } else {
      return (
        <>
          <Link to='/signup' className='btn-secondary'>
            Crear cuenta
          </Link>
          <Link to='/login' className='btn-secondary'>
            Iniciar sesión
          </Link>
        </>
      );
    }
  };
  return (
    <>
      <header className='fixed z-40 w-full px-10 bg-white'>
        <div className='container mx-auto h-24 flex justify-between items-center'>
          <Link
            to='/'
            className='flex items-end h-12 gap-3 hover:scale-[1.01] ease-in-out transition-all'
          >
            <img src={mainLogo} alt='Logo' />
            <h2 className='hidden lg:block font-light text-lg'>
              Sentite como en tu hogar
            </h2>
          </Link>
          <div className='hidden p-2 md:flex gap-4'>
            {currentUser &&
              NAVBAR.map((tab) => {
                return (
                  <Link
                    key={nanoid()}
                    to={tab.link}
                    className='flex-center gap-2 cursor-pointer border-r-2 pr-4 pt-1 border-primary font-semibold'
                  >
                    {tab.icon}
                    <p className='hover:text-primary hover:scale-105'>
                      {tab.title}
                    </p>
                  </Link>
                );
              })}
            {currentUser?.role === 'admin' && (
              <Link
                to='/createproduct'
                className='flex-center gap-2 cursor-pointer border-r-2 pr-4 pt-1 border-primary font-semibold'
              >
                <GrUserAdmin />
                <p className='hover:text-primary hover:scale-105'>
                  Administración
                </p>
              </Link>
            )}
            {currentUser ? <User /> : <>{buttonRendering()}</>}
          </div>
          <GiHamburgerMenu
            className='md:hidden cursor-pointer text-tertiary text-3xl'
            onClick={handleOpenDrawer}
          />
        </div>
      </header>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        setisDrawerOpen={setisDrawerOpen}
      />
    </>
  );
};

export default Header;
