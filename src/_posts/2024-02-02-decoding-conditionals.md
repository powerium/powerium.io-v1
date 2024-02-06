---
title: >-
  Decoding Conditionals: A Dive into `if-else`, `switch`, Lookup Tables, and
  Interfaces
authors: [powersagitar, adrian]
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

Next, let's delve into `switch` cases.

Once again,think about `switch`'s semantic meaning first. The `switch` statement
evaluates a given expression and, based on the evaluated value, it executes the
associated statements. It provides an easy way to dispatch execution to
different parts of code based on the value of the expression.

We have to agree that `switch` cases may work similar to `if` statements under
the hood, both generating a lookup table for the conditions, when they are
simple and involve checking a variable against a range of values. However, it's
also worth noting that this type of optimizations is highly dependent on the
specific compiler and the nature of the conditions, and is more commonly
associated with `switch` statements.

For instance,`x86-64 gcc 13.2` conducts such optimization when the flag is set
to `-O3`.

<iframe width="100%" height="600px" src="https://godbolt.org/e#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGIM6SuADJ4DJgAcj4ARpjEIADM8aQADqgKhE4MHt6%2B/ilpGQIhYZEsMXGJtpj2jgJCBEzEBNk%2BfgF2mA6Z9Y0ExRHRsQlJCg1NLbntY32hA2VDiQCUtqhexMjsHABuqHjoANQAYl4MXQJcEIsm8VYaAII7e0cnZwxml9e3D7sHx6e1DHiHxuJnuj1%2BLwBkmBX3Bz3%2BmQArDDQXdUXCAPLJWJMAEAdUICCEAHdCMgEBBQgR9qpFvsTAB2L77Fn7BSkgjk/YQWn0pmo1mC/aiJT7LggAVCqV/V4XK4g%2B5SqVRYiYJgAa0%2BkqlIsw%2BzMEsVSsFMoB73lzONrJVas1Cruxt1%2B3ihodVpZpsyQIt2qtNo1WqNOqYoskrvdHshmWhPqDftVAftjpDesR4YjnoEyNjbvd/rtlpZjIAIqiS2WwT99licfjCQBJKjYWhKSmCGl0xmF/Z4KhSnn0%2BKlodiumZhhywO5/bVUW97mqQfD4v6sdRgTmqeC2d6%2BcD67L51rhECb1b1k7nt9/dDg/7STH14x88sy97xcHu%2BIx8A7NTkscMstCcIivB%2BBwWikKgnBuNY1hsqs6x6uY8Q8KQBCaIByzqiAiIaAAdBokhmBoAAcACcABsZhSBoXCIuR%2BicJIvAsBIGgaKQ4GQdBHC8AoICcRhEGAaQcCwEgaAsMkdCxOQlBSTJ9BxMAXDxAENC0AQsQCRAUSYaQUShI0ACenBoUZzDECZGJRNonTCWhUlsIIGIMLQZkiaQWBRF4wBuGILbmbwWAsIYwDiF5%2BCql0WyYAJXmYKonReNpwXkII1QGbQeAqqZHhYAZBDEHgbHcKJVAGMACgAGp4JgxI1uBaH8IIIhiOwUgyIIigqOoXm6Fw%2BjhSgcGWPouUCZAyyoMkAIJQAtBi8S8KgcXECVWBTZcVQ1JkLgMO4nitHowSzKU5R6Kk6QAhMfhDddhQMP0F1DENHSvD04zHbk73VA53TTC9gxxO90x3Xooy9MD8yg8sCiIRsEhASBYEGbxNKkZRC2UZI%2BzAMgyBivE%2BFmNyuCECQ9JmKhiy8MJWiLNhICSOR%2BHkYiDLkVwGjxAypEMaRkhJMBHAsaQbE85x3GrZw/GCehmFM0xHBmGjXm8fTSvLOt6TOJIQA"></iframe>

And `x86 msvc v19.38` doesn't, when the flag is set to `/O2`.

<iframe width="100%" height="600px" src="https://godbolt.org/e#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGIM6SuADJ4DJgAcj4ARpjEIADM8aQADqgKhE4MHt6%2B/ilpGQIhYZEsMXGJtpj2jgJCBEzEBNk%2BfgF2mA6Z9Y0ExRHRsQlJCg1NLbntY32hA2VDiQCUtqhexMjsHABuqHjoANQAYl4MXQJcEIsm8VYaAII7e0cnZwxml9e3D7sHx6e1DHiHxuJnuj1%2BLwBkmBX3Bz3%2BmQArDDQXdUXCAPLJWJMAEAdUICCEAHdCMgEBBQgR9qpFvsTAB2L77Fn7BSkgjk/YQWn0pmo1mC/aiJT7LggAVCqV/V4XK4g%2B5SqVRYiYJgAa0%2BkqlIsw%2BzMEsVSsFMoB73lzONrJVas1Cruxt1%2B3ihodVpZpsyQIt2qtNo1WqNOqYoskrvdHshmWhPqDftVAftjpDesR4YjnoEyNjbvd/rtlpZjIAIqiS2WwT99licfjCQBJKjYWhKSmCGl0xmF/Z4KhSnn0%2BKlodiumZhhywO5/bVUW97mqQfD4v6sdRgTmqeC2d6%2BcD67L51rhECb1b1k7nt9/dDg/7STH14x88sy97xcHu%2BIx8A7NTkscMstCcIivB%2BBwWikKgnBuNY1hsqs6x6uY8Q8KQBCaIByzqiAiIaAAdBokhmBoAAcACcABsZhSBoXCIuR%2BicJIvAsBIGgaKQ4GQdBHC8AoICcRhEGAaQcCwEgaAsMkdCxOQlBSTJ9BxFsyDJMkAD6WxcORGnxKRGmqKRlF8HQBCxAJEBRJhpBRKEjQAJ6cGhdnMMQDkYlE2idMJaFSWwggYgwtBOSJpBYFEXjAG4Ygts5vBYCwhjAOIYX4KqXRbJgAlhZgqidF45nxeQgjVDZtB4CqjkeFgNkEMQeBsdwolUAYwAKAAangmDEjW4FofwggiGI7BSDIgiKCo6hhboXD6MlKBwZY%2BiVQJkDLKgyQAgJAD0GIBKgWXEA1WBrZcVQ1JkLgMO4nitHowSzKU5R6Kk6QAhMfhzW9hQMP0z1DHNHSvD04x3bkQPVD53TTP9gxxED0yfXooy9HD8wI8sCiIRsEhASBYE2bxNLGfsLAKKp%2BzaeR%2BH6dyuCECQ9JmKhiy8MJWiLNhICSDT5GIgy5FcBo8QMqRDGkZISTARwLGkGxwucdxvC8fxgnoZhXNMRwZiE2FqsayJWtHekziSEAA"></iframe>

{: .prompt-info }

> GCC -O3 enables nearly all optimizations that don't involve a space-speed
> tradeoff.  
> MSVC /O2 enables optimizations for maximum speed.

In general, it's best to choose between these two based on their semantic
meanings, and let the compiler handle the optimizations:

- `if` statements are best used when the branches have hierarchical
  relationships.

- `switch` statements are ideal when the branches don't have hierarchical
  relationships, and different actions are taken based on different conditions
  but not in a fallback manner.

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
