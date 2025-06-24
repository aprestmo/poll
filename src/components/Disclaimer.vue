<template>
  <details>
    <summary>
      <span class="visually-hidden">Informasjon om resultatene</span>
      <InfoIcon width="16" height="16" />
    </summary>
    <p>
      Resultatene viser hva DNs lesere har svart, og er ikke nødvendigvis representative for
      befolkningen i sin helhet.
    </p>
  </details>
</template>

<script setup>
import InfoIcon from '../assets/info.svg'
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

details {
  display: contents;

  summary {
    display: inline-flex;
    margin-inline-start: auto;

    &::marker {
      content: '';
    }
  }

  svg {
    cursor: pointer;
  }

  p {
    flex: 0 0 auto;
    font-size: var(--typography-editorial-infobox-body-min-font-size);
    line-height: var(--typography-editorial-infobox-body-min-line-height);
  }
}
</style>
