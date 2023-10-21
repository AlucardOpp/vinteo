import {Modals} from './modals';

let modals;

// Здесь реализован пример открытия модалки через колбэк закрытия
// const openModalInCloseCallback = (name, context = this) => {
//   context._enableScrolling = false;
//   context._setSettings('default');
//   modals.open(name);
// };

// closeCallback() {
//   openModalInCloseCallback('modal-5');
// },

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    eventTimeout: 400,
    openCallback: false,
    closeCallback: false,
  },
};

const openTrialModal = () => {
  if (window.location.search.indexOf('?trial') !== -1) {
    modals.open('trial');
  }
};

const personalDataClose = () => {
  document.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-close-callback]');

    if (btn) {
      setTimeout(() => {
        modals._closeCallback = () => {
          modals.open(btn.dataset.closeCallback);
          modals._enableScrolling = false;
        };
      }, 20);
    }
  });
};

const initModals = () => {
  personalDataClose();

  const modalElements = document.querySelectorAll('.modal');
  if (modalElements.length) {
    modalElements.forEach((el) => {
      setTimeout(() => {
        el.classList.remove('modal--preload');
      }, 100);
    });
  }

  modals = new Modals(settings);
  openTrialModal();
  // Используйте в разработке экспортируемую переменную modals, window сделан для бэкэнда
  window.modals = modals;
};

export {modals, initModals};
