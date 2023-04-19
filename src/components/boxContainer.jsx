import { Card} from "react-bootstrap";
import BoxCenter from './boxCenter';
import { useState, useEffect } from "react";
import { search } from "../find";
import NavChannels from "./channels";
import db from "../firebase/config.js";
import { collection, query, getDocs } from "firebase/firestore";
import FindComponent from "./findComponent";

function Box() {
  const [data, setData] = useState(null);
  const [flagSearch, setFlagSearch] = useState(false);
  const [title, setTitle] = useState(null);
  const [wordlesArr, setWordlesArr] = useState([]);



  const handleSearchValue = (nuevoValor) => {
    setTitle(nuevoValor);
    setFlagSearch(true);
  };


  useEffect(() => {
    const notExist = {
      title: "Palabra o frase no encontrada",
      description: "",
    };
    const fetch = async (title) => {
      const data = query(collection(db, "definition"));
      const snapshots = await getDocs(data);
      if (snapshots.size === 0) {
        console.log("No hay productos");
      } else {
        const wordles = snapshots.docs.map((doc) => ({ ...doc.data() }));
        setWordlesArr(wordles);

   setWordlesArr ? setData(await search(wordlesArr, title)) : setData(notExist);
          data && setFlagSearch(true);
      }
      };
  
    if (flagSearch) {
      fetch(title);
    }
   
  }, [title,wordlesArr]);



  return (
    <Card className="box">
         <Card className="boxCenter"> 
     { flagSearch ? (
     <BoxCenter handleSearchValue={handleSearchValue} data={data}></BoxCenter>
     ):( <Card>
      <a className="textTitle">
          Hola BOT, ¡busca la frase o término de Luzu que quieres conocer!
        </a>
      </Card>) }
       <FindComponent handleSearchValue={handleSearchValue}></FindComponent>
       </Card>
      <NavChannels ></NavChannels>
    </Card>
  );
}

export default Box;
