import detector from 'detector';
import updateBrowser from '@/pages/updateBrowser';

export const dva = {
  config: {
    onError(err) {
      console.log(err);
    },
  },
};

export function render(oldRender) {
  if (detector.browser.ie && (detector.browser.version <= 10 || detector.browser.mode <= 10)) {
    updateBrowser.init();
    return false;
  }
  oldRender();
}
