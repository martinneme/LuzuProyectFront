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
  const [isVisible, setIsVisible] = useState(false);
  const [showCard, setShowCard] = useState(true);



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
      try{
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
      }catch(e){
        if(e.code === "resource-exhausted"){
          setShowCard(false);
          setIsVisible(true);
        }
      }
    
      };
  
    if (flagSearch) {
      try{
        fetch(title);
      }catch(e){

      }
    }
   
  }, [title,wordlesArr]);



  return (
    <Card className="box">
         <Card className="boxCenter"> 
         <Card className="textTitle" style={{ display: isVisible ? 'block' : 'none' }}><a>Se alcanzo el limite gratuito, reintente mañana</a></Card>
     { flagSearch ? (
     <BoxCenter handleSearchValue={handleSearchValue} data={data}></BoxCenter>
     ):( <Card>
      <a style={{ display: showCard ? 'block' : 'none' }} className="textTitle">
          Hola BOT, ¡busca la frase o término de Luzu que quieres conocer!
        </a>
      </Card>) }
      {showCard && (  <FindComponent  handleSearchValue={handleSearchValue}></FindComponent>)}
     
       </Card>
      <NavChannels ></NavChannels>
    </Card>
  );
}

export default Box;
