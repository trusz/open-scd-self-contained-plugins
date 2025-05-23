import { get } from '../../../translation.js';

export function getSignalName(tiNumber: string): string {
  switch (tiNumber) {
    case '1':
      return get('protocol104.values.signalNames.tiNumber1');
    case '3':
      return get('protocol104.values.signalNames.tiNumber3');
    case '5':
      return get('protocol104.values.signalNames.tiNumber5');
    case '7':
      return get('protocol104.values.signalNames.tiNumber7');
    case '9':
      return get('protocol104.values.signalNames.tiNumber9');
    case '11':
      return get('protocol104.values.signalNames.tiNumber11');
    case '13':
      return get('protocol104.values.signalNames.tiNumber13');
    case '15':
      return get('protocol104.values.signalNames.tiNumber15');
    case '20':
      return get('protocol104.values.signalNames.tiNumber20');
    case '21':
      return get('protocol104.values.signalNames.tiNumber21');
    case '30':
      return get('protocol104.values.signalNames.tiNumber30');
    case '31':
      return get('protocol104.values.signalNames.tiNumber31');
    case '32':
      return get('protocol104.values.signalNames.tiNumber32');
    case '33':
      return get('protocol104.values.signalNames.tiNumber33');
    case '34':
      return get('protocol104.values.signalNames.tiNumber34');
    case '35':
      return get('protocol104.values.signalNames.tiNumber35');
    case '36':
      return get('protocol104.values.signalNames.tiNumber36');
    case '37':
      return get('protocol104.values.signalNames.tiNumber37');
    case '38':
      return get('protocol104.values.signalNames.tiNumber38');
    case '39':
      return get('protocol104.values.signalNames.tiNumber39');
    case '40':
      return get('protocol104.values.signalNames.tiNumber40');
    case '45':
      return get('protocol104.values.signalNames.tiNumber45');
    case '46':
      return get('protocol104.values.signalNames.tiNumber46');
    case '47':
      return get('protocol104.values.signalNames.tiNumber47');
    case '48':
      return get('protocol104.values.signalNames.tiNumber48');
    case '49':
      return get('protocol104.values.signalNames.tiNumber49');
    case '50':
      return get('protocol104.values.signalNames.tiNumber50');
    case '51':
      return get('protocol104.values.signalNames.tiNumber51');
    case '58':
      return get('protocol104.values.signalNames.tiNumber58');
    case '59':
      return get('protocol104.values.signalNames.tiNumber59');
    case '60':
      return get('protocol104.values.signalNames.tiNumber60');
    case '61':
      return get('protocol104.values.signalNames.tiNumber61');
    case '62':
      return get('protocol104.values.signalNames.tiNumber62');
    case '63':
      return get('protocol104.values.signalNames.tiNumber63');
    case '64':
      return get('protocol104.values.signalNames.tiNumber64');
    default:
      return get('protocol104.values.signalNames.default');
  }
}
