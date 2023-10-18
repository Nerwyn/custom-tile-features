import { html, css, CSSResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { BaseServiceCallFeature } from './base-service-call-feature';

@customElement('service-call-button')
export class ServiceCallButton extends BaseServiceCallFeature {
	constructor() {
		super();
	}

	onClick(e: MouseEvent) {
		e.stopImmediatePropagation();
		const [domain, service] = this.entry.service.split('.');
		const data = this.entry.data || {};

		this.hass.callService(domain, service, data);
	}

	render() {
		const style: Record<string, string | number> = {};
		if (this.entry.color) {
			style['background-color'] = this.entry.color;
		}
		if (this.entry.opacity) {
			style['opacity'] = this.entry.opacity;
		}

		const button = html`<button
			class="button"
			@click=${this.onClick}
			style=${styleMap(style)}
		></button>`;

		// Icon
		let icon = html``;
		if ('icon' in this.entry) {
			icon = this.renderIcon(
				this.entry.icon as string,
				this.entry.icon_color,
			);
		}

		// Label
		let label = html``;
		if ('label' in this.entry) {
			label = this.renderLabel(
				this.entry.label as string,
				this.entry.label_color,
			);
		}

		return html`${button}${icon}${label} `;
	}

	static get styles() {
		return [
			super.styles as CSSResult,
			css`
				.button {
					background-color: var(--disabled-color);
					opacity: 0.2;
					transition: background-color 180ms ease-in-out;
					position: absolute;
					cursor: pointer;
					height: inherit;
					width: inherit;
					border-radius: 10px;
					border: none;
				}
				@media (hover: hover) {
					.button:hover {
						opacity: 0.3;
					}
				}
				.button:active {
					opacity: 0.3;
				}
			`,
		];
	}
}