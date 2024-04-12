import { useState } from "react";
import dynamic from "next/dynamic"; 

import './styles.css'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CustomQuill({value, onChange}: Props){
  return (
    <ReactQuill value={value} onChange={onChange} />
  )
}