import { css,html,customElement, state, when} from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbFormControlMixin } from '@umbraco-cms/backoffice/validation';
import { UmbPropertyEditorConfigCollection, UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UMB_DOCUMENT_WORKSPACE_CONTEXT, UmbDocumentUrlModel, UmbDocumentUrlRepository, UmbDocumentVariantModel, UmbDocumentWorkspaceContext } from '@umbraco-cms/backoffice/document';
import { UMB_PROPERTY_CONTEXT } from '@umbraco-cms/backoffice/property';
import { UUIInputElement, UUITextareaElement, UUIToggleElement } from '@umbraco-cms/backoffice/external/uui';
import {DEFAULT_MAX_CHARS_DESCRIPTION, DEFAULT_MAX_CHARS_TITLE} from "../models/constants.ts";
import {SeoVisualizerPropertyEditorValue} from "../models/seo-visualizer-property-editor-value.ts";
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';
import { UmbEntityActionEvent, UmbRequestReloadStructureForEntityEvent } from '@umbraco-cms/backoffice/entity-action';
import { debounce } from '@umbraco-cms/backoffice/utils';
import { UmbEntityUnique } from '@umbraco-cms/backoffice/entity';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';

/**
* seo-visualizer-property-editor-ui description
* @element seo-visualizer-property-editor-ui
* @fires CustomEvent#change - lorem ipsum
* @cssprop --ns-foo-bar - Color of lorem
*/
@customElement('seo-visualizer-property-editor-ui')
export class SeoVisualizerPropertyEditorUiElement extends UmbFormControlMixin<SeoVisualizerPropertyEditorValue | undefined, typeof UmbLitElement>(UmbLitElement, undefined) implements UmbPropertyEditorUiElement {

  #documentUrlRepository = new UmbDocumentUrlRepository(this);
  #workspaceContext? : UmbDocumentWorkspaceContext;
  #eventContext?: typeof UMB_ACTION_EVENT_CONTEXT.TYPE;

  @state()
  _culture? : string;

  @state()
  _unique? : UmbEntityUnique;

  @state()
  _urls? : UmbDocumentUrlModel[];

  @state()
  _variants? : UmbDocumentVariantModel[];

  @state()
  _previewUrl? : string;

  @state()
  _previewTitle? : string;

  @state()
  _configRecommendedTitleLength : number = 0;

  @state()
  _configRecommendedDescriptionLength : number = 0;

  @state()
  _configTitleSuffix = ''

  @state()
  _configUseNoIndex = true;

  /** Indicator if we should show the "exclude title suffix"-toggle. This will be set based on if there is a title suffix configured */
  @state()
  _configShowExcludeTitleSuffix : boolean = false;

  public set config(config: UmbPropertyEditorConfigCollection | undefined) {
    if (!config) return;

    this._configRecommendedTitleLength = this.#parseInt(config.getValueByAlias('maxCharsTitle'), DEFAULT_MAX_CHARS_TITLE);
    this._configRecommendedDescriptionLength = this.#parseInt(config.getValueByAlias('maxCharsDescription'), DEFAULT_MAX_CHARS_DESCRIPTION);
    this._configTitleSuffix = config.getValueByAlias('titleSuffix') ?? "";
    this._configUseNoIndex = config.getValueByAlias('useNoIndex') == true
    this._configShowExcludeTitleSuffix = !!(this._configTitleSuffix && this._configTitleSuffix !== '');
  }

  constructor() {
    super();

    this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (context) => {
			this.#workspaceContext = context;
			this.#observeContent();
		});

    this.consumeContext(UMB_PROPERTY_CONTEXT, (propertyContext) => {
      this.observe(propertyContext?.variantId,(variantId)=>{
        this._culture = variantId?.culture ?? undefined;
        this.#setPropertiesByCulture();
      },'SeoVisualizerVariantIdSubscription')
		});

    // Setting up event-handler for when document is published (urls might change)
    this.consumeContext(UMB_ACTION_EVENT_CONTEXT, (context) => {
			this.#eventContext = context;

			this.#eventContext?.removeEventListener(
				UmbRequestReloadStructureForEntityEvent.TYPE,
				this.#onReloadRequest as unknown as EventListener,
			);

			this.#eventContext?.addEventListener(
				UmbRequestReloadStructureForEntityEvent.TYPE,
				this.#onReloadRequest as unknown as EventListener,
			);
		});

  }

  #observeContent() {
    if (!this.#workspaceContext) return;

    this.observe(this.#workspaceContext?.unique, async(unique)=> {
      this._unique = unique;

      await this.#requestUrls();

    },'_documentUrls');

    this.observe(
      this.#workspaceContext.variants,
      (variants) => {
        this._variants = variants;
        this.#setPropertiesByCulture();
      },
      '_variants',
    );
  }

  #debounceRequestUrls = debounce(() => this.#requestUrls(), 50);

  #onReloadRequest = (event : UmbEntityActionEvent) => {
    if (event.getUnique() !== this.#workspaceContext?.getUnique()) return;
		if (event.getEntityType() !== this.#workspaceContext.getEntityType()) return;
    this.#debounceRequestUrls();
  }

  async #requestUrls() {

    if(!this._unique)
      return;

    const {data} = await this.#documentUrlRepository.requestItems([this._unique]);

      if (data?.length) {
        const item = data[0];
        this._urls = item.urls;
        this.#setPropertiesByCulture();
      }
  }

  #setPropertiesByCulture() {
    this.#setUrl()
    this.#setTitle()
  }

  #setUrl(){
    let urls = this._urls?.filter(x=>x.culture == this._culture);

    // if we can't find matching URL by culture, fallback to any existing url.
    if(!urls || urls?.length == 0){
      urls = this._urls;
    }

    if(!urls || urls.length == 0)
    {
      this._previewUrl = 'https://';
      return;
    }

    let url = this.#prependProtocolAndHost(urls[0]?.url ?? '');

    this._previewUrl = url;

  }

  #setTitle() {

    let title = this.value?.title ?? "";

    if(!title || title == '') {
      let node = this._variants?.filter(x=>x.culture == this._culture).shift();
      if(node) {
        title = node.name;
      }
    }

    // Only append suffix if we have a value to render.
    if(title === '')
    {
      this._previewTitle = title;
      return;
    }

    if(this._configTitleSuffix && !this.value?.excludeTitleSuffix) {
      title = `${title} ${this._configTitleSuffix}`;
    }

    this._previewTitle = title;
  }

  #prependProtocolAndHost(url : string) : string {

    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      // if umbraco returns absolute urls we don't need to append the protocol and host
      return url;
  }

    var http = location.protocol;
    var slashes = http.concat("//");
    return slashes.concat(window.location.hostname) + url;

  }

  #parseInt(value: unknown, fallback: number): number {
    const num = Number(value);
    return !isNaN(num) && num > 0 ? num : fallback;
  }

  #updateValue(updates : Partial<SeoVisualizerPropertyEditorValue>) {
     let newVal : SeoVisualizerPropertyEditorValue = {
      excludeTitleSuffix : this.value?.excludeTitleSuffix ?? false,
      noIndex : this.value?.noIndex ?? false,
      description : this.value?.description,
      title : this.value?.title
    }

    this.value = {...newVal,...updates};

    this.dispatchEvent(new UmbChangeEvent());

  }

  #onTitleChange(e : Event) {
    var title = (e.target as UUIInputElement).value.toString();
    this.#updateValue({title : title})
    this.#setTitle();
  }

  #onDescriptionChange(e : Event) {
    var description = (e.target as UUITextareaElement).value.toString();
    this.#updateValue({description : description})
  }

  #onExcludeTitleSuffixChange(e : Event){
    var exclude = (e.target as UUIToggleElement).checked;
    this.#updateValue({excludeTitleSuffix : exclude});
    this.#setTitle();
  }

  #onNoIndexChange(e : Event){
    var noIndex = (e.target as UUIToggleElement).checked;
    this.#updateValue({noIndex : noIndex});
  }

  protected firstUpdated() {
    //this.addFormControlElement(this.shadowRoot!.querySelector('element')!);
  }

  render() {
    return html`
      <div>
        <div id="form">
          <div>
            <uui-input
              type="text"
              @keyup=${this.#onTitleChange}
              .value=${this.value?.title ?? ""}
              label="Title"
              placeholder=${this.localize.term('seoVisualizer_title_placeholder')}
             ></uui-input>
             ${when((this.value?.title?.length ?? 0) > this._configRecommendedTitleLength,()=>html`
              <p class="error">${this.localize.term('seoVisualizer_max_length',this._configRecommendedTitleLength)}</p>
            `)}
          </div>
          <div>
            <uui-textarea
              @keyup=${this.#onDescriptionChange}
              .value=${this.value?.description ?? ""}
              label="Meta Description"
              rows="6"
              placeholder=${this.localize.term('seoVisualizer_description_placeholder')}
            ></uui-textarea>
            ${when((this.value?.description?.length ?? 0) > this._configRecommendedDescriptionLength,()=>html`
              <p class="error">${this.localize.term('seoVisualizer_max_length',this._configRecommendedDescriptionLength)}</p>
            `)}
          </div>
          ${when(this._configShowExcludeTitleSuffix,()=>html`
            <div>
              <uui-toggle @change=${this.#onExcludeTitleSuffixChange} label=${this.localize.term('seoVisualizer_exclude_title_suffix')} ?checked=${this.value?.excludeTitleSuffix}></uui-toggle>
            </div>
          `)}
          ${when(this._configUseNoIndex,()=>html`
            <div>
              <uui-toggle @change=${this.#onNoIndexChange} label=${this.localize.term('seoVisualizer_no_index')} ?checked=${this.value?.noIndex}></uui-toggle>
            </div>
          `)}
        </div>
        <div id="preview">
          <div>
              <h6>${this._previewTitle}</h6>
              <p class="url">${this._previewUrl}</p>
              <p>${this.value?.description}</p>
          </div>
        </div>
      </div>
    `
  }

  static styles = [UmbTextStyles, css`

    #form {
      width:400px;
    }

    #form > div + div {
      margin-top:10px;
    }

    #form uui-input {
      width:100%;
    }

    :host > div {
      display:flex;
      gap:40px;
    }

    #preview {
      max-width: 600px; /* The width of the desktop-SERP as of 2019-11-14 */
    }

    #preview h6, #preview p {
      padding: 0;
      margin: 0;
    }

    #preview h6 {
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 3px;
      color: var(--uui-color-focus);
      text-decoration: none;
    }

    #preview p {
      font-size: 14px;
      margin-bottom: 3px;
      line-height: 1.57;
      word-wrap: break-word;
    }

    #preview p.url {
      color: var(--uui-color-text-alt);
    }

    p.error {
      color: var(--uui-color-invalid);
      margin:0;
    }

  `]
}

export default SeoVisualizerPropertyEditorUiElement;

declare global {
    interface HTMLElementTagNameMap {
        'seo-visualizer-property-editor-ui': SeoVisualizerPropertyEditorUiElement;
    }
}

/* --- TEMP Workaround for https://github.com/umbraco/Umbraco-CMS/issues/19413 --- */
/*
interface UmbDocumentUrlsModel {
	unique: string;
	urlsInfos: Array<UmbDocumentUrlModel>;
}

interface UmbDocumentUrlModel {
	culture?: string | null;
	url?: string;
}
*/
/* --- TEMP Workaround end */
