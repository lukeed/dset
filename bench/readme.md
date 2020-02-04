## Benchmarks – Node.js

Below are the results while running this directory's suites on my machine with Node.js v10.13.0:

#### Mutable

> This is the default (and only) behavior

```
Validation:
  ✔ deep-set
  ✔ set-value
  ✔ lodash/set
  ✔ dset

Benchmark:
  deep-set     x 4,130,930 ops/sec ±2.30% (92 runs sampled)
  set-value    x 4,905,191 ops/sec ±3.03% (91 runs sampled)
  lodash/set   x 2,566,991 ops/sec ±0.99% (95 runs sampled)
  dset         x 4,191,060 ops/sec ±0.24% (95 runs sampled)
```

#### Immutable

> This combines `dset` with `klona`, as seen in the main README example

```
Validation:
  ✔ clean-set
  ✔ dset-klona

Benchmark:
  clean-set    x 5,771,347 ops/sec ±0.23% (96 runs sampled)
  dset-klona   x 3,726,300 ops/sec ±1.53% (93 runs sampled)
```
