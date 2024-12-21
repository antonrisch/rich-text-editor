export const defaultEditorContent = `
<h1>Welcome to the Editor</h1>

<p>This is a full-featured text editor built with Tiptap. Start typing to see it in action!</p>

<h2>Key Features:</h2>
<ul>
  <li>Rich text formatting - <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <code>code</code></li>
  <li><a href="https://www.google.com">Links and media embedding</a></li>
  <li>Multiple heading levels</li>
  <li>Lists and bullet points</li>
  <li>Code blocks with syntax highlighting:</li>
</ul>

<pre><code class="language-javascript">function greeting() {
  console.log("Hello world!");
}</code></pre>

<h3>Text Alignment Options</h3>
<p style="text-align: left">Left aligned text</p>
<p style="text-align: center">Center aligned text</p>
<p style="text-align: right">Right aligned text</p>

<h3>Blockquotes</h3>
<blockquote>
  This is a blockquote. Great for highlighting important information or quotes.
</blockquote>

<h3>Task Lists</h3>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true">Completed task</li>
  <li data-type="taskItem" data-checked="false">Pending task</li>
</ul>

<p>Feel free to edit this content or clear it to start fresh. Try selecting text to see the floating toolbar!</p>
`; 