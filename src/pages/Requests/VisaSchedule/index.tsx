import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const VisaSchedule = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.REQUEST_VISA_SCHEDULE.title} parentTitle='Заявки' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default VisaSchedule;
