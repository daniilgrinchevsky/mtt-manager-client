import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const OnlineChat = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.INTEGRATION_ONLINE_CHAT.title} parentTitle='Интеграции' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default OnlineChat;
