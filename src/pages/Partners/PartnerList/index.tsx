import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const PartnerList = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Список партнеров' parentTitle='Партнеры' crumbTitle='Список партнеров' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default PartnerList;
