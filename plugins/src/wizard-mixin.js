var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {LitElement, html, state, query} from "../../_snowpack/pkg/lit-element.js";
import "../../openscd/src/wizard-dialog.js";
export class WizardMixin extends LitElement {
  constructor() {
    super(...arguments);
    this.workflow = [];
    this.onWizard = async (we) => {
      we.stopImmediatePropagation();
      we.stopPropagation();
      const wizard = we.detail.wizard;
      if (wizard === null) {
        this.workflow.shift();
      } else if (we.detail.subwizard) {
        this.workflow.unshift(wizard);
      } else {
        this.workflow.push(wizard);
      }
      this.requestUpdate("workflow");
      await this.updateComplete;
      await this.wizardUI?.updateComplete;
      await this.wizardUI.dialog?.updateComplete;
      this.wizardUI.dialog?.focus();
    };
    this.onEditorAction = () => {
      this.wizardUI?.requestUpdate();
    };
  }
  renderWizardDialog() {
    return html`
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("wizard", this.onWizard);
    this.addEventListener("editor-action", this.onEditorAction);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("wizard", this.onWizard);
    this.removeEventListener("editor-action", this.onEditorAction);
  }
}
__decorate([
  state()
], WizardMixin.prototype, "workflow", 2);
__decorate([
  query("wizard-dialog")
], WizardMixin.prototype, "wizardUI", 2);
