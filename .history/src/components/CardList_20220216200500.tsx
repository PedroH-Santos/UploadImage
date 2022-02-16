import { Flex, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE



  function viewImage(url: string){

  }
  return (
    <>
      <SimpleGrid className="grid" column={3} spacing='40px'> 
          { /* TODO CARD GRID */
            cards && 
            cards.map(card => {
              return <Card viewImage={viewImage} data={card} />
            })
        
          }
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}