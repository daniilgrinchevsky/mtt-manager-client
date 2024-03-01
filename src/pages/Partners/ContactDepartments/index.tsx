import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const ContactDepartments = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Отделы контактных лиц' parentTitle='Партнеры' crumbTitle='Отделы контактных лиц' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default ContactDepartments;
