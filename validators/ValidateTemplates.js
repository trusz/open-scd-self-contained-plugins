import { __decorate } from "tslib";
import { property, html } from 'lit-element';
import { get } from '../translation.js';
import { newIssueEvent, newLogEvent, } from '@openscd/core/foundation/deprecated/history.js';
import { validateChildren } from './templates/foundation.js';
import { DirectDialogMixin } from '../directDialogMixin.js';
export default class ValidateTemplates extends DirectDialogMixin {
    dispatch(detail) {
        const kind = detail.kind;
        const title = detail.title;
        const message = detail.message;
        if (kind)
            this.dispatchEvent(newLogEvent(detail));
        else
            this.dispatchEvent(newIssueEvent({
                validatorId: this.pluginId,
                title,
                message,
            }));
    }
    async validate() {
        const promises = [];
        const [version, revision, release] = [
            this.doc.documentElement.getAttribute('version') ?? '',
            this.doc.documentElement.getAttribute('revision') ?? '',
            this.doc.documentElement.getAttribute('release') ?? '',
        ];
        if (!(version === '2007' && revision === 'B' && Number(release) > 3)) {
            this.dispatchEvent(newIssueEvent({
                validatorId: this.pluginId,
                title: get('diag.missingnsd'),
                message: '',
            }));
            return;
        }
        const data = this.doc.querySelector('DataTypeTemplates');
        if (!data)
            return;
        const templateIssues = await validateChildren(data);
        if (templateIssues.length === 0)
            templateIssues.push({
                title: get('diag.zeroissues'),
            });
        templateIssues.forEach(error => this.dispatchEvent(newIssueEvent({
            ...error,
            validatorId: this.pluginId,
        })));
    }
    render() {
        return html `${this.renderWizardDialog()}`;
    }
}
__decorate([
    property({ attribute: false })
], ValidateTemplates.prototype, "doc", void 0);
__decorate([
    property()
], ValidateTemplates.prototype, "docName", void 0);
__decorate([
    property()
], ValidateTemplates.prototype, "pluginId", void 0);
//# sourceMappingURL=ValidateTemplates.js.map