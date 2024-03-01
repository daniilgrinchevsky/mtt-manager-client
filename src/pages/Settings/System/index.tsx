import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const System = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.SETTING_SYSTEM.title} parentTitle='Настройки' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default System;
