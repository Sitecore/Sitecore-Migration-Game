import React from 'react'
import {
  Card,
  CardBody,
  Heading,
  Text,
} from '@chakra-ui/react';

export interface FeatureCardProps {
  heading: string;
  text: string;
}

export default function FeatureCard(props: FeatureCardProps) {
  return (
    <Card layerStyle="interactive.fill" variant="outlineRaised" cursor="pointer">
      <CardBody>
        <Heading size={'md'}>{props.heading}</Heading>
        <Text my={4}>
          {props.text}
        </Text>
      </CardBody>
    </Card>)
} 
