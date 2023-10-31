import { Button, Checkbox, FormControl, FormLabel, Input, Select, Text, Center, Card, Divider, VStack, HStack, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Country, IState, State } from 'country-state-city';
import Link from 'next/link';
import { IFormInput } from 'models/IFormInput';

export const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const countryList = Country.getAllCountries();
  const { register, handleSubmit, watch, unregister } = useForm<IFormInput>({
    defaultValues: { country: "United States", }
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

  const onSubmit = async () => {
    try {

      setLoading(true);
      const formElement = document.querySelector('form') as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.append('url', 'www.migration.sitecore.com');

      const response = await fetch(process.env.NEXT_PUBLIC_EMAIL_FORM_ENDPOINT as string,
        {
          body: formData,
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
      if (response.status == 200) {
        setSubmitted(true);
        console.log('Form submitted successfully');
      }

    } catch (error) {
      console.error('Error in form submission');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card p={2} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Center>
        <VStack>
          <Text fontSize='4xl'>Sign up for future content!</Text>
          <Text fontSize='2xl'>Be notified of future migration related videos, tutorials, articles, and more</Text>
        </VStack>
      </Center>
      {submitted == false ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired pt={4}>
            <FormLabel >First Name</FormLabel>
            <Input {...register("first_name", { required: true })} />
            <FormLabel pt={4}>Last Name</FormLabel>
            <Input {...register("last_name", { required: true })} />
            <FormLabel pt={4}>Email</FormLabel>
            <Input{...register("email", { required: true })} />
            <FormLabel pt={4}>Country Selection</FormLabel>
            <Select id="country" placeholder='Select Country' {...register("country", { required: true })}>
              {countryList.map((country) => (
                <option style={{ color: 'black' }} value={country.name}>{country.name}</option>
              ))}
            </Select>
            {watchCountry == "United States" || watchCountry == "Canada" || watchCountry == "Australia" ? (
              <Select id="state" pt={2} placeholder='Select State' {...register("state", { required: true })}>
                {stateList.map((state) => (
                  <option style={{ color: 'black' }} value={state.name}>{state.name}</option>
                ))}
              </Select>
            ) : null}
            <Text p={4}>By submitting my contact information, I confirm that I have read and agree to the <Link style={{ color: "blue", textDecoration: "underline" }} passHref href="https://www.sitecore.com/trust/privacy-policy" target="_blank">Sitecore Privacy Policy</Link>, which explains how Sitecore collects, processes and shares my personal data. I consent to my data being processed in accordance with Sitecore’s Privacy Policy so that Sitecore can optimize my experience with the Sitecore brand.</Text>
            <Checkbox id="gdpr" p={4} {...register("gdpr_optin", { required: true })}>I consent to receive communications about Sitecore’s business in accordance with Sitecore’s Privacy Policy. I understand that I can opt-out at any time.</Checkbox>
            <Divider />
            <HStack px={4}>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                disabled={loading}
              >
                Submit
              </Button>
              {loading && <Spinner />}
            </HStack>
          </FormControl >
        </form>
        :
        <Center>
          <Text id="success-message" pt={8} fontSize='4xl'>Thank you for your signing up</Text>
        </Center>
      }
    </Card>
  )
};
