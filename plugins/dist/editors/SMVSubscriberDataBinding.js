import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, property } from '../../../_snowpack/pkg/lit-element.js';
import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-ln-binding-list.js';
import { WizardMixin } from '../wizard-mixin.js';
/** An editor [[`plugin`]] for Subscribe Data Binding (SMV). */
class SMVSubscribeDataBindingPlugin extends WizardMixin {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    render() {
        return html `<div>
      <div class="container">
        <fcda-binding-list
          class="column"
          controlTag="SampledValueControl"
          .includeLaterBinding="${false}"
          .editCount=${this.editCount}
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-ln-binding-list
          class="column"
          controlTag="SampledValueControl"
          .editCount=${this.editCount}
          .doc="${this.doc}"
          .nsdoc="${this.nsdoc}"
        >
        </extref-ln-binding-list>
      </div>
      ${this.renderWizardDialog()}
    </div>`;
    }
}
SMVSubscribeDataBindingPlugin.styles = css `
    :host {
      width: 100vw;
    }

    .container {
      display: flex;
      padding: 8px 6px 16px;
      height: calc(100vh - 136px);
    }

    .column {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }
  `;
export default SMVSubscribeDataBindingPlugin;
__decorate([
    property({ attribute: false })
], SMVSubscribeDataBindingPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SMVSubscribeDataBindingPlugin.prototype, "editCount", void 0);
__decorate([
    property()
], SMVSubscribeDataBindingPlugin.prototype, "nsdoc", void 0);
//# sourceMappingURL=SMVSubscriberDataBinding.js.map