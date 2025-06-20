<template>
  <form>
    <fieldset>
      <legend>{{ title }}</legend>
      <QuestionOption
        :questions="[
          'This is the same option that spans three lines, and contains enough characters to show line wrapping on the desktop version.',
          'This is option B with different content.',
          'This is option C with even more content to demonstrate the alphabetized labels.',
        ]"
        :percentages="[35, 45, 20]"
      />

      <Button />

      <footer>
        <span>Svaret ditt er anonymt</span>
        <details>
          <summary>
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
          </summary>
          <p>
            Resultatene viser hva DNs lesere har svart, og er ikke nødvendigvis representative for
            befolkningen i sin helhet.
          </p>
        </details>
      </footer>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import QuestionOption from './QuestionOption.vue'
import Button from './Button.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style>
@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }

  [open]::details-content {
    height: auto;
  }

  ::details-content {
    transition:
      height 0.25s ease,
      content-visibility 0.25s ease allow-discrete;
    height: 0;
    overflow: clip;
  }
}

form {
  background-color: var(--color-ui-generic-bg);
  border-radius: var(--border-radius-default-min);
  font-variant-numeric: tabular-nums;
  padding-block-end: 1.5rem;
  padding-block-start: 1rem;
  padding-inline: 1rem;
}

fieldset {
  border: none;
  display: grid;
  font-family: 'Inter';
  font-size: 14px;
  line-height: 1.4;
  padding: 0;
  row-gap: 1rem;
}

legend {
  display: inline-block;
  font-family: 'Sharp Grotesk Medium 21';
  font-size: 1rem;
  margin-block-end: 1rem;
  padding-inline: 0;
}

/* @supports (text-box: trim-both cap alphabetic) {
  legend,
  label,
  span {
    text-box: trim-both cap alphabetic;
  }
} */

footer {
  color: var(--color-typography-secondary);
  display: grid;
  grid-template-columns: 1fr 1.25rem;
}

details {
  p {
    /* font-family: var(
      --typography-editorial-infobox-body-min-font-family
    ); Denne må fikses live */
    font-family: 'Inter';
    font-size: var(--typography-editorial-infobox-body-min-font-size);
    grid-column: 1 / -1;
    grid-row: 2;
    line-height: var(--typography-editorial-infobox-body-min-line-height);
  }
}

summary {
  align-items: center;
  column-gap: 0.5ex;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.05em;
  padding-block: 1rem;
  padding-inline-end: 2px;

  span {
    font-size: var(--typography-utility-topic-font-size);
    line-height: var(--typography-utility-topic-line-height);
    letter-spacing: var(--typography-utility-topic-letter-spacing);
    text-transform: var(--typography-utility-topic-text-case);
  }

  svg {
    cursor: pointer;
  }
}

summary::marker {
  content: '';
}

footer {
}
</style>
