import { LitElement, property, html, TemplateResult } from 'lit-element';
import { get } from '../translation.js';
import {
  LogDetail,
  LogDetailBase,
  newIssueEvent,
  newLogEvent,
} from '@openscd/core/foundation/deprecated/history.js';
import { validateChildren } from './templates/foundation.js';
import { DirectDialogMixin } from '../directDialogMixin.js';

type ValidationResult = LogDetailBase | LogDetail;

export default class ValidateTemplates extends DirectDialogMixin {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property()
  docName!: string;

  @property()
  pluginId!: string;

  dispatch(detail: ValidationResult): void {
    const kind = (<LogDetail>detail).kind;
    const title = (<LogDetailBase>detail).title;
    const message = (<LogDetailBase>detail).message;

    if (kind) this.dispatchEvent(newLogEvent(<LogDetail>detail));
    else
      this.dispatchEvent(
        newIssueEvent({
          validatorId: this.pluginId,
          title,
          message,
        })
      );
  }

  async validate(): Promise<void> {
    const promises: Promise<void>[] = [];

    const [version, revision, release] = [
      this.doc.documentElement.getAttribute('version') ?? '',
      this.doc.documentElement.getAttribute('revision') ?? '',
      this.doc.documentElement.getAttribute('release') ?? '',
    ];

    if (!(version === '2007' && revision === 'B' && Number(release) > 3)) {
      this.dispatchEvent(
        newIssueEvent({
          validatorId: this.pluginId,
          title: get('diag.missingnsd'),
          message: '',
        })
      );
      return;
    }

    const data = this.doc.querySelector('DataTypeTemplates');
    if (!data) return;

    const templateIssues = await validateChildren(data);
    if (templateIssues.length === 0)
      templateIssues.push({
        title: get('diag.zeroissues'),
      });

    templateIssues.forEach(error =>
      this.dispatchEvent(
        newIssueEvent({
          ...error,
          validatorId: this.pluginId,
        })
      )
    );
  }

  render(): TemplateResult {
    return html`${this.renderWizardDialog()}`;
  }
}
