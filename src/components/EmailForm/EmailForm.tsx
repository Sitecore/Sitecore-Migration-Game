import { Button, Box, Checkbox, FormControl, FormLabel, Input, Select, Text, useColorMode, useColorModeValue, Center, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Country, IState, State } from 'country-state-city';
import Link from 'next/link';

interface IFormInput {
  firstName: string
  lastName: string
  email: string
  country: string
  state: string
  gdprOptIn: boolean
}

export const EmailForm = () => {
  const onSubmit = (data: IFormInput) => console.log(data);
  const countryList = Country.getAllCountries();
  console.log(countryList);
  const { colorMode, toggleColorMode } = useColorMode()
  const { register, handleSubmit, watch, unregister, reset } = useForm<IFormInput>({
    defaultValues:
    {
      country: "United States",
    }
  });
  const [stateList, setStateList] = useState<IState[]>(State.getStatesOfCountry("US"));
  const watchCountry = watch("country");

  useEffect(() => {
    if ((watchCountry == "United States")) {
      register("state");
      setStateList(State.getStatesOfCountry("US"));
    } else if (watchCountry == "Canada") {
      register("state");
      setStateList(State.getStatesOfCountry("CA"));
    } else if (watchCountry == "Australia") {
      register("state");
      setStateList(State.getStatesOfCountry("AU"));
    } else {
      unregister("country");
    }
  }, [register, unregister, watchCountry]);


  return (
    <Box p={2} maxWidth="800px" borderWidth={1} borderRadius={8} boxShadow="lg" bgColor={useColorModeValue('white', 'gray.800')}>
      <Center>
        <Text fontSize='4xl'>Sign up for future content!</Text>
      </Center>
      <Text fontSize='xl'>Get this page's details emailed to you and be notified of future migration content.</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired pt={4}>
          <FormLabel >First Name</FormLabel>
          <Input {...register("firstName", { required: true })} />
          <FormLabel pt={4}>Last Name</FormLabel>
          <Input {...register("lastName", { required: true })} />
          <FormLabel pt={4}>Email</FormLabel>
          <Input{...register("email", { required: true })} />
          <FormLabel pt={4}>Country Selection</FormLabel>
          <Select placeholder='Select Country' {...register("country", { required: true })}>
            {countryList.map((country) => (
              <option value={country.name}>{country.name}</option>
            ))}
          </Select>
          {watchCountry == "United States" || watchCountry == "Canada" ? (
            <Select pt={2} placeholder='Select State' {...register("state", { required: true })}>
              {stateList.map((state) => (
                <option value={state.name}>{state.name}</option>
              ))}
            </Select>
          ) : null}
          <Text p={4}>By submitting my contact information, I confirm that I have read and agree to the <Link style={{color: "blue", textDecoration: "underline"}} href="https://www.sitecore.com/trust/privacy-policy" passHref>Sitecore Privacy Policy</Link>, which explains how Sitecore collects, processes and shares my personal data. I consent to my data being processed in accordance with Sitecore’s Privacy Policy so that Sitecore can optimize my experience with the Sitecore brand.</Text>
          <Checkbox p={4} {...register("gdprOptIn", { required: true })}>I consent to receive communications about Sitecore’s business in accordance with Sitecore’s Privacy Policy. I understand that I can opt-out at any time.</Checkbox>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </FormControl >
      </form>
    </Box>
  )
};
