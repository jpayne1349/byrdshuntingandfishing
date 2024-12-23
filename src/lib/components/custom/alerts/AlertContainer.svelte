<script lang="ts">
</script>

<div class="alert-container">
	<slot />
</div>

<style>
	.alert-container {
		position: fixed;
		z-index: 100;

		width: 100vw;
		bottom: 15px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
