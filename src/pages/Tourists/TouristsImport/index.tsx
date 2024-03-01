import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const TouristsImport = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.TOURIST_IMPORT.title} parentTitle='Туристы' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default TouristsImport;
