<script lang="ts">
  import PartySocket from "partysocket";
  const { PUBLIC_PHROG_APP_URL } = import.meta.env.PUBLIC_PHROG_APP_URL;

  export let id : string;
  export let src : string;
  const socket = new PartySocket({
    host: import.meta.env.DEV ? "localhost:1999" : PUBLIC_PHROG_APP_URL, 
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
