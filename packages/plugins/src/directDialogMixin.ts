import {
  LitElement,
  TemplateResult,
  html,
  state,
  query,
} from 'lit-element';
import { WizardEvent, WizardFactory } from '@openscd/open-scd/src/foundation.js';
import { WizardDialog } from '@openscd/open-scd/src/wizard-dialog.js';
import '@openscd/open-scd/src/wizard-dialog.js';

/**
 * Base class for plugins that manage their own dialogs directly
 * without depending on oscd-wizard
 */
export class DirectDialogMixin extends LitElement {
  /** FIFO queue of [[`Wizard`]]s to display. */
  @state()
  workflow: WizardFactory[] = [];

  @query('wizard-dialog') wizardUI!: WizardDialog;

  /**
   * Handles wizard events by adding or removing wizards from the workflow
   */
  private onWizard(we: WizardEvent) {
    const wizard = we.detail.wizard;
    if (wizard === null) this.workflow.shift();
    else if (we.detail.subwizard) this.workflow.unshift(wizard);
    else this.workflow.push(wizard);
    this.requestUpdate('workflow');
    this.updateComplete.then(() =>
      this.wizardUI?.updateComplete.then(() =>
        this.wizardUI?.dialog?.updateComplete.then(() =>
          this.wizardUI?.dialog?.focus()
        )
      )
    );
  }

  /**
   * Add event listeners for wizard events and editor actions
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('wizard', this.onWizard.bind(this));
    this.addEventListener('editor-action', () =>
      this.wizardUI?.requestUpdate()
    );
  }

  /**
   * Renders the wizard dialog component
   */
  protected renderWizardDialog(): TemplateResult {
    return html`<wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
  }
}
