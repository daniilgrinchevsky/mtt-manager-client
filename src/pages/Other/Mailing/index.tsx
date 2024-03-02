import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const Mailing = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.OTHER_MAILING.title} parentTitle={PAGE.OTHER.title} />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Mailing;
