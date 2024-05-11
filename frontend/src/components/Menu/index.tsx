import { CustomButton } from "../CustomButton";
import { useState} from "react";

const categories = ['Front-End', 'Backend', 'Mobile', 'Dev Ops', 'Bando de Dados', 'Cloud', 'Segurança', 'IA', 'Outros']

export function Menu() {
 


  const [category, setCategory]= useState<string>('')

  function handleCategory(category: string){
    setCategory(category)

  }
  console.log(category)
  return (
    <div className="mr-5 flex items-center flex-col gap-5">
      <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-center">  
         {categories.map((category) => {
          return (
            <p onClick={() => handleCategory(category)}> {category} 

            </p>
          )
         })}
      </div>
    </div>
  );
}
