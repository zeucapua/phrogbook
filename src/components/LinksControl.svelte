<script lang="ts">
  let overlay_url : string; 
  let watcher_url : string;

  function generateLinks() {
    let random_id = Math.floor(Math.random() * (999 - 101) + 100);
    overlay_url = `http://localhost:3000/o?id=${random_id}&w=500&h=500`;
    watcher_url = `http://localhost:3000/w?id=${random_id}&w=500&h=500`;
  }

  function openOverlay() {
    window.open(overlay_url, "Overlay Display", "width=500,height=500,popup");
  }
</script>


<section class="flex flex-col gap-8 w-full max-w-3xl h-full mx-auto">
  <section class="flex justify-between items-center">
    <h2 class="text-3xl font-bold underline decoration-dotted underline-offset-8">
      Links
    </h2>
    <button on:click={generateLinks}>Generate</button>
  </section>
  <section class="flex justify-between items-center">
    <h3 class="text-xl font-bold">Overlay Link</h3>
    <input bind:value={overlay_url} readonly type="text" placeholder="Overlay link here" class="w-full max-w-xl px-4 py-2 rounded-lg"/>
    <button on:click={openOverlay}>Open</button>
  </section>
  <section class="flex justify-between items-center">
    <h3 class="text-xl font-bold">Watcher Link</h3>
    <input bind:value={watcher_url} readonly type="text" placeholder="Watcher link here" class="w-full max-w-xl px-4 py-2 rounded-lg"/>
  </section>
</section>
