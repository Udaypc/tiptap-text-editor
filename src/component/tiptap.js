import { useState } from "react";
import "./tiptap.css"
// TipTap
import { useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';

// Icons
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";

// define extension array
const extensions = [StarterKit,Underline,Highlight.configure({ multicolor: true })];

const content = 'Enter the text.................';

export const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  const[data,setData]=useState([{Title:"Example.title",Description:"Example.description"}]);
  const[title,setTitle]=useState("");

  const onChangetitle=(e)=>{
      setTitle(e.target.value);
  };
  const submit=()=>{
    setData([...data,{Title:title,Description:editor?.getText()}]);
  };

  

  if(!editor){
    return null;
  }
  return (
    <div className='bg-black text-white h-screen font-serif  bgContainer'>
      <div className="w-5/6">
        <h1 className='text-center text-4xl pt-5 mb-5'>Tiptap Rich Text Editor</h1>
        <div className='flex flex-col ml-36'>
          <label className='text-2xl'>Title</label>
          <input className='w-4/6 bg-black border-solid border border-white p-1' onChange={onChangetitle}/>
        </div>
        <h2 className='ml-36 mt-9'>Description</h2>
        <div className="mt-5 flex justify-around w-6/12 ml-36 text-base p-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <FaBold className='mr-3' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <FaItalic className='mr-3'  />
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
            >
              <FaHighlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            <FaUndo  className='mr-3'  />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            <FaRedoAlt className='mr-3'   />
          </button> 
          <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <FaUnderline className='mr-3'   />
          </button>
        </div>
        <EditorContent editor={editor} className='mt-5 ml-36 border-solid border border-white h-36 p-4 w-5/6'/>
        <button onClick={submit} className='bg-blue-700 border border-solid ml-36 mt-8 p-2 rounded-md'>Submit</button>
      </div>
      <ul className="ml-36 mt-5 border border-solid p-6 w-2/6 mr-5 mb-5 list-disc">
        {data.map((e)=>{
          return <li className="mb-3">
            <h1>{e.Title}</h1>
            <p> {e.Description}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Tiptap
