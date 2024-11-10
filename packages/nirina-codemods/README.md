


## Example
This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  data: () => ({ message: 'Hello' }),
};
```

### After

```ts
const message = ref('Hello');
export default {};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  data: () => ({ isActive: true }),
};
```

### After

```ts
const isActive = ref(true);
export default {};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  data: () => ({ items: [1, 2, 3] }),
};
```

### After

```ts
const items = ref([1, 2, 3]);
export default {};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  data: () => ({
    count: 0,
    message: 'Hello',
    isActive: true,
    items: [1, 2, 3],
  }),
};
```

### After

```ts
const items = ref([1, 2, 3]);
const isActive = ref(true);
const message = ref('Hello');
const count = ref(0);

export default {};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  methods: {
    displayCoucou: function() {
      // the content isn't relevant
      console.log('coucou');
    },
  },
};
```

### After

```ts
export default {
  methods: {
    displayCoucou: function() {
      // the content isn't relevant
      console.log('coucou');
    },
  },
};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
// convert vue2 script component into vue 3 setup
export default {
  methods: {
    fetchApi: async function() {
      const request = await fetch('/request/info');
    },
  },
};
```

### After

```ts
// convert vue2 script component into vue 3 setup
export default {
  methods: {
    fetchApi: async function() {
      const request = await fetch('/request/info');
    },
  },
};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
export default {
  data: () => ({ count: 0 }),
  methods: {
    increment: function() {
      this.count += 1;
    },
  },
};
```

### After

```ts
const count = ref(0);
export default {
  methods: {
    increment: function() {
      this.count += 1;
    },
  },
};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
export default {
  data: () => ({ count: 0 }),
  methods: {
    increment: async function() {
      this.count = await (await fetch('/request')).json();
    },
  },
};
```

### After

```ts
import { ref } from 'vue';
const count = ref(0);

export default {
  data: () => ({ count: 0 }),
  methods: {
    increment: async function() {
      this.count = await (await fetch('/request')).json();
    },
  },
};
```

