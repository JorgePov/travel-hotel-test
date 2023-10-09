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
                Lista de Hoteles
              </NavLink>
              <NavLink to={'/admin/reservations'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Lista de Reservas
              </NavLink>
            </>
            :
            <>
              <NavLink to={'/dashboard'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <BedIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Planear Viaje
              </NavLink>
              <NavLink to={'/dashboard/myreservations'}
                className={({ isActive }) => isActive ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                Mis Reservas
              </NavLink>
            </>
        }

      </li>
    </ul>
  )
}
