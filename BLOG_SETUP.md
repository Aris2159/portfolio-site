# How to Add New Blog Posts

Follow these steps to add new blog posts to your portfolio:

## Step 1: Create a Markdown File
1. Go to the `blog/` folder
2. Create a new file with the format: `post-name.md`
   - Example: `my-first-post.md`
   - Use lowercase with hyphens (no spaces)

## Step 2: Write Your Content
Write your blog post in markdown format. Example:

```markdown
# My Blog Title

This is the introduction paragraph.

## Section 1
Content goes here...

## Section 2
More content...
```

**Markdown Syntax:**
- `# Heading 1` - Main title (appears in red)
- `## Heading 2` - Subheading
- `**bold text**` - Bold
- `*italic text*` - Italic
- `[link text](https://url.com)` - Links
- `- item` - Bullet list

## Step 3: Update posts.json
Open `posts.json` and add a new entry:

```json
{
    "slug": "my-first-post",
    "title": "My Blog Title",
    "description": "Brief description of the post",
    "date": "2026-05-28"
}
```

**Important:**
- `slug` must match your markdown filename (without .md)
- `title` will show on the blog list
- `date` format: YYYY-MM-DD
- Posts are sorted by date (newest first)

## Step 4: View Your Blog
1. Go to `blog.html`
2. Your new post should appear in the list
3. Click the title to read the full post
4. Click "← Back to Blog" to return to the list

## Example

If you create `blog/my-journey.md` with content, add this to `posts.json`:

```json
{
    "slug": "my-journey",
    "title": "My Journey",
    "description": "A story about my personal growth",
    "date": "2026-05-28"
}
```

That's it! Your blog is live! 🎉
