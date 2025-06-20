<template>
  <div class="option-items">
    <template v-for="(question, index) in questions" :key="index">
      <label
        :for="getInputId(index)"
        :style="{ '--gradient-percentage': `${percentages[index]}%` }"
        :class="{ animate: true }"
      >
        <span>{{ getOptionLabel(index) }}</span>
        <span>{{ question }}</span>
        <output>{{ percentages[index] }}%</output>
      </label>
      <input
        type="radio"
        :id="getInputId(index)"
        :name="name"
        :value="getOptionLabel(index).toLowerCase()"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  questions: string[]
  percentages?: number[]
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'poll-option',
  percentages: () => [25, 45, 30], // Default static data for testing
})

const getOptionLabel = (index: number): string => {
  return String.fromCharCode(65 + index) // 65 is ASCII for 'A'
}

const getInputId = (index: number): string => {
  return `option-${getOptionLabel(index).toLowerCase()}`
}
</script>

<style>
@keyframes animateGradient {
  0% {
    inline-size: 0%;
  }
  100% {
    inline-size: var(--gradient-percentage);
  }
}

.option-items {
  display: grid;
  grid-template-columns: 2rem auto 1fr;
  row-gap: 1rem;
}

label {
  align-items: center;
  background-color: var(--color-brand-utility-0);
  border-start-end-radius: var(--border-radius-default-min);
  border-start-start-radius: var(--border-radius-default-min);
  color: var(--color-typography-secondary);
  cursor: pointer;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  position: relative;

  & > * {
    pointer-events: none;
  }

  &::after,
  &::before {
    block-size: 0.25rem;
    border-end-start-radius: 4px;
    content: '';
    inset-block-end: -0.25rem;
    position: absolute;
  }

  &::after {
    animation: animateGradient 0.8s ease-out forwards;
    background-color: var(--color-brand-utility-700);
    inline-size: var(--gradient-percentage, 25%);
  }

  &::before {
    background-color: var(--color-brand-utility-200);
    border-end-end-radius: 4px;
    inline-size: 100%;
  }

  span,
  output {
    grid-template-columns: subgrid;
    padding: 0.5rem;
  }

  span:first-child {
    color: var(--color-typography-default);
    font-weight: 700;
    text-align: center;
  }

  span:nth-child(1) {
    grid-column: 1 / 2;
  }

  span:nth-child(2) {
    border-inline-start: 1px solid var(--color-ui-generic-bg);
    grid-column: 2 / 3;
  }

  output {
    grid-column: 3 / 4;
  }
}

.option-items {
  @media (hover) and (prefers-reduced-motion: no-preference) {
    label {
      transition: opacity 360ms ease-out;
    }

    &:hover > label:not(:hover) {
      opacity: 50%;
    }
  }
}

input[type='radio'] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
