import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
  Button,
  Box,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ver imagem </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex textAlign="center" justifyContent="center">
            <Box maxWidth="900px" maxHeight="600px">
              <Image src={imgUrl} maxWidth="900px" maxHeight="600px"/>
            </Box>
            <Box >
              <Button as="a" href={imgUrl} target="_blank">  Abrir original  </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>


  )
}
