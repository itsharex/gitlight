<script lang="ts">
	import { onMount, type ComponentType, createEventDispatcher } from 'svelte';
	import { CrossIcon } from '$lib/icons';

	export let label: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
	export let value: string | number;
	export let type: 'text' | 'number' | 'password' = 'text';
	export let placeholder: string;
	export let clearable = false;
	export let disabled = false;
	export let error = false;
	export let autofocus = false;

	let input: HTMLInputElement;
	let focused = false;

	const dispatch = createEventDispatcher();

	export function focus() {
		input.focus();
	}

	onMount(() => {
		if (autofocus) {
			focus();
		}
	});
</script>

<label class="container" class:disabled>
	{#if label}
		<p class="label">{label}</p>
	{/if}
	<div class="input-wrapper" class:error class:empty={!value} class:focused>
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		<input
			class="input"
			{...{ type }}
			bind:value
			{placeholder}
			{disabled}
			bind:this={input}
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			on:input={(e) => dispatch('input', e)}
			autocorrect="off"
			spellcheck={false}
		/>
		<slot />
		{#if clearable && value}
			<button class="clear" on:click={() => (value = '')} type="button">
				<CrossIcon />
			</button>
		{/if}
	</div>
</label>

<style lang="scss">
	.container {
		display: flex;
		width: 100%;
		flex: 1;
		flex-direction: column;
		gap: 0.5rem;

		&.disabled {
			opacity: 0.5;

			* {
				cursor: not-allowed !important;
			}
		}
	}

	.input-wrapper {
		@include mixins.box(true);

		position: relative;
		display: flex;
		align-items: center;
		padding: 0.75em 1em;
		cursor: text;
		gap: 0.5em;

		&.empty :global(svg) {
			color: variables.$bg-5;
		}

		&.focused {
			border-color: variables.$light-blue;
		}

		&.error {
			border-color: variables.$red;
		}

		:global(svg) {
			height: 1.25rem;
			flex: 0 0 1.25rem;
		}

		.input {
			width: 100%;

			&::placeholder {
				color: variables.$bg-5;
			}
		}

		.clear {
			flex: 0 0 0.75rem;

			:global(svg) {
				height: 0.75rem;
			}

			&:not(:hover) {
				color: variables.$bg-5;
			}
		}
	}
</style>
