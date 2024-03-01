import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const ClientsTourists = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.TOURIST_CLIENTS.title} parentTitle='Туристы' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default ClientsTourists;
