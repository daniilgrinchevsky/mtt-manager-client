import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const PartnerList = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.PARTNER_LIST.title} parentTitle='Партнеры' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default PartnerList;
