
# Prose Components

<h2 class="text-primary">Links</h2>

[Nuxt Content](https://content.nuxt.com)

<h2 class="text-primary">Blockquotes</h2>

> Nuxt Content is a module for Nuxt that provides a simple way to manage content for your application. It
> allows developers to write their content in Markdown, YAML, CSV or JSON files and then query and display it in their
> application.

<h2 class="text-primary">Code</h2>

Code blocks use `code` and `pre` tags.

```vue
<template>
  <code>
    <slot/>
  </code>
</template>

<script setup lang="ts">
  defineProps<{
    language?: string
    filename?: string
    highlights?: number[]
  }>()
</script>
```

<h2 class="text-primary">Text Styles</h2>

**Bold** 

*Italics* 

***Bold and Italics***

<h2 class="text-primary">Paragraphs</h2>

Nuxt Content is a module for Nuxt that provides a simple way to manage content for your application. It 
allows developers to write their content in Markdown, YAML, CSV or JSON files and then query and display it in their 
application. <Tooltip text="A short explanation for this term">term</Tooltip>

<h2 class="text-primary">Headings</h2>

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<h2 class="text-primary">Images</h2>

![Nuxt Logo](/images/logo-green-white.png "Nuxt Content")

<h2 class="text-primary">Lists</h2>

- Nuxt Content
- Nuxt Eslint
- Nuxt i18n
- Nuxt Test Utils
- Nuxt Quasar UI

<h2 class="text-primary">Tables</h2>

| Package        | Status  | Version |
| -------------- | ------- | ------- |
| Nuxt Content   | Stable  | 2.9.0   |
| Nuxt i18n      | Beta    | 8.0.0   |
| Nuxt ESLint    | Stable  | 1.5.2   |

<h2 class="text-primary">Tooltips</h2>

