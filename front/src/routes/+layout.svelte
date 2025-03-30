<script lang="ts">
  import "../app.css";
  import { Toaster } from "$lib/components/ui/sonner/index.js";

  let { children } = $props();
</script>

<Toaster />

<div class="h-screen flex flex-col">
  <!-- TOP NAV -->
  <div
    class="sticky top-0 border-b p-4 flex items-center justify-between gap-3 bg-white"
  >
    <a href="/">
      <p class="font-bold">Hack My Prompt</p>
    </a>
    <p class="text-xs text-muted-foreground">
      *All informations are possibly inaccurate. Please do not use them in a
      real-world context and do your own research.
    </p>
    <a
      href="https://github.com/anaelChardan/hackmyprompt"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5"
      >
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        ></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>
      <span class="hidden sm:inline">GitHub</span>
      <div class="flex items-center gap-1 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-yellow-400"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
        <span class="text-xs">10.2k</span>
      </div>
    </a>
  </div>
  <!-- CONTENT -->
  {@render children()}
</div>
