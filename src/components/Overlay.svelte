<script lang="ts">
  import { tick } from "svelte";
  import { fade, fly } from "svelte/transition";
  import PartySocket from "partysocket";

  export let id : string;
  export let width : number;
  export let height : number;
  let reactions : { src: string, fading: boolean }[] = [];

  const socket = new PartySocket({
    host: "localhost:1999",
    room: id
  });

  async function ping(source : string) {
    let reaction = {
      src: source,
      fading: false,
    };

    reactions = [...reactions, reaction];
    await tick();
    reactions[reactions.indexOf(reaction)].fading = true;
  }

  socket.onmessage = ((event) => {
    const { src, room } = JSON.parse(event.data as string);
    ping(src);
  });

</script>

<div class="relative bg-[#00ff00]" style:width={width + "px"} style:height={height + "px"}>
  {#each reactions as r}
    {#if !r.fading}
      <img
        src={r.src}
        alt="banana"
        class="w-32 h-32"
        style:position="absolute"
        style:left={Math.floor(Math.random() * width) + "px"}
        style:bottom={Math.floor(Math.random() * height) + "px"}
        in:fade={{ duration: 3000 }}
        out:fly={{ y: -500, delay: 300, duration: 2000 }}
      />
    {/if}
  {/each}
</div>
