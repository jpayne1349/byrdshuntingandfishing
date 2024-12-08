<script lang="ts">
</script>

<div class="spinner-container">
	<svg class="page-spinner" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			class="page-spinner-outer stroke-muted-foreground"
			d="M72 136C107.346 136 136 107.346 136 72C136 36.6538 107.346 8 72 8C36.6538 8 8 36.6538 8 72C8 107.346 36.6538 136 72 136Z"
			stroke-width="16"
			stroke-linecap="round"
			stroke-dasharray="100.53 100.53"
		/>
		<path
			class="page-spinner-inner stroke-accent"
			d="M72 118C97.4051 118 118 97.4051 118 72C118 46.5949 97.4051 26 72 26C46.5949 26 26 46.5949 26 72C26 97.4051 46.5949 118 72 118Z"
			stroke-width="16"
			stroke-linecap="round"
			stroke-dasharray="72.26 72.26"
		/>
	</svg>
</div>

<style>
	.spinner-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top:0;
		left: 0;

		pointer-events: none;
		z-index: 100;
		
		display: flex;
		justify-content: center;
		align-items: center;

	}
	.page-spinner {
		width: 6rem;
		background-color: transparent;
	}
	.page-spinner-outer {
		transform-origin: center;
		animation-name: outer-spin;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.47, 0.62, 0.65, 0.53);
	}
	.page-spinner-inner {
		transform-origin: center;
		animation-name: inner-spin;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.47, 0.62, 0.65, 0.53);
	}
	@media (min-width: 640px) {
		.page-spinner {
			width: 8rem;
		}
	}
	@media (min-width: 1560px) {
		.page-spinner {
			width: 10rem;
		}
	}
	@keyframes outer-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes inner-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
