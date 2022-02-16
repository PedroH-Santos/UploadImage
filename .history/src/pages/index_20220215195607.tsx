import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api'; 
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}


type ResponseDataApi = {
  data: Image[];
  after: string;
}


export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    (pageParam = null) : Promise<ResponseDataApi> => {
      const {data} = api.get('/api/images', {
        params: {
          after: pageParam
        }
      });
      console.log(response);
      return data;
    }
    // TODO AXIOS REQUEST WITH PARAM
    ,
    {
      getNextPageParam: (lastResponse) => {
        if (lastResponse?.after) {
          return lastResponse.after;
        } else {
          return null;
        }
      }
    }

    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if(data){
      return data.pages.map(page => {
         page.data();
      }).flat();
    }
    return [];


  }, [data]);
  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
