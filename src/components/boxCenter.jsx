import { Card } from "react-bootstrap";
import FindComponent from "./findComponent";
import { useState, useEffect } from "react";
import { search } from "../find";
import NavChannels from "./channels"

function BoxCenter() {

  const [data, setData] = useState(null);
  const [flagSearch, setFlagSearch] = useState(0);
  const [title,setTitle] = useState(null);

  const handleSearchValue = (nuevoValor) => {
    setTitle(nuevoValor);
    setFlagSearch(1);
  };


  useEffect(() => {
    if(flagSearch){
 const fetchData = async () => {
      const response = await fetch('http://localhost:8080/products');
      const jsonData = await response.json();
const Notexist ={
  title:"Palabra o frase no encontrada",
  description:""
}
console.log(jsonData)
const frase =  await search(jsonData,title)
// const frase = await jsonData.find(frase=>frase?.title?.toUpperCase() === title?.toUpperCase());
//  const frase = await jsonData.filter(frase=>frase.title.includes(title?.toUpperCase()));
  console.log(frase)
        frase ? setData(frase) : setData(Notexist) ;
    };
     fetchData();
    }
   
  }, [title]);
  

  return (  
    <Card className="boxCenter">
      {flagSearch ? ( <> <Card className="textTitle">
  <h3>Frase:</h3>
  {data && data.title} 
 </Card>
 <Card className="textDescription">
  <h3>Explicación:</h3>
  {data && ( <a>{data.description+" "}</a> )}
  { data?.url && <a className="link" href={data.url}> - link al material -</a> }
 </Card>
    
    </>):(<a className="textTitle">Hola BOT, ¡busca la frase o término de Luzu que quieres conocer!</a>) }
    <FindComponent handleSearchValue={handleSearchValue}></FindComponent>
    <NavChannels></NavChannels>
    </Card>
  );
}

export default BoxCenter;
