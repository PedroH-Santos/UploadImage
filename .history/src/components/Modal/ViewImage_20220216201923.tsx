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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ver imagem </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex textAlign="center" justifyContent="center">
            <Box>
              <Image src={imgUrl} />
            </Box>
            <Box >
              <Button as="a" href={imgUrl} target="_blank">  Abrir original  </Button>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>


  )
}
