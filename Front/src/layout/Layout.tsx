
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function AppLayout() {

  const [down, isDown] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      isDown(window.scrollY > 0)
    })
  })


  console.log(down)



  return (
    <>
      <header className={`
        fixed z-10 transition duration-1000
        w-11/12 
        flex justify-between  
        ${down ? 'abajo' : ''}`} >

        <div className="py-4 w-36 h-36">
          <img src="/Logo.png"></img>
        </div>

        <nav className="flex gap-2">
          <NavLink to="" className="">Inicio</NavLink>
          <NavLink to="" className="">Nosotros</NavLink>
          <NavLink to="" className="">Mascotas</NavLink>
          <NavLink to="" className="">Agendar Cita</NavLink>
          <NavLink to="" className="">Iniciar sesion</NavLink>
        </nav>

      </header>

      <section className="zona">
      </section>

      <main className="">
        <Outlet />
      </main>

      <footer>

      </footer>

      <ToastContainer
        className="custom-toast-container"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeButton
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  )
}
