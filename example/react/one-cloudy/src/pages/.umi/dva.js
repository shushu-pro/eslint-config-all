import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'ACdepartment', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/AuthorityCenter/ACdepartment.js').default) });
app.model({ namespace: 'ACproject', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/AuthorityCenter/ACproject.js').default) });
app.model({ namespace: 'ACuser', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/AuthorityCenter/ACuser.js').default) });
app.model({ namespace: 'billCheck', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/billCheck.js').default) });
app.model({ namespace: 'billManage', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/billManage.js').default) });
app.model({ namespace: 'billSend', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/billSend.js').default) });
app.model({ namespace: 'billStatistics', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/billStatistics.js').default) });
app.model({ namespace: 'cloud-resource', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/cloud-resource.js').default) });
app.model({ namespace: 'newBillStatistics', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/newBillStatistics.js').default) });
app.model({ namespace: 'newDepartBill', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/newDepartBill.js').default) });
app.model({ namespace: 'setBillData', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/billCenter/setBillData.js').default) });
app.model({ namespace: 'global', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/menu.js').default) });
app.model({ namespace: 'messageCenter', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/messageCenter.js').default) });
app.model({ namespace: 'resourceInstance', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/myResource/resourceInstance.js').default) });
app.model({ namespace: 'feedback', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/operationCenter/feedback.js').default) });
app.model({ namespace: 'operationOrder', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/operationCenter/operationOrder.js').default) });
app.model({ namespace: 'projectManage', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/operationCenter/projectManage.js').default) });
app.model({ namespace: 'quotaManage', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/operationCenter/quotaManage.js').default) });
app.model({ namespace: 'resourceApply', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/operationCenter/resourceApply.js').default) });
app.model({ namespace: 'OperationRecord', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/OperationRecord/OperationRecord.js').default) });
app.model({ namespace: 'OperationRecordManage', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/OperationRecord/OperationRecordManage.js').default) });
app.model({ namespace: 'pageData', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/pageData/pageData.js').default) });
app.model({ namespace: 'setting', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/sschen86/work-git/onecloud-feat3/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
