import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const Currencies = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.SETTING_CURRENCIES.title} parentTitle='Настройки' crumbTitle={PAGE.SETTING_CURRENCIES.title} />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Currencies;
