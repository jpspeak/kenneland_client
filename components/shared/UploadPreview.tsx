import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChangeEventHandler } from "react-transition-group/node_modules/@types/react";
import { useToast } from "@chakra-ui/react";

const UploadPreview = ({
  max,
  onChange,
  uploadedImagesUrl = [],
  onDeleteUploaded
}: {
  max: number;
  onChange: (images: File[]) => void;
  uploadedImagesUrl?: string[];
  onDeleteUploaded?: (deleteUploadedImages: string[]) => void;
}) => {
  const imageInputEl = useRef(null);
  const [uploadedImagesUrlState, setUploadedImagesUrlState] = useState(uploadedImagesUrl);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [deleteUploadedImages, setDeleteUploadedImages] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    const imageUrls = images.map(image => URL.createObjectURL(image));
    setImagesUrl(imageUrls);
  }, [images]);

  useEffect(() => {
    onChange(images);
  }, [images, onChange]);

  useEffect(() => {
    if (onDeleteUploaded) onDeleteUploaded(deleteUploadedImages);
  }, [onDeleteUploaded, deleteUploadedImages]);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files;
    const imagesCount = images?.length || 0;
    const uploadImagesCount = uploadedImagesUrlState.length;

    if (files) {
      if (files?.length + imagesCount + uploadImagesCount <= max) {
        for (let i = 0; i < files.length; i++) {
          setImages(prevState => [...prevState, files[i]]);
        }
      } else {
        toast({
          description: `Up to ${max} image${max > 1 ? "s" : ""} only.`,
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    }
  };

  const deleteImage = (index: number) => {
    setImages(prevState => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const deleteUploadedImage = (imageUrl: string) => {
    setUploadedImagesUrlState(prevState => {
      return prevState.filter(url => url !== imageUrl);
    });
    setDeleteUploadedImages(prevState => [...prevState, imageUrl]);
  };

  return (
    <Box w='100%'>
      <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(6,1fr)" }} gap='1' maxWidth='500px' justifyContent='center' alignItems='baseline'>
        {uploadedImagesUrlState.map((imageUrl, index) => (
          <Box key={index} width='100%' pb='100%' position='relative'>
            <IconButton onClick={() => deleteUploadedImage(imageUrl)} type='button' aria-label='Delete' size='xs' rounded='full' position='absolute' top='1' right='1' bg='rgba(0,0,0,0.3)' zIndex={1}>
              <Icon as={HiOutlineX} color='white' />
            </IconButton>
            <Flex position='absolute' border='1px' borderColor='gray.200' rounded='xl' overflow='hidden'>
              <Image key={index} objectFit='cover' src={imageUrl} alt='Kennel logo' height={400} width={400} className='bg-gray-200' />
            </Flex>
          </Box>
        ))}
        {imagesUrl.map((image, index) => (
          <Box key={index} width='100%' pb='100%' position='relative'>
            <IconButton onClick={() => deleteImage(index)} type='button' aria-label='Delete' size='xs' rounded='full' position='absolute' top='1' right='1' bg='rgba(0,0,0,0.3)' zIndex={1}>
              <Icon as={HiOutlineX} color='white' />
            </IconButton>
            <Flex position='absolute' borderColor='gray.200' rounded='xl' overflow='hidden'>
              <Image key={index} objectFit='cover' src={image} alt='Kennel logo' height={400} width={400} className='bg-gray-200' />
            </Flex>
          </Box>
        ))}
        {images.length + uploadedImagesUrlState.length < max && (
          <Box
            data-testId='addBtn'
            as='button'
            type='button'
            onClick={() => {
              (imageInputEl.current as any).click();
            }}
            position='relative'
            w='100%'
            pb='100%'
            rounded='xl'
            border='1px'
            borderColor='gray.200'
          >
            <Icon as={HiOutlinePlusSm} h={10} w={10} color='gray.300' position='absolute' top='50%' left='50%' transform='auto' translateY='-50%' translateX='-50%' />
          </Box>
        )}
        <input
          data-testId='imageInputEl'
          ref={imageInputEl}
          hidden
          type='file'
          multiple
          accept='image/png, image/jpeg'
          onChange={onChangeInput}
          onClick={e => {
            (e.target as HTMLInputElement).value = "";
          }}
        />
      </Grid>
    </Box>
  );
};

export default UploadPreview;
