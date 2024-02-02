---
title: >-
  Decoding Conditionals: A Dive into `if-else`, `switch`, Lookup Tables, and
  Interfaces
categories: [Programming, Software Design]
tags: [fundamentals, c++]
---

Have you ever been confused about when to use `if-else` statements, `switch`
cases, or other conditionals in your code? This article may help you to clarify
your thoughts.

## Understanding `if-else` Statements

`if-else` statements are fundamental constructs in nearly all programming
languages. But when should we prefer `if`, `else if`, and `else` statements?
Let's explore their semantic meanings before considering performance
implications.

- `if` blocks are executed only when condition evaluates to `true`.

- `else if` blocks are executed only when the condition evaluates to `true` and
  all preceding `if` or `else if` conditions have evaluated to `false`.

- `else` blocks serve as a fallback or default case, executed when no preceding
  condition has evaluated to `true`.

From this, we can observe that `if-else` statements are designed to handle
branching logic that requires evaluation of conditions. More specifically, they
handle conditions that have a hierarchical relationship, as `else if` statements
are equivalent to nested `if` statements within `else` blocks.

```cpp
if (condition1) {
    // Your magic
} else {
    if (condition2) {
        // Your other magic
    }
}
```

In terms of performance, modern processors employ branch prediction mechanisms.
However, when these mechanisms fail to predict the correct branch, the program
can suffer a significant performance penalty, leading to increased time
complexity.

Therefore, we can conclude that `if-else` statements may not be the optimal
choice in scenarios where conditions do not require a fallback logic.

## Exploring `switch` Cases

Next, let's delve into `switch` statements. As described by
[Wikipedia contributors](<https://en.wikipedia.org/wiki/Conditional_(computer_programming)>):

> Switch statements (in some languages, _case statements_ or multiway branches)
> compare a given value with specified constants and take action according to
> the first constant to match. There is usually a provision for a default action
> ('else', 'otherwise') to be taken if no match succeeds. Switch statements can
> allow compiler optimizations, such as lookup tables. In dynamic languages, the
> cases may not be limited to constant expressions, and might extend to pattern
> matching...

While `switch` statements might seem very different from `if-else` statements,
they work similarly under the hood.

> Compiler: x86-64 gcc 13.2
>
> Optimization: -O3

<iframe width="800px" height="200px" src="https://godbolt.org/e#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGIMwCspK4AMngMmAByPgBGmMT%2BGqQADqgKhE4MHt6%2B/kGp6Y4CYRHRLHEJZkl2mA6ZQgRMxATZPn6Btpj2RQwNTQQlUbHxibaNza25HQrjA%2BFD5SNVAJS2qF7EyOwc5gDM4cjeWADUJrtuyDP4gmfYJhoAgvcP4QTHVF4MdQJcEMtnVker3en2%2BDDMfwBz2BHy%2BPV2kN2gJeghBcMykkRyOhqNQyXiTB6AH0AO6EBBEhRkgjIBAQYGqZanADsyOO7OOVMItIgjJZbI5gtESmOXBAz0Fko5sLBv3%2BSIlUslMWImCYAGsoY8lcdhZhjmZxdqddLQT0IfKBSbjiq1ZqFcapXrjrsjQ9reyZfCsYrrbaNVr3UrnZI3R60WDMZbfSb/farSyACLPEzM5OPZ5eV4ADiJbzxBOJ1IpeCoRK6SggWcEubefNTCdLvNOu2TrdFTK9mTlgcFFf1TdULbbiYNnbNmQtvY5/eOg%2BHZ1Hu3H6IECOjjuOs/ni8Xx0kK8jPozaY4q1onACvD8HC0pFQnDc1msnPWm31ex4pAImjPq3VIABBoAB0GiSFU2YAJwAGxmFIGhcAEkH6Jwki8CwEgaEkN53g%2BHC8AoIBJD%2Bt5nqQcCwEgaAsMkdDxOQlDUbR9AJMAXC7GYfB0AQ8SERAMS/qQMThE0ACenBfsJzDEKJADyMTaLUJFftRbCCLJDC0OJpGkFgMReMAbhiLQhHcLwWAsIYwDiDp%2BCqnUABumCmXemCqLUXg8RJvCvF0gm0HgKpiR4WCCQQxB4BhZmrFQBjAAoABqeCYCSsn4jeX78IIIhiOwUgyIIigqOoOm6Fw%2BhWSgz6WPogWEZAqx4j0pkALSybsvCoE5xARVg9V/J03SZC4DDuJ4bR6KE8xlBUegFBkAiTH45XzT0gwzSM5U1GCfQTONuRbV0Sn1LM63DAkW2zEtegzP0Z2LBdqwKG%2BWwSOel7XoJeHHKo2bQS10GSMcwDIMgoq7MBZjHBAuCECQpxmLsXDLLwJFaMs/4gJIkHAZBATMpBXAaLszLZkh2aSLsKEcGhpAYUT2FfZwBFEd%2Bv4Y9TZifTpeGo%2BzqzdekziSEAA%3D%3D"></iframe>

When the number of branches is small (less than 5), the performance difference
between `switch` and `if-else` is negligible. The generated assembly for both is
identical, comparing each value against the constant values. In this scenario,
`switch` statements are behaving similarly to `if-else` statements.

However, consider this next snippet:

<iframe width="800px" height="200px" src="https://godbolt.org/e#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGIAMz%2BpK4AMngMmAByPgBGmMQBQQAOqAqETgwe3r6JpClpjgJhEdEscQmBtpj2hQxCBEzEBFk%2BfpV2mA4Z9Y0ExVGx8bkKDU0tOe2jfeEDZUOBAJS2qF7EyOwc5v7hyN5YANQm/m7II/iCR9gmGgCC1zfhBPtUXgxdAlwQC0dWt4/Pr3eDDMXx%2B93%2BLzetX8oP8vweggBUIyklh8IhgNqAFY0fdwYjUEl4kxagB9ADuhAQpIUlIIyAQEH%2BqgWhwA7PD9lz9rTCAyICz2ZzuSLREp9lwQPcRTLuZCgZ9vnDpbKZTFiJgmABrMG3VX7MWYfZmKV6/VyzEZEFK4Xm/bqzU65Vm2WG/b%2BU03O1c%2BXQ3Eu80O7W6r2qt2ST3epFA1E2lV2oNO20yt1YyPe30ZHFxgMmNkAETxBbxty8jwAHKSnoTiWS6dS8FRSdUlBAy4JK09BXnk42BYd/IXBxLWZmPv7Q1yW0a%2B6oB0P88bR5aBNaQyLp/tZ/Ojov/MvkQIYTnJ/tN9vd7v9pIDzGJxvaOKL4Or1jb9iJ3n8xwlrROFjeD8DgtFIVBODcaxrB5FY1iNLYeFIAhNB/JYtRALENAAOg0SQzA0csAE4ADYzCkDQuCxAj9E4SReBYCQNA0UggJAsCOF4BQQCYpDgJ/Ug4FgJA0BYJI6HichKGE0T6ASYAuH8Mw%2BDoAh4k4iAYmQ0gYnCRoAE9OAQ7TmGIXSAHkYm0ToeIQ4S2EEUyGFofTeNILAYi8YA3DER8DN4LAWEMYBxBc/ANS6AA3TBOJczBVE6LwVN88hBGqTTaDwdU9I8LBNIIYg8Ho7g%2BKoAxgAUAA1PBMHJUyiSAhD%2BEEEQxHYKQZEERQVHUFzdC4fRApQSDLH0DLOMgJZCVqaKAFpTP8XhUEi4h8qwMaviqGoMhcBh3E8Vo9FCGZSnKPR8nSARxj8PqztqfpjqGPqOiBHoxj2nJHuqKzuimO7BgSR6pkuvQRl6X65n%2BpYFBg9YJF/f9AM0tj9lUcsiOmojJH2YBkGQCV/Ewsx9ggXBCBIQ4zH8LgFl4HitAWVCQEkAjMIIrE2QIrgNH8Nly0o8tJCCP8OFo0h6M5piWIWzgOK4xDkPp6iODMBGXLYmn5aWJa0mcSQgA%3D"></iframe>

The compiler now generates a lookup table (`.L4` for the `switch`, `.L14` for
the `if-else`) for both statements. As you can see, the compiler was able to
determine that the two constructs have the same behavior, and thus optimized
both into lookup tables.

## Embracing Lookup Tables

As observed, the lookup table derived from `switch` statements boasts an `O(1)`
time complexity, which is ideal. However, not all types of variables can be used
in the condition of a `switch` statement. For instance, in C++, the condition
only accepts integral and enumeration types, as well as types that can be
implicitly converted to these two, as stated in the
[C++ reference](https://en.cppreference.com/w/cpp/language/switch). So, what
happens when this is the case?

The solution is quite straightforward -- if the compiler doesn't generate a
lookup table, we implement it ourselves. The following snippet demonstrates how
to use a lookup table in conjunction with `std::unordered_map`.

```cpp
int Handler1(int argc, char **argv) {}
int Handler2(int argc, char **argv) {}

int main(int argc, char **argv) {
    std::unordered_map<std::string_view, int (*)(int, char**)> lookup_table = {
        {"command1", Handler1},
        {"command2", Handler2},
    };

    if (argc < 2) {
        return EX_USAGE;
    }

    try {
        int error_code = lookup_table.at(argv[1])(argc, argv);
        // Handle the error code
    } catch (std::out_of_range &exception) {
        // Handle the exception
        return EX_USAGE;
    }

    return EX_OK;
}
```

In C++, `std::unordered_map` is typically implemented as a hash table and
thereby offering an average time complexity of `O(1)`, which is fundamentally
identical to the lookup table generated by the compiler.

Thus, custom lookup tables appear to be a viable alternative to `switch`
statements where they are not applicable.

## The Power of Interfaces

We've explored various conditionals and observed that `switch` statements and
lookup tables can be effective when dealing with a large number of branches.
However, they are not a panacea. Consider scenarios where:

- The logic frequently changes.

- There are many related types of objects.

- The code needs to be decoupled.

- Adherence to the Open/Closed Principle is desired.

In such cases, interfaces come into play. As a reminder, still from the
[Wikipedia contributors](<https://en.wikipedia.org/wiki/Interface_(object-oriented_programming)>):

> An interface or protocol type is a data type that acts as an abstraction of a
> class. It describes a set of method signatures, the implementations of which
> may be provided by multiple classes that are otherwise not necessarily related
> to each other.

Let's see how interfaces can help with an example.

Instead of this:

```cpp
enum class HandlerType {
    Handler1,
    Handler2,
} handler_type = HandlerType::Handler1;

void Execute(int some_arg) {
    switch (handler_type) {
        case HandlerType::Handler1:
            // Your magic
            break;
        case HandlerType::Handler2:
            // Your other magic
            break;
    }
}
```

Consider this:

```cpp
class Interface {
public:
    virtual ~Interface() = default;
    virtual void Execute(int some_arg) = 0;
};

class Handler1 : public Interface {
public:
    void Execute(int some_arg) override {
        // Your magic
    }
};

class Handler2 : public Interface {
public:
    void Execute(int some_arg) override {
        // Your other magic
    }
};

void CallExecute(Interface &handler, int some_arg) {
    handler.Execute(some_arg);
}

int main() {
    Handler1 handler1;
    CallExecute(handler1, 1);
    return EX_OK;
}
```

The benefits are clear:

- The large `switch` statement is eliminated, making the code more readable and
  maintainable.

- The new pattern adheres to the Open/Closed Principle. When a new case arises,
  we simply add an implementation class instead of modifying existing logic.

Therefore, in scenarios where multiple types of objects share a common interface
but require different actions, this approach is more suitable and scalable than
using `if-else` or `switch` statements. This is also a fundamental technique in
object-oriented programming.

## Summary

In conclusion, there is no universal solution when it comes to choosing
conditionals. The most suitable option depends on the specific circumstances at
hand. However, here's a quick reference guide:

- Use `if-else` statements when the branches have hierarchical relationships.

- Opt for `switch` statements and lookup tables when the branches don't have
  hierarchical relationships, and different actions are taken based on different
  conditions, but not in a fallback manner.

- Employ interfaces when dealing with a large number of related types of
  objects, and when the code needs to be decoupled and adhere to the Open/Closed
  Principle.

Remember, the key is to consider the specific situation and choose the most
appropriate option.

---

Thank you for taking the time to read! If you have any questions, concerns, or
if you spot any issues, please feel free to leave a comment below. Your feedback
is greatly appreciated.
