<template>
  <form :data-user="isAuthenticated ? 'logged-in' : 'not-logged-in'">
    <fieldset>
      <legend>{{ title }}</legend>
      <QuestionOption
        :questions="[
          'This is the same option that spans three lines, and contains enough characters to show line wrapping on the desktop version.',
          'This is option B with different content.',
          'This is option C with even more content to demonstrate the alphabetized labels.',
        ]"
        :percentages="[35, 45, 20]"
        :is-authenticated="isAuthenticated"
        :key="pollResetKey"
        @poll-answered="handlePollAnswered"
      />

      <Button v-if="!isAuthenticated" @click="handleLogin" />

      <footer>
        <span v-if="!isAnswered">Svaret ditt er anonymt</span>
        <span v-else class="vote-count">{{ NumberFormat(randomVoteCount) }} stemmer</span>
        <button v-if="isAnswered" @click="handleVoteAgain" type="reset">Stem på nytt</button>
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
import { ref } from 'vue'
import QuestionOption from './QuestionOption.vue'
import Button from './Button.vue'
import { NumberFormat } from '../utils/utils'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const isAuthenticated = ref(false)
const isAnswered = ref(false)
const randomVoteCount = ref(0)
const pollResetKey = ref(0)

const handleLogin = (event: Event) => {
  event.preventDefault()
  isAuthenticated.value = true
}

const handlePollAnswered = () => {
  isAnswered.value = true
  // Generate a random number between 1000 and 50000
  randomVoteCount.value = Math.floor(Math.random() * 49000) + 1000
}

const handleVoteAgain = () => {
  isAnswered.value = false
  randomVoteCount.value = 0
  // Reset the poll state by triggering a reset event
  pollResetKey.value++
}
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

  &[data-state='not-logged in'] ol {
    opacity: 0.5;
    pointer-events: none;
  }
}

fieldset {
  border: none;
  font-family: 'Inter';
  font-size: 14px;
  line-height: 1.4;
  padding: 0;

  & > * + * {
    margin-block-start: 1rem;
  }
}

legend {
  display: inline-block;
  font-family: 'Sharp Grotesk Medium 21';
  font-size: 1rem;
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
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* grid-template-columns: 1fr 1.25rem; */
}

[type='reset'] {
  background-color: var(--color-button-secondary-default-bg);
  border: none;
  color: var(--color-button-secondary-default-fg);
  cursor: pointer;
  display: inline;
  font: inherit;
  padding: 0;
  text-decoration: underline;
  text-transform: uppercase;
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
</style>
