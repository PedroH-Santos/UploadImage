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
<Modal isOpen={isOpen} onClose={onClose} backGroundColor="transparent">
      <ModalOverlay />
      <ModalContent>
        <Image src={imgUrl} maxW="900px" maxH="600px" />

        <ModalFooter justifyContent="center">
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>


  )
}
