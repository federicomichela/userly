# [Userly](https://github.com/federicomichela/userly/projects/1)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Project overview
Userly UI is composed by a theme picker, and a carousel in charge
of displaying Users cards.

The number of cards showing it's dynamically calculated based on the
browser window size.

Users are queried in pages and number of cards in a page.
Queries are handled from the CommsService which also handles caching and data formatting.
(NOTE: currently cache ETA is very small to allow easy functionality demonstration).

A user card consists in a dynamic set of components, each corresponding
to a group of user's information. This architecture allows for more flexibility
making it easy to add / remove informations from a UserCard.