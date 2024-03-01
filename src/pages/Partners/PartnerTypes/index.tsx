import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const PartnerTypes = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.PARTNER_TYPES.title} parentTitle='Партнеры' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default PartnerTypes;
