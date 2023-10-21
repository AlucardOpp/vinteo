import {Accordions} from '../utils/accordions';

let accordions;

const initAccordions = () => {
  accordions = new Accordions();
  window.accordions = accordions;
};

export {initAccordions, accordions};
