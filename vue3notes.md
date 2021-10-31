## Vue 3 Intro - notes

[Repo for Vue Mastery - Intro to Vue 3](https://github.com/Code-Pop/Intro-to-Vue-3/tree/final)

- `v-show="instock"` - v-show is an easy way to toggle visibility, renders as display:none when false
- `v-if-else` - Didn't know this was here
- `<li v-for="detail in details">{{ detail }}</li>` - Is this the way I do it, or is it more complicated?
- `<li v-for="(size, index) in sizes" :key="index">{{ size }}</li>` - key gives each dom element a unique key
- `<div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>`
- `v-on:click` = `@click`
- `:style="{ backgroundColor: variant.color }">` style binding - background-color becomes backgroundColor or 'background-color' in js
- `<img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">` class-binding

```
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        // solution
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        }
```
