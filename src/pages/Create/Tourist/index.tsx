import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const Request = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Создание туриста' parentTitle='Создать' crumbTitle='Туриста' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Request;
