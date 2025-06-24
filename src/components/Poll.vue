<template>
  <!-- Autentisering må gjøres mot DnID og hvorvidt man har svart påvirker noe styling -->
  <form
    :data-user="isAuthenticated ? 'logged-in' : 'not-logged-in'"
    :data-state="isAnswered ? 'answered' : 'unanswered'"
  >
    <fieldset>
      <!-- Trenger et felt for dette fra backend: Adrian -->
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

      <!-- DnButton -->
      <FakeButton v-if="!isAuthenticated" @click="handleLogin" />

      <footer>
        <span v-if="!isAnswered">Svaret ditt er anonymt</span>
        <span v-else>{{ NumberFormat(randomVoteCount) }} stemmer</span>
        <!-- DnButton -->
        <!-- <button v-if="isAnswered" @click="handleVoteAgain" type="reset">Stem på nytt</button> -->
        <Disclaimer />
      </footer>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuestionOption from './QuestionOption.vue'
import FakeButton from './FakeButton.vue'
import Disclaimer from './Disclaimer.vue'

// Skal sjekke opp om dette er det rette formatet de liker i avisen :)
import { NumberFormat } from '../utils/utils'

interface Props {
  title: string
}

const props = defineProps<Props>()

const isAuthenticated = ref(false)
const isAnswered = ref(false)
const randomVoteCount = ref(0)
const pollResetKey = ref(0)

// DnID
const handleLogin = (event: Event) => {
  event.preventDefault()
  isAuthenticated.value = true
}

// Byttes med reelle data fra backend
const handlePollAnswered = () => {
  isAnswered.value = true
  // Generate a random number between 1000 and 50000
  randomVoteCount.value = Math.floor(Math.random() * 49000) + 1000
}

// const handleVoteAgain = () => {
//   isAnswered.value = false
//   randomVoteCount.value = 0
//   // Reset the poll state by triggering a reset event
//   pollResetKey.value++
// }
</script>

<style>
form {
  background-color: var(--color-ui-generic-bg);
  border-radius: var(--border-radius-default-min);
  font-variant-numeric: tabular-nums;
  padding-block-end: 1.5rem;
  padding-block-start: 1rem;
  padding-inline: 1rem;

  &[data-state='not-logged-in'] {
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
  color: var(--color-typography-default);
  display: inline-block;
  font-family: 'Sharp Grotesk Medium 21';
  font-size: 1rem;
  padding-inline: 0;
}

footer {
  align-items: center;
  color: var(--color-typography-secondary);
  display: flex;
  flex-wrap: wrap;
  padding-inline: 0.125rem;
  row-gap: 1rem;

  button {
    background-color: var(--color-button-secondary-default-bg);
    border: none;
    color: var(--color-button-secondary-default-fg);
    cursor: pointer;
    display: inline;
    font: inherit;
    margin-inline-start: 1rem;
    text-decoration: underline;
    text-underline-offset: 0.125rem;
    text-transform: uppercase;
  }

  > *:not(details) {
    font-family: var(--typography-utility-topic-font-family);
    font-size: var(--typography-utility-topic-font-size);
    letter-spacing: var(--typography-utility-topic-letter-spacing);
    line-height: var(--typography-utility-topic-line-height);
    text-transform: var(--typography-utility-topic-text-case);
  }
}

/* Typisk utilityklasse. Usikker på om vi har den i biblioteket på en annen måte i dag */
.visually-hidden {
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/* @supports (text-box: trim-both cap alphabetic) {
  legend,
  label,
  span {
    text-box: trim-both cap alphabetic;
  }
} */
</style>
