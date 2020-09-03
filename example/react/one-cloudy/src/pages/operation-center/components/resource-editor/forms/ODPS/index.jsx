import React from 'react';
import FormComment from '@/components/OperationCenter/Product/Form/base/FormComment';
import {
  BaseInfo,
} from '@/components/OperationCenter/Product/base';
// import Region from '../components/blocks/Region';
// import BaseInfo from '../components/blocks/BaseInfo';
import Config from './Config';

function ODPSForm({ formProps, batch = false }) {
  return (
    <>
      <BaseInfo {...formProps} render={!batch} />
      <Config {...formProps} />
      <FormComment {...formProps} />
    </>
  );
}


export default ODPSForm;