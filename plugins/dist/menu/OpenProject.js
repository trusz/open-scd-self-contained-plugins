import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, query } from '../../../_snowpack/pkg/lit-element.js';
import { newOpenDocEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/open-event.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
import { WizardMixin } from '../wizard-mixin.js';
class OpenProjectPlugin extends WizardMixin {
    async openDoc(event) {
        const file = event.target?.files?.item(0) ?? false;
        if (!file)
            return;
        const text = await file.text();
        const docName = file.name;
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        this.dispatchEvent(newLogEvent({ kind: 'reset' }));
        this.dispatchEvent(newOpenDocEvent(doc, docName));
        this.pluginFileUI.onchange = null;
        this.closeMenu();
    }
    async closeMenu() {
        this.dispatchEvent(new CustomEvent('close-drawer', {
            bubbles: true,
            composed: true, // to traverse shadow DOM boundaries src: https://pm.dartus.fr/blog/a-complete-guide-on-shadow-dom-and-event-propagation/
        }));
    }
    async run() {
        this.pluginFileUI.click();
    }
    render() {
        return html `<input @click=${(event) => (event.target.value = '')} @change=${this.openDoc} id="open-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>
    ${this.renderWizardDialog()}`;
    }
}
OpenProjectPlugin.styles = css `
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
export default OpenProjectPlugin;
__decorate([
    query('#open-plugin-input')
], OpenProjectPlugin.prototype, "pluginFileUI", void 0);
//# sourceMappingURL=OpenProject.js.map