"use client";
import { useState, useEffect } from "react";
import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical";
import { $createQuoteNode } from "@lexical/rich-text";
import { $patchStyleText, $getSelectionStyleValueForProperty } from "@lexical/selection";
import {
  MDXEditor,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  frontmatterPlugin,
  diffSourcePlugin,
  quotePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  StrikeThroughSupSubToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  InsertAdmonition,
  InsertFrontmatter,
  Separator,
  DiffSourceToggleWrapper,
  useCellValues,
  activeEditor$
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

function getTopLevelElement(selection) {
  const anchorNode = selection.anchor.getNode();
  return anchorNode.getKey() === "root"
    ? anchorNode
    : anchorNode.getTopLevelElementOrThrow();
}


function QuoteToggle() {
  const [activeEditor] = useCellValues(activeEditor$);
  const [isQuote, setIsQuote] = useState(false);

  
  useEffect(() => {
    if (!activeEditor) return;
    return activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        try {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setIsQuote(getTopLevelElement(selection).getType() === "quote");
          }
        } catch (err) {
          
        }
      });
    });
  }, [activeEditor]);

  const toggleQuote = () => {
    if (!activeEditor) return;
    activeEditor.update(() => {
      try {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const topNode = getTopLevelElement(selection);
        const currentlyQuote = topNode.getType() === "quote";

        const newNode = currentlyQuote ? $createParagraphNode() : $createQuoteNode();
        const children = topNode.getChildren();
        children.forEach((child) => newNode.append(child));
        topNode.replace(newNode);
        newNode.selectEnd();
      } catch (err) {
        console.error("Quote toggle failed:", err);
      }
    });
  };

  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={toggleQuote}
      title="Quote"
      className={isQuote ? "mdx-quote-btn active" : "mdx-quote-btn"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        border: "none",
        borderRadius: "4px",
        background: isQuote ? "#f0e4cc" : "transparent",
        cursor: "pointer",
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        fontSize: "30px",
        color: isQuote ? "#c9a96e" : "#555",
        lineHeight: 1,
      }}
    >
      ❝
    </button>
  );
}

// NEW: # (Hashtag) toggle button — click to style the selected text like a
// hashtag chip (rounded background + colored bold text). The surrounding
// block always stays a plain paragraph (<p>), it never becomes a heading.
function HashtagToggle() {
  const [activeEditor] = useCellValues(activeEditor$);
  const [isHashtag, setIsHashtag] = useState(false);

  useEffect(() => {
    if (!activeEditor) return;
    return activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        try {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const bg = $getSelectionStyleValueForProperty(selection, "background-color", "");
            setIsHashtag(bg === "#f0e4cc");
          }
        } catch (err) {
          
        }
      });
    });
  }, [activeEditor]);

  const toggleHashtag = () => {
    if (!activeEditor) return;
    activeEditor.update(() => {
      try {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        // make sure the block itself is a plain paragraph, not a heading/quote
        const topNode = getTopLevelElement(selection);
        if (topNode.getType() !== "paragraph") {
          const newNode = $createParagraphNode();
          const children = topNode.getChildren();
          children.forEach((child) => newNode.append(child));
          topNode.replace(newNode);
        }

        const currentBg = $getSelectionStyleValueForProperty(selection, "background-color", "");
        const alreadyHashtag = currentBg === "#f0e4cc";

        $patchStyleText(
          selection,
          alreadyHashtag
            ? {
                "background-color": null,
                color: null,
                padding: null,
                "border-radius": null,
                "font-weight": null,
              }
            : {
                "background-color": "#f0e4cc",
                color: "#a1750f",
                padding: "2px 8px",
                "border-radius": "999px",
                "font-weight": "600",
              }
        );
      } catch (err) {
        console.error("Hashtag toggle failed:", err);
      }
    });
  };

  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={toggleHashtag}
      title="Hashtag style"
      className={isHashtag ? "mdx-hashtag-btn active" : "mdx-hashtag-btn"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        border: "none",
        borderRadius: "4px",
        background: isHashtag ? "#f0e4cc" : "transparent",
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: "bold",
        fontSize: "16px",
        color: isHashtag ? "#a1750f" : "#555",
        lineHeight: 1,
      }}
    >
      #
    </button>
  );
}

export default function MDXEditorComponent({
  onChange,
  initialContent = ""
}) {

  async function imageUploadHandler(file) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/api/blogs/upload-image`, {
      method: 'POST',
      body: formData
    });
    const json = await response.json();
    return json.url;
  }

  return (
    <MDXEditor
      markdown={initialContent || ""}
      onChange={onChange}
      className="mdxeditor-root"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', html: 'HTML' } }),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        frontmatterPlugin(),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <StrikeThroughSupSubToggles />
              <Separator />
              <QuoteToggle />
              <HashtagToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
              <InsertCodeBlock />
              <InsertAdmonition />
              <Separator />
              <InsertFrontmatter />
            </DiffSourceToggleWrapper>
          )
        })
      ]}
    />
  );
}