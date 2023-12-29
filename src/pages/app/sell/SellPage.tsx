import React from 'react';
import { CreateContainer } from '../../../features/sell/create/CreateContainer';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { SellerSetup } from '../../../components/templates/SellerSetup';
import { User } from '../../../contexts/user.types';
import { Text } from '../../../components/ui/Text';
import { Helmet } from 'react-helmet-async';

export const SellPage = () => {
  const { isSeller } = useOutletContext() as User;
  const json = useLoaderData() as Record<string, any>;

  return (
    <>
      <Helmet>
        <title>Sell</title>
      </Helmet>

      <div className='flex flex-col gap-8 px-3 py-8 lg:gap-12 lg:w-4/5 lg:flex-row sm:px-8 lg:px-12'>
        <div className='space-y-2 basis-full lg:basis-4/6'>
          <Text
            as='h5'
            weight={500}
            size='2xl'
          >
            Upload new product
          </Text>
          <Text as='p'>
            Upload new product in a few easy steps, fill the form with your new
            product details and then click on the button to upload it.
          </Text>
        </div>
        <div className='basis-full'>
          {isSeller ? (
            <CreateContainer product={json ? json.data : null} />
          ) : (
            <SellerSetup />
          )}
        </div>
      </div>
    </>
  );
};

export const SellPageLoader = ({ params }: { params: any }) => {
  const helper = {
    getUserToken: () => {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user.token.id;
    },

    fetchProduct: async (token: string) => {
      return await fetch(
        `http://localhost:5000/api/v1/product/fetch/${params.id}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
    },
  };

  return helper.fetchProduct(helper.getUserToken());
};
