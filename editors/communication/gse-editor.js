import { __decorate } from "tslib";
import { LitElement, html, customElement, property, state, } from 'lit-element';
import '@material/mwc-icon';
import '@openscd/open-scd/src/action-icon.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { sizableGooseIcon } from '@openscd/open-scd/src/icons/icons.js';
import { editGseWizard } from '../../wizards/gse.js';
let GseEditor = class GseEditor extends LitElement {
    get label() {
        return (this.element.getAttribute('ldInst') +
            '/' +
            this.element.getAttribute('cbName'));
    }
    openEditWizard() {
        this.dispatchEvent(newWizardEvent(editGseWizard(this.element)));
    }
    remove() {
        if (this.element)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                    reference: this.element.nextSibling,
                },
            }));
    }
    render() {
        return html `<action-icon label="${this.label}" .icon="${sizableGooseIcon}"
      ><mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab
    ></action-icon>`;
    }
};
__decorate([
    property({ attribute: false })
], GseEditor.prototype, "doc", void 0);
__decorate([
    property({ attribute: false })
], GseEditor.prototype, "element", void 0);
__decorate([
    state()
], GseEditor.prototype, "label", null);
GseEditor = __decorate([
    customElement('gse-editor')
], GseEditor);
export { GseEditor };
//# sourceMappingURL=gse-editor.js.map