## Benchmarks – Node.js

Below are the results while running this directory's suites on my machine with Node.js `v10.13.0`:

#### Mutable

> This is the default (and only) behavior

```
Validation:
  ✔ deep-set
  ✔ set-value
  ✔ lodash/set
  ✔ dset

Benchmark:
  deep-set     x 1,894,926 ops/sec ±2.51% (88 runs sampled)
  set-value    x 2,208,207 ops/sec ±2.79% (92 runs sampled)
  lodash/set   x 1,271,022 ops/sec ±1.34% (90 runs sampled)
  dset         x 2,217,614 ops/sec ±0.55% (96 runs sampled)
```

#### Immutable

> This combines `dset` with `klona`, as seen in the main README example

```
Validation:
  ✔ clean-set
  ✔ dset-klona

Benchmark:
  clean-set    x 2,631,929 ops/sec ±2.88% (89 runs sampled)
  dset-klona   x 1,950,732 ops/sec ±2.11% (92 runs sampled)
```
