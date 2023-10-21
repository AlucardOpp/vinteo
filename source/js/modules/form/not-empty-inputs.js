const initNotEmptyInputs = () => {
  const forms = document.querySelectorAll('form');

  if (!forms.length) {
    return;
  }

  forms.forEach((it) => {
    it.addEventListener('change', (evt) => {
      const inputWrap = evt.target.closest('.custom-input') || false;
      const textareaWrap = evt.target.closest('.custom-textarea') || false;

      if (inputWrap) {
        const input = inputWrap.querySelector('input');

        if (input.value.length > 0) {
          inputWrap.classList.add('not-empty');
        } else {
          inputWrap.classList.remove('not-empty');
        }
      }

      if (textareaWrap) {
        const textarea = textareaWrap.querySelector('textarea');

        if (textarea.value.length > 0) {
          textareaWrap.classList.add('not-empty');
        } else {
          textareaWrap.classList.remove('not-empty');
        }
      }
    });
  });
};

export {initNotEmptyInputs};
