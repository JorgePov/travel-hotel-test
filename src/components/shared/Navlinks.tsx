import React from 'react'
import { useGlobalStorage } from '../../store/global'
import { NavLink } from 'react-router-dom'
import { BedIcon, FlyIcon } from './icons/CustomIcons'
import './Navlinks.css'

export const Navlinks = () => {
  const isadmin = useGlobalStorage(state => state.isAdmin)
  return (
    <ul style={{ listStyle: 'none', color: '#fff' }}>
      <li style={{ display: 'flex', textAlign: 'center', userSelect: 'none', gap: '15px' }}>
        {
          isadmin ?
            <>
              <NavLink to={'/admin'}
                className={({ isActive }) => isActive ? "active" : "link__container"}  >
                <BedIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Mis Hoteles
              </NavLink>
              <NavLink to={'/dashboard'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Mis reservas
              </NavLink>
            </>
            :
            <>
              <NavLink to={'/dashboard'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <BedIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Mis resrervas
              </NavLink>
              <NavLink to={'/dashboard'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Reservar
              </NavLink>
            </>
        }

      </li>
    </ul>
  )
}
