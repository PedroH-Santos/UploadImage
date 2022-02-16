import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}
type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formattsOfTheImage = /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png|jpg))(?:\?([^#]*))?(?:#(.*))?/g;

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo obrigatório',
      validate:{
        lessThan10MB: file => file[0].size >= 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: file => formattsOfTheImage.test(file[0].type) || 'Somente são aceitos arquivos PNG, JPEG e GIF'
      } 
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Título obrigatório',
      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLength: { value:20 , message: 'Máximo de 20 caracteres'}
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição obrigatória',
      maxLength: { value:65 , message: 'Máximo de 65 caracteres'}

    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (values : Image) => {
      const response = await api.post<Image>('/api/images',{
        ...values,
        url: imageUrl,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      }
      // TODO ONSUCCESS MUTATION
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Image): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
      console.log(imageUrl);

      if(imageUrl !== undefined){
        toast({
          title: 'Imagem não adicionada.',
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return;
      }
      await mutation.mutateAsync(data);
      toast({
        title: 'Imagem cadastrada',
        description: "Sua imagem foi cadastrada com sucesso",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })


    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      setImageUrl('');
      setLocalImageUrl('');
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image',formValidations.image)}
          error={errors.image}
          // TODO SEND IMAGE ERRORS
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('titulo',formValidations.title)}
          error={errors.titulo}


        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('descricao',formValidations.description)}
          error={errors.descricao}


        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
