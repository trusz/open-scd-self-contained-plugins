import { LitElement, TemplateResult, html, state, query } from 'lit-element';
import {
  WizardEvent,
  WizardFactory,
} from '@openscd/open-scd/src/foundation.js';
import { WizardDialog } from '@openscd/open-scd/src/wizard-dialog.js';
import '@openscd/open-scd/src/wizard-dialog.js';

/**
 * Base class for plugins that manage their own wizards
 * without depending on oscd-wizard
 */
export class WizardMixin extends LitElement {
  /** FIFO queue of [[`Wizard`]]s to display. */
  @state()
  workflow: WizardFactory[] = [];

  @query('wizard-dialog') wizardUI!: WizardDialog;

  protected renderWizardDialog(): TemplateResult {
    return html`
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('wizard', this.onWizard);
    this.addEventListener('editor-action', this.onEditorAction);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('wizard', this.onWizard);
    this.removeEventListener('editor-action', this.onEditorAction);
  }

  private onWizard = async (we: WizardEvent) => {
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

  private onEditorAction = () => {
    this.wizardUI?.requestUpdate();
  };
}
