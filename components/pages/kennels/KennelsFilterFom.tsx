import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Select from "react-select";
import useDogBreeds from "../../../hooks/swr/use-dog-breeds";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import kennelFilterAtom from "../../../state/atoms/kennel-filter.atom";

const KennelFilterForm = ({ onDone }: { onDone?: () => void }) => {
  const router = useRouter();
  const [kennelFilter, setKennelFilter] = useRecoilState(kennelFilterAtom);
  const { dogBreeds } = useDogBreeds();
  const [breedOptions, setBreedOptions] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    setBreedOptions(dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name })));
  }, [dogBreeds]);

  useEffect(() => {
    const kennelName = typeof router.query.kennelName === "string" ? router.query.kennelName : "";
    const breeds = typeof router.query.breed === "string" ? [router.query.breed] : router.query.breed || [];
    const location = typeof router.query.location === "string" ? router.query.location : "";
    setKennelFilter({
      kennelName,
      breeds,
      location
    });
  }, [router, setKennelFilter]);

  const filter = (values: typeof kennelFilter) => {
    const query: { [key: string]: any } = {};
    if (values.kennelName) {
      query.kennelName = values.kennelName;
    }
    if (values.breeds && values.breeds.length > 0) {
      query.breed = values.breeds;
    }
    if (values.location) {
      query.location = values.location;
    }
    router.push({
      pathname: router.pathname,
      query
    });
    onDone && onDone();
  };
  return (
    <>
      <Formik initialValues={kennelFilter} onSubmit={filter} enableReinitialize>
        {({ dirty, values, setFieldValue }) => (
          <Form>
            <VStack spacing='4'>
              <Field name='kennelName'>
                {({ field }: FieldAttributes<any>) => (
                  <FormControl>
                    <FormLabel htmlFor='kennelName' fontSize='sm'>
                      Kennel name
                    </FormLabel>
                    <Input {...field} id='kennelName' placeholder='Enter any keyword' />
                  </FormControl>
                )}
              </Field>
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

export default KennelFilterForm;
