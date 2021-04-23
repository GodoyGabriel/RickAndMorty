import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

export default function GraphHome() {
  const query = gql`
    {
      characters{
        results{
          name,
          image
        }
      }
    }
  `
  const res = useQuery(query);
  console.log(res);

  return (
    <Card 
  //leftClick={nextCharacter} 
  //rightClick={addFav} 
  //{...character} 
  />);
}