import img from '@/assets/bow.svg';

const updateBrowser = {
  html: `<img id="img" src=${img} width="50%" />`,
  init() {
    const root = document.getElementById('root');
    const div = document.createElement('div');
    div.innerHTML = this.html;
    root.appendChild(div);
    const height = document.body.scrollHeight;
    if (height > 643) {
      div.style.height = document.body.scrollHeight + 'px';
    } else {
      div.style.height = '643px';

    }
    div.style.background = '#f0f2f5';
    div.style.textAlign = 'center';
    if (window.addEventListener) {
      window.addEventListener('resize', () => {
        div.style.height = document.body.scrollHeight + 'px';
      })
    }
    if (window.attachEvent) {
      window.attachEvent('resize', () => {
        div.style.height = document.body.scrollHeight + 'px';
      })
    }
    
  },
};

// ie10及以下版本，提示升级
export default updateBrowser;
