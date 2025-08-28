import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, query } from '../../../_snowpack/pkg/lit-element.js';
import { newWizardEvent } from '../../../openscd/src/foundation.js';
import { mergeWizard } from '../../../openscd/src/wizards.js';
import { WizardMixin } from '../wizard-mixin.js';
class MergePlugin extends WizardMixin {
    mergeDoc(event) {
        const file = event.target?.files?.item(0) ?? false;
        if (file)
            file.text().then(text => {
                const doc = new DOMParser().parseFromString(text, 'application/xml');
                this.dispatchEvent(newWizardEvent(mergeWizard(this.doc.documentElement, doc.documentElement)));
            });
        this.pluginFileUI.onchange = null;
    }
    async run() {
        this.pluginFileUI.click();
    }
    render() {
        return html `<input @click=${(event) => (event.target.value = '')} @change=${this.mergeDoc} id="merge-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>
    ${this.renderWizardDialog()}`;
    }
}
MergePlugin.styles = css `
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
export default MergePlugin;
__decorate([
    query('#merge-plugin-input')
], MergePlugin.prototype, "pluginFileUI", void 0);
//# sourceMappingURL=Merge.js.map