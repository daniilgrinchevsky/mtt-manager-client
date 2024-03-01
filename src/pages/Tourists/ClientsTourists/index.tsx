import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const ClientsTourists = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Заказчики / Туристы' parentTitle='Туристы' crumbTitle='Заказчики / Туристы' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default ClientsTourists;
