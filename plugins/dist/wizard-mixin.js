import { __decorate } from "../../_snowpack/pkg/tslib.js";
import { LitElement, html, state, query } from '../../_snowpack/pkg/lit-element.js';
import '../../openscd/src/wizard-dialog.js';
/**
 * Base class for plugins that manage their own wizards
 * without depending on oscd-wizard
 */
export class WizardMixin extends LitElement {
    constructor() {
        super(...arguments);
        /** FIFO queue of [[`Wizard`]]s to display. */
        this.workflow = [];
        this.onWizard = async (we) => {
            we.stopImmediatePropagation();
            we.stopPropagation();
            const wizard = we.detail.wizard;
            if (wizard === null) {
                this.workflow.shift();
            }
            else if (we.detail.subwizard) {
                this.workflow.unshift(wizard);
            }
            else {
                this.workflow.push(wizard);
            }
            this.requestUpdate('workflow');
            await this.updateComplete;
            await this.wizardUI?.updateComplete;
            await this.wizardUI.dialog?.updateComplete;
            this.wizardUI.dialog?.focus();
            // this.updateComplete.then(() =>
            //   this.wizardUI?.updateComplete.then(() =>
            //     this.wizardUI?.dialog?.updateComplete.then(() =>
            //       this.wizardUI?.dialog?.focus()
            //     )
            //   )
            // );
        };
        this.onEditorAction = () => {
            this.wizardUI?.requestUpdate();
        };
    }
    renderWizardDialog() {
        return html `
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('wizard', this.onWizard);
        this.addEventListener('editor-action', this.onEditorAction);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('wizard', this.onWizard);
        this.removeEventListener('editor-action', this.onEditorAction);
    }
}
__decorate([
    state()
], WizardMixin.prototype, "workflow", void 0);
__decorate([
    query('wizard-dialog')
], WizardMixin.prototype, "wizardUI", void 0);
//# sourceMappingURL=wizard-mixin.js.map