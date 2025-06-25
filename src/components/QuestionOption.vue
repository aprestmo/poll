<template>
  <ol>
    <li
      v-for="(question, index) in questions"
      :key="index"
      :tabindex="isAuthenticated ? 0 : -1"
      @keydown.enter="handleLabelClick(index)"
      @keydown.space="handleLabelClick(index)"
    >
      <label
        :for="getInputId(index)"
        :style="{
          '--percentage': selectedOption !== null ? `${percentages[index]}%` : '0%',
        }"
        :class="{
          animate: selectedOption !== null || isAuthenticated,
          disabled: !isAuthenticated,
        }"
        :data-question="selectedOption === index ? 'selected' : undefined"
        @click="handleLabelClick(index)"
        role="button"
        :aria-pressed="selectedOption === index"
      >
        <span>{{ question }}</span>
        <template v-if="selectedOption === null && !isAuthenticated">
          <!-- DnIcon: Tror ikke dette finnes i pakken i dag -->
          <LockIcon width="16" height="16" aria-hidden="true" focusable="false" />
        </template>
        <output v-else :id="getInputId(index)" :for="getInputId(index)"
          >{{ getAnimatedPercentage(index) }}%</output
        >
      </label>
      <meter :value="getAnimatedPercentage(index)" :max="100"></meter>
      <input
        class="visually-hidden"
        type="radio"
        :id="getInputId(index)"
        :name="name"
        :value="getOptionLabel(index).toLowerCase()"
        :disabled="selectedOption !== null"
        :data-question="selectedOption === index ? 'selected' : undefined"
        @change="handleSelection(index)"
        tabindex="-1"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LockIcon from '../assets/lock.svg'

interface Props {
  questions: string[]
  percentages?: number[]
  name?: string
  isAuthenticated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'poll-option',
  percentages: () => [25, 45, 30],
  isAuthenticated: false,
})

const emit = defineEmits<{
  'poll-answered': []
}>()

const selectedOption = ref<number | null>(null)
const animatedPercentages = ref<number[]>(props.percentages.map(() => 0))
const enabledInputs = ref<boolean[]>(props.questions.map(() => false))

const getOptionLabel = (index: number): string => {
  return String.fromCharCode(65 + index)
}

const getInputId = (index: number): string => {
  return `option-${getOptionLabel(index).toLowerCase()}`
}

const enableInput = (index: number) => {
  enabledInputs.value = enabledInputs.value.map((v, i) => (i === index ? true : v))
}

const handleSelection = (index: number) => {
  selectedOption.value = index
  animatePercentages()
  emit('poll-answered')
}

const animatePercentages = () => {
  const duration = 800
  const steps = 60
  const stepDuration = duration / steps

  let currentStep = 0

  const animate = () => {
    if (currentStep <= steps) {
      const progress = currentStep / steps

      animatedPercentages.value = props.percentages.map((target) => {
        return Math.round(target * progress)
      })

      currentStep++
      setTimeout(animate, stepDuration)
    }
  }

  animate()
}

const getAnimatedPercentage = (index: number): number => {
  return selectedOption.value !== null ? animatedPercentages.value[index] : 0
}

const handleLabelClick = (index: number) => {
  if (!props.isAuthenticated) return
  if (selectedOption.value !== null) return

  selectedOption.value = index
  animatePercentages()
  emit('poll-answered')
}
</script>

<style>
ol {
  align-items: center;
  display: grid;
  grid-template-columns: 2rem 1fr 7ch;
  list-style-type: upper-latin;
  list-style-position: inside;
  padding-inline-start: 0;
  row-gap: 1rem;
}

li {
  border-radius: var(--border-radius-default-min) var(--border-radius-default-min)
    calc(var(--border-radius-default-max) * 2) calc(var(--border-radius-default-max) * 2);
  counter-increment: item;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  grid-template-rows: auto 4px;
  outline: none;
  overflow: clip;
}

label {
  background-color: var(--color-brand-utility-0);
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  min-block-size: 2.5rem;
  outline: none;

  &:has(~ input:disabled) {
    pointer-events: none;
  }

  > * {
    padding-block: 0.75rem;
    padding-inline: 0.5rem;
  }

  &::before {
    align-content: center;
    block-size: 100%;
    content: counter(item, upper-latin) ' ';
    font-weight: 700;
    text-align: center;
  }

  span {
    border-inline-start: 1px solid var(--color-ui-generic-bg);
  }

  svg {
    box-sizing: content-box;
    margin-inline-start: auto;
  }
}

output {
  margin-inline-start: auto;
  min-inline-size: 7ch;
  text-align: right;
}

meter {
  background: var(--color-brand-utility-200);
  block-size: 4px;
  grid-column: 1 / -1;
  grid-row: 2;
  inline-size: 100%;

  &::-webkit-meter-bar {
    background: var(--color-brand-utility-200);
    block-size: inherit;
  }

  &::-webkit-meter-inner-element {
    block-size: inherit;
  }

  &::-webkit-meter-inner-element {
    block-size: inherit;
  }

  &::-webkit-meter-optimum-value {
    background: var(--color-brand-utility-700);
  }

  &::-moz-meter-bar {
    background: var(--color-brand-utility-700);
  }
}

/*
 * States
 */

/* Not logged in state */
[data-user='not-logged-in'] ol {
  pointer-events: none;
}

/* Logged in state */
[data-user='logged-in'][data-state='unanswered'] ol {
  @media (hover) and (prefers-reduced-motion: no-preference) {
    li {
      transition: opacity 360ms ease-out;
    }

    &:hover > li:not(:hover) {
      opacity: 50%;
    }
  }
}

/* Answered state */
[aria-pressed='true']::before {
  background-color: var(--color-utility-success-light);
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS44NjA0IDQuMDIwN0w2LjQ3OTk3IDEzLjA0MDRMMC45Mzk1MTQgNy43MTMwMUwxLjk3OTE4IDYuNjMxNzZMNi40Nzk5NyAxMC45NTk0TDE0LjgyMDggMi45Mzk0NUwxNS44NjA0IDQuMDIwN1oiIGZpbGw9IiMxMzI2NEEiLz4KPC9zdmc+Cg==');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  content: '';
}
</style>
