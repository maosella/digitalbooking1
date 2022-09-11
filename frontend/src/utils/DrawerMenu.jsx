import React, { useEffect } from 'react';
import { SocialList, User } from '.';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrFavorite, GrUserAdmin } from 'react-icons/gr';

const DrawerMenu = ({ isDrawerOpen, setisDrawerOpen }) => {
  const { logout, currentUser } = useAuth();
  let navigate = useNavigate();

  const handleCloseDrawer = () => {
    setisDrawerOpen(false);
  };
  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    isDrawerOpen && (document.body.style.overflow = 'hidden');
    !isDrawerOpen && (document.body.style.overflow = 'unset');
  }, [isDrawerOpen]);

  return (
    <div
      className={`${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-[200%]'
      }  fixed z-50 flex flex-col duration-700 w-screen h-screen bg-white text-white font-bold md:hidden`}
    >
      <div className='flex justify-between items-end h-72 bg-primary'>
        <AiOutlineClose
          className='self-start m-4 cursor-pointer text-2xl'
          onClick={handleCloseDrawer}
        />
        {currentUser ? <User /> : <h2 className='mx-4 my-2'>MENÚ</h2>}
      </div>
      <div className='h-full flex flex-col items-end gap-4 py-8 px-4 text-tertiary'>
        {!currentUser ? (
          <>
            <Link to='/signup' onClick={handleCloseDrawer}>
              Crear cuenta
            </Link>
            <Link to='/login' onClick={handleCloseDrawer}>
              Iniciar Sesión
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/yourreservations'
              className='flex-center gap-2 hover:scale-105 cursor-pointer group'
            >
              <AiOutlineCalendar />
              <p className='group-hover:text-primary'>Tus reservas</p>
            </Link>
            <Link
              to='/yourfavourites'
              className='flex-center gap-2 hover:scale-105 cursor-pointer group'
            >
              <GrFavorite />
              <p className='group-hover:text-primary'>Tus favoritos</p>
            </Link>
            {currentUser.role === 'admin' && (
              <Link
                to='/createproduct'
                className='flex-center gap-2 hover:scale-105 cursor-pointer group'
              >
                <GrUserAdmin />
                <p className='group-hover:text-primary'>Administración</p>
              </Link>
            )}
          </>
        )}
      </div>
      {currentUser && (
        <div className='border-b-2 border-tertiary mx-4'>
          <p className='text-secondary text-right font-light my-1'>
            ¿Deseas
            <button
              className='inline text-primary ml-1 hover:underline'
              onClick={handleLogOut}
            >
              cerrar sesión
            </button>
            ?
          </p>
        </div>
      )}
      <div className='flex items-end justify-end py-6 px-4 color-tertiary text-tertiary'>
        <SocialList isMobile={true} />
      </div>
    </div>
  );
};

export default DrawerMenu;
