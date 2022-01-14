import { Textarea, TextareaProps } from "@chakra-ui/textarea";
import ResizeTextarea from "react-textarea-autosize";
import { forwardRef } from "react";

const TextareaAutoResize = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <>
      <Textarea minH='unset' overflow='hidden' w='100%' resize='none' ref={ref} maxRows={3} minRows={1} as={ResizeTextarea} {...props} />
    </>
  );
});

TextareaAutoResize.displayName = "TextareaAutoResize";
export default TextareaAutoResize;
