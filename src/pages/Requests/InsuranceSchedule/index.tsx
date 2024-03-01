import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const InsuranceSchedule = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.REQUEST_INSURANCE_SCHEDULE.title} parentTitle='Заявки' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default InsuranceSchedule;
