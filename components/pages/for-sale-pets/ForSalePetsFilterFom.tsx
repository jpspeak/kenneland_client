import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Select from "react-select";
import useDogBreeds from "../../../hooks/swr/use-dog-breeds";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import forSalePetsFilterAtom from "../../../state/atoms/for-sale-pets-filter.atom";
import { Radio, RadioGroup } from "@chakra-ui/radio";

const ForSalePetsFilterForm = ({ onDone }: { onDone?: () => void }) => {
  const router = useRouter();
  const [forSalePetsFilter, setForSalePetsFilter] = useRecoilState(forSalePetsFilterAtom);
  const { dogBreeds } = useDogBreeds();
  const [breedOptions, setBreedOptions] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    setBreedOptions(dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name })));
  }, [dogBreeds]);

  useEffect(() => {
    const breeds = typeof router.query.breed === "string" ? [router.query.breed] : router.query.breed || [];
    const location = typeof router.query.location === "string" ? router.query.location : "";
    const sex = typeof router.query.sex === "string" ? router.query.sex : "";
    const minPrice = typeof router.query.minPrice === "string" ? router.query.minPrice : "";
    const maxPrice = typeof router.query.maxPrice === "string" ? router.query.maxPrice : "";
    setForSalePetsFilter({
      breeds,
      location,
      sex,
      minPrice,
      maxPrice
    });
  }, [router, setForSalePetsFilter]);

  const filter = (values: typeof forSalePetsFilter) => {
    const query: { [key: string]: any } = {};

    if (values.breeds && values.breeds.length > 0) {
      query.breed = values.breeds;
    }
    if (values.location) {
      query.location = values.location;
    }
    if (values.sex) {
      query.sex = values.sex;
    }
    if (values.minPrice) {
      query.minPrice = values.minPrice;
    }
    if (values.maxPrice) {
      query.maxPrice = values.maxPrice;
    }
    router.push({
      pathname: router.pathname,
      query
    });
    onDone && onDone();
  };
  return (
    <>
      <Formik initialValues={forSalePetsFilter} onSubmit={filter} enableReinitialize>
        {({ dirty, values, setFieldValue }) => (
          <Form>
            <VStack spacing='4'>
              <Field name='breed'>
                {({ field }: FieldAttributes<any>) => (
                  <FormControl>
                    <FormLabel htmlFor='breed' fontSize='sm'>
                      Breed
                    </FormLabel>
                    <Select
                      isMulti
                      name={field.name}
                      onChange={data => setFieldValue("breeds", data.map(d => d.value) || [])}
                      value={breedOptions?.filter(b => values.breeds.includes(b.value))}
                      placeholder='Select breed'
                      options={dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name }))}
                      isClearable
                      styles={{
                        control: base => ({
                          ...base,
                          padding: "1px 5px",
                          borderColor: "#E2E8F0",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                          boxShadow: "none",
                          "&:hover": {
                            boxShadow: "none"
                          }
                        })
                      }}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name='location'>
                {({ field }: FieldAttributes<any>) => (
                  <FormControl>
                    <FormLabel htmlFor='location' fontSize='sm'>
                      Location
                    </FormLabel>
                    <Input {...field} id='location' placeholder='Enter any keyword' />
                  </FormControl>
                )}
              </Field>
              <Field name='sex'>
                {({ field }: FieldAttributes<any>) => (
                  <FormControl>
                    <FormLabel htmlFor='sex' fontSize='sm'>
                      Sex
                    </FormLabel>
                    {/* <Input {...field} id='sex' placeholder='Enter any keyword' /> */}
                    <RadioGroup {...field}>
                      <Stack direction='row'>
                        <Radio {...field} value=''>
                          All
                        </Radio>
                        <Radio {...field} value='Male'>
                          Male
                        </Radio>
                        <Radio {...field} value='Female'>
                          Female
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor='minPrice' fontSize='sm'>
                    Price
                  </FormLabel>
                  <HStack>
                    <Field name='minPrice'>{({ field }: FieldAttributes<any>) => <Input {...field} type='number' min='0' id='minPrice' placeholder='Min' />}</Field>
                    <Text color='blackAlpha.800'>to</Text>
                    <Field name='maxPrice'>{({ field }: FieldAttributes<any>) => <Input {...field} type='number' min='0' id='maxPrice' placeholder='Max' />}</Field>
                  </HStack>
                </FormControl>
              </HStack>

              <Button colorScheme='secondary' type='submit' width='full' disabled={!dirty}>
                Done
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForSalePetsFilterForm;
