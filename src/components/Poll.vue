<template>
  <form>
    <fieldset>
      <legend>{{ title }}</legend>
      <label for="">
        <span></span>
        <span
          >This is the same option that spans three lines, and contains enough characters to show
          line wrapping on the desktop version.</span
        >
      </label>
      <input type="radio" />
      <footer>
        <p>Svaret ditt er anonymt</p>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <g fill="#53555F" clip-path="url(#a)">
              <path
                fill-rule="evenodd"
                d="M8 1.167a6.833 6.833 0 1 0 0 13.666A6.833 6.833 0 0 0 8 1.166ZM.165 8a7.833 7.833 0 1 1 15.667 0A7.833 7.833 0 0 1 .166 8Z"
                clip-rule="evenodd"
              />
              <path fill-rule="evenodd" d="M8.5 6.833v5h-1v-5h1Z" clip-rule="evenodd" />
              <path d="M8 5.333A.667.667 0 1 0 8 4a.667.667 0 0 0 0 1.333Z" />
            </g>
            <defs>
              <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath>
            </defs>
          </svg>
        </button>
        <p>
          Svaret ditt er anonymt Resultatene viser hva DNs lesere har svart, og er ikke nødvendigvis
          representative for befolkningen i sin helhet.
        </p>
      </footer>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style>
form {
  inline-size: min(100% - 3rem, 680px);
  margin-inline: auto;
}

fieldset {
  border: none;
  font-family: 'Inter';
  font-size: 14px;
  line-height: 1.4;
  outline: 1px solid red;
  padding: 0;
}

legend {
  font-family: 'Sharp Grotesk Medium 21';
  font-size: 1rem;
  padding-inline-start: 0;
}

button {
  background: none;
  line-height: 1;
  padding: 0.5em;
}
</style>
