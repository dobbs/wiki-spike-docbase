# Reservations

Sigh. I'm already second-guessing this idea.

Wiki farms are a powerful idea. It invites authors to make small,
focused wikis. Coupled with powerful ideas like a docbase, these could
become small, purposeful wiki workflows for vernacular programming.

With the cleverness of wiki's full-text search, a small, purposeful
wiki can also make for useful personal search strategies.

The wiki super collaborator is another inspiration where interesting
things emerge when we have some control over combining small,
purposeful namespaces.

But farms are also a source of challenges for wiki hosting. DNS and
TLS certificates combine to make server management quite complex.

# Local Development

    python3 -m http.server

OR

    file_server --cors .

# What is a Docbase?

Docbase is a term I learned from Jon Udell. In 1999 O'Reilly published
his book [Practical Internet
Groupware](https://www.oreilly.com/library/view/practical-internet-groupware/1565925378/).
Tim O'Reilly wrote a glowing forward which, among other things,
claimed "Jon has laid his finger on the most important change in the
computer industry since the introduction of the Web. Especially in the
later chapters of the book, he lays out a vision in which web sites
themselves can be considered as reusable software components. The
implications of this paradigm shift are truly astonishing. I
confidently predict that in the years ahead, the methodologies Jon
demonstrates in this book will be the foundation of multibillion
dollar businesses and whole new schools of software development."

It was a remarkable vision, but the Internet followed a different path
to those multibillion dollar businesses.

Here's a description of what we might do with a single document.

> When you need to store and display a modest amount of structured or
> semistructured data, it's tempting to store it directly in an HTML
> file. I've used this strategy many times; undoubtedly you have
> too. The advantages and disadvantages of working directly with a
> presentation format are pretty clear. It's handy that the "database"
> is a self-contained package that can be updated using any text
> editor, emailed, read directly from a file system, or served by any
> web server. But it's awkward to share the work of updating with
> other people or to isolate and edit parts of the file as it
> grows. When we convert to a database-backed web application in order
> to solve these problems, we trade away the convenience of the
> file-oriented approach. Can we have our cake and eat it too? This
> month's column explores the idea that a complete web application can
> be wrapped around an XHTML document, using XSLT for search, insert,
> and update functions.

Jon Udell, 2003, [The Document is the
Database](https://www.xml.com/pub/a/2003/07/09/udell.html)
