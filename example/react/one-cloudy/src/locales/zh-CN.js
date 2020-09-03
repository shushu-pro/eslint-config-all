import exception from './zh-CN/exception';
import globalHeader from './zh-CN/globalHeader';
import login from './zh-CN/login';
import menu from './zh-CN/menu';
import result from './zh-CN/result';
import pwa from './zh-CN/pwa';

export default {
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...exception,
  ...globalHeader,
  ...login,
  ...menu,
  ...result,
  ...pwa,
};
