import { useState } from "react";
import dynamic from "next/dynamic"; 

import './styles.css'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


export function CustomQuill(){
  const [text, setText] = useState("");

  const handleChange = (value: any) => {
    console.log("value: ", value);
    setText(value);
  };

  return (
    <ReactQuill value={text} onChange={handleChange} />
  )
}