import { useGlobalStorage } from '../../store/global'
import { NavLink, useLocation } from 'react-router-dom'
import { BedIcon, FlyIcon } from './icons/CustomIcons'
import './Navlinks.css'
import { Text } from '@chakra-ui/react'

export const Navlinks = () => {
  const isadmin = useGlobalStorage(state => state.isAdmin)

  const location = useLocation();
  return (
    <ul style={{ listStyle: 'none', color: '#fff' }}>
      <li style={{ display: 'flex', textAlign: 'center', userSelect: 'none', gap: '15px' }}>
        {
          isadmin ?
            <>
              <NavLink to={'/admin'}
                className={() => location.pathname === '/admin' ? "active" : "link__container"}  >
                <BedIcon width={24} height={24} fill='#fff' />
                <Text marginInlineStart={'8px'} display={{ base: 'none', sm: 'block' }}>Lista de Hoteles</Text>

              </NavLink>
              <NavLink to={'/admin/reservations'}
                className={() => location.pathname === '/admin/reservations' ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' />
                <Text marginInlineStart={'8px'} display={{ base: 'none', sm: 'block' }}>Lista de Reservas</Text>
              </NavLink>
            </>
            :
            <>
              <NavLink to={'/dashboard'}
                className={() => location.pathname === '/dashboard' ? "active" : "link__container"}>
                <BedIcon width={24} height={24} fill='#fff' />
                <Text marginInlineStart={'8px'} display={{ base: 'none', sm: 'block' }}>Planear Viaje</Text>
              </NavLink>
              <NavLink to={'/dashboard/myreservations'}
                className={() => location.pathname === '/dashboard/myreservations' ? "active" : "link__container"}>
                <FlyIcon width={24} height={24} fill='#fff' />
                <Text marginInlineStart={'8px'} display={{ base: 'none', sm: 'block' }}>Mis Reservas</Text>
              </NavLink>
            </>
        }

      </li>
    </ul >
  )
}
