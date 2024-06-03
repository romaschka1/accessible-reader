import { IBook } from '../../types/book';
import { Card, CardBody, Text, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
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

  return (
    <div className="content-wrapper">
      <Heading mb={5}>Accessible reader</Heading>

      <SimpleGrid columns={3} spacingX='30px' spacingY='30px'>
        <Card onClick={onOpen} variant='filled' className='book-card' custom-attribute="nav-entry nav-item" nav-component="true">
          <CardBody>
            <Plus/>
          </CardBody>
        </Card>
        {books.map((book, index) => {
          return (
            <Card
              onClick={() => openBook(book._id)}
              className='book-card' key={index}
              custom-attribute="nav-entry nav-item"
              nav-component="true"
            >
              <CardBody>
                <Heading size='md'>{ book.name }</Heading>
                <Text>{ book.description }</Text>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>

      <UploadModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Dashboard;
