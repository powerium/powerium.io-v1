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

To illustrate how `switch` statements are compiled differently from `if-else`
statements, consider the following assembly code:

> Compiler: x86-64 gcc 13.2
>
> Optimization: -O0

<iframe width="100%" height="600px" style="border: none;" src="https://godbolt.org/e?hideEditorToolbars=true#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGe1wAyeAyYAHI%2BAEaYxCAAzBqkAA6oCoRODB7evnrJqY4CQSHhLFEx8baY9vkMQgRMxASZPn5cFVXptfUEhWGR0XEJCnUNTdmtQ109xaUDAJS2qF7EyOwcAG6oeOgA1NiqmMheBJgQs9smAOxWFwAiJhoAgvcPG1vbAGJeDMhCAO6EyAQEGCBG2eDOlysj22MO2Cn%2BBEBwIhV2esPR21ESm2XBA52hGMJewORxOsxMsShD0JhIixEwTAA1hSqTTMUxsWY8Wi2bDiYdjqcWTzeds6QzmZSRRisZhtrFuQTRfzSUKpUreeKmcKNejZdtJIrqaLdvsBWSdcbRVrJayaQB6e3s7EAViNbMdGJVgvJ6qtGM96JtlvRlzujzDz2erx2n2%2BAEkqMDBGCUXaYXgqITgedYnc8zi06aST6WedbtLKtjM9scxT8zdtmYi96LZTy%2BH/VW5TW63n6/KW2bVb6LB3K7Rq1m%2Bw2DUOS22x5GNZ7u2Dp3hc7OXfPzWqlxWI4eHhx5rROC7eH4OFpSKhOG5rNY4YtlnLzLEeKQCJpT/NGSALoJOeHCSFev53pwvAKCACQ/jep6kHAsBIGgLCJHQ0TkJQaEYfQMTAFwsRmHwdDHMQMEQBEEERME9QAJ6cF%2BtHMMQ9EAPIRNoBzwV%2BaFsII7EMLQjEIaQWARF4wBuGIk5MbwWAsIYwDiGJ%2BD0g4eBrJgMFiZgw7HPJ5CCJUEG0HgdIMR4WAQQQxB4Cw8nzFQBjAAoABqeCYL87GJIwRn8IIIhiOwUgyIIigqOoYm6K0BhGCgT6WPoFkwZA8yoIk1S6QAtOxt6oNpxD2VgaWnG0PHpC4DDuJ4zT%2BDVUx9DErS5GkAijC0SQpO1DBNSU/TjJUlUCJ0Ix1WMFWaaNwzdMEvQDS1tizZ1egTA0/UzFw8wKK%2BKwSGeF7gWJ94cNsqgABwAGw5VdkjbMAyDIDisQAHRmLWuCECQ5xmJ%2Bsy8PBWizP%2BgHAZwYGkNeBVQbYsHfr%2BIP6JwZjHTDHCA4j8xFakziSEAA%3D%3D%3D"></iframe>

At first glance:

- When the number of branches is small (less than 5), the performance difference
  between `switch` and `if-else` is negligible. The generated assembly for both
  is almost identical, comparing each value against the constant values. In this
  scenario, `switch` statements are behaving similarly to `if-else` statements.

However, at the time the fifth branch gets uncommented, interesting things
occur:

- The compiler now generates a lookup table (`.L5`) for the `switch` statement.

- The new `switch` statement is compiled to a simple lookup (line 15) and jump
  (line 16) with a constraint check (line 12), which reduces the time complexity
  from `O(n)` to `O(1)`.

- The `if-else` statement continues to compare each value against the constant
  values, as it initially did.

Impressively, `switch` statements receive a significant performance boost!
Therefore, `switch` statements might be our choice when the branches don't have
hierarchical relationships, and the number of branches is large.

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
