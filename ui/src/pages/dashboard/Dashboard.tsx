import { Heading, SimpleGrid, useDisclosure, Button } from '@chakra-ui/react'
import './Dashboard.scss';
import { Plus } from 'react-feather';

import UploadModal from './UploadModal';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BooksContext } from '../../app';

function Dashboard() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books } = useContext(BooksContext);

  const openBook = (id: string) => {
    navigate('/book/' + id, { state: { id } });
  }

  return (<>
    <Heading mb={5}>My books</Heading>

    <SimpleGrid columns={3} spacingX='30px' spacingY='30px'>
      <Button
        onClick={onOpen}
        className='book-btn'
        height={'auto'}
        fontSize='xl'
        fontWeight='bold'
        rightIcon={<Plus />}
        variant='solid'
        custom-attribute="nav-entry nav-item"
        nav-component="true"
      >Add</Button>
      {books.map((book, index) => {
        return (
          <Button
            onClick={() => openBook(book._id)}
            key={index}
            className='book-btn'
            height={'auto'}
            fontSize='xl'
            fontWeight='bold'
            variant='solid'
            custom-attribute="nav-entry nav-item"
            nav-component="true"
          >{ book.name }</Button>
        );
      })}
    </SimpleGrid>

    <UploadModal isOpen={isOpen} onClose={onClose} />
  </>);
}

export default Dashboard;
