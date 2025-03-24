Auto-number paragraphs in Google Docs, as required by US Patent Office.

Given a document of

```
Heading A

para 1 ...

para 2

Heading B
```

Will become:

```
Heading A

1. para 1 ...

2. para 2 ...

Heading B
```

Skips all lists and headers. Highlight the text you want to number. Plays nicely with footnotes and formatting but there may be some formatting weirdness due to GDocs.

## Install

1. Open your document > Tools > Script editor...
2. Start a blank project
3. Paste the code from the `code.gs` file and save
4. Select Run > onOpen and authorise the script for the first time
5. Select Run > onOpen
5. Change to your Document and try the functions on the Paragraph tools custom menu created.
