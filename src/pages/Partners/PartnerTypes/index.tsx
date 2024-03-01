import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const PartnerTypes = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Типы партнеров' parentTitle='Партнеры' crumbTitle='Типы партнеров' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default PartnerTypes;
