import { Card } from "react-bootstrap";
import BoxCenter from "./boxCenter";
import { useState, useEffect } from "react";
import { search } from "../find";
import NavChannels from "./channels";
import db from "../firebase/config.js";
import { collection, query, getDocs } from "firebase/firestore";
import FindComponent from "./findComponent";
import Spinner from "./spiner";

function Box() {
  const [data, setData] = useState(null);
  const [flagSearch, setFlagSearch] = useState(false);
  const [flagFetch,setFlagFetch] = useState(false);
  const [title, setTitle] = useState(null);
  const [wordlesArr, setWordlesArr] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const handleSearchValue = (nuevoValor) => {
    setTitle(nuevoValor);
    setFlagSearch(true);
    setFlagFetch(true);
    setShowSpinner(true);
  };

  useEffect(() => {
    if (wordlesArr.length > 0 && title) {
      const set = async () =>{
         setData(await search(wordlesArr, title) || { title: "Palabra o frase no encontrada", description: "" });
      setFlagSearch(true);
      setShowSpinner(false);
      }
     set();
    }
  }, [wordlesArr, title]);
  
  useEffect(() => {
   
    const fetchWordles = async () => {
      try {
        const data = query(collection(db, "definition"));
        const snapshots = await getDocs(data);
        if (snapshots.size === 0) {
          console.log("No hay productos");
        } else {
          const wordles = snapshots.docs.map((doc) => ({ ...doc.data() }));
          setWordlesArr(wordles);
        }
     
      } catch (e) {
        if (e.code === "resource-exhausted") {
          setShowCard(false);
          setIsVisible(true);
        }
      } finally {
        setFlagFetch(false);
      }
    };
  
    if (flagFetch) {
      fetchWordles();
    }
  }, [flagFetch]);
  
  return (
    <Card className="box">
    <Card className="boxCenter">
      <Card
        className="textTitle"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <p>Se alcanzo el limite gratuito, reintente mañana</p>
      </Card>
      {showSpinner ? (
        <Spinner />
      ) : flagSearch ? (
        <BoxCenter handleSearchValue={handleSearchValue} data={data} />
      ) : (
        <Card>
          <p
            style={{ display: showCard ? "block" : "none" }}
            className="textTitle"
          >
            Hola BOT, ¡busca la frase o término de Luzu que quieres conocer!
          </p>
        </Card>
      )}
      {showCard && (
        <FindComponent handleSearchValue={handleSearchValue} />
      )}
    </Card>
    <NavChannels />
  </Card>
  );
}

export default Box;
