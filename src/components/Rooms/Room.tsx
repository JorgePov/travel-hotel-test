import { Button, Flex } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons'
import { CardComponent } from '../shared/CardComponent'

export default function Room() {
    return (
        <section style={{ paddingTop: '48px' }}>
            {/* crear room */}
            <Flex justifyContent={'center'} alignItems={'center'} paddingBottom={'30px'}>
                <Button colorScheme='teal' variant='outline' maxWidth={'350px'} width={'100%'}>
                    <IconPlus width={20} height={20} fill='#2C7A7B' />
                    Agregar Habitacion
                </Button>
            </Flex>
            {/* Hoteles creados */}
            <CardComponent />
        </section>
    )
}
