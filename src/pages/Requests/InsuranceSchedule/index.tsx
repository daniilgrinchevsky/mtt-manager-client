import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const InsuranceSchedule = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='График страховок' parentTitle='Заявки' crumbTitle='График страховок' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default InsuranceSchedule;
