import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const IpTelephony = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.INTEGRATION_IP_TELEPHONY.title} parentTitle='Интеграции' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default IpTelephony;
