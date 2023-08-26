<script lang="ts">
  import PartySocket from "partysocket";

  export let id : string;
  export let src : string;
  const socket = new PartySocket({
    host: "localhost:1999",
    room: id
  });
</script>

<button on:click={() => socket.send(JSON.stringify({ src }))}>
  <img
    {src}
    alt="Reactor button"
    class="w-16 h-16"
  />
</button>
