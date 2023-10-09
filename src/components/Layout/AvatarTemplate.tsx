import { IconButton, Menu, MenuButton, MenuItem, MenuList, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export const AvatarTemplate = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('globalData')
    navigate('/login')
  }

  return (
    <Menu >
      <MenuButton
        _hover={{ background: 'none' }}
        _active={{ background: 'none' }}
        border={'none'}
        className='menu__button'
        as={IconButton}
        aria-label='Options'
        icon={<Avatar size={'sm'} />}
        variant='outline'
        name='hola'
      />
      <MenuList>
        <MenuItem onClick={handleLogout}>
          Cerrar sesion
        </MenuItem>

      </MenuList>
    </Menu>
  )
}
