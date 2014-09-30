sizify
========

A small script to add classes to the body depending on the client width

This small script helps to handle different client widths. You can define client widths and appropriate class names to be added to the body. This can be useful to handle different browser widths with __CSS__ or __JavaScript__.

The classes get automatically updated when the window gets resized.

The script creates the method sizify which accepts an optional parameter (object) which sets up the widths and classes to be used.

The defaults (used when no parameter is given) is following object
```
{
  small: 800,
  medium: 1280,
  default: null
}
```

This means, that on a client with a width less or equal than 800 the body gets the class 'small', clients with a width from 801 to 1280 get the class medium and all widths above have no extra class set.

Example:
========
```
# the default values get enabled
sizify(); 


#clients from 0 to 600 => class 'foo'
#clients from 601 to 1200 => class 'bar'
#clients from 1201 to 1600 => class 'baz'
#clients above 1600 => class 'my-default'
sizify ({
  foo: 600,
  bar: 1200,
  baz: 1600,
  default: 'my-default-class'
});
```
Remark:
=======
When the 'default' option value is null and the class attribute on the body is empty, then the class attribute gets removed.
