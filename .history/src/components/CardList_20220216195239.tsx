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
      <Flex> 
          {/* TODO CARD GRID */
            cards.map(card => {
              <Card viewImage={viewImage} data={card} />
            })
          }
      </Flex>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
