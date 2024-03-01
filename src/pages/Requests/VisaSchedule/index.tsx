import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const VisaSchedule = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='График виз' parentTitle='Заявки' crumbTitle='График виз' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default VisaSchedule;
