import { Card } from "react-bootstrap";
import FindComponent from "./findComponent";
import { useState, useEffect } from "react";
import { search } from "../find";
import NavChannels from "./channels";
import db from "../firebase/config.js";
import { collection, query, getDocs } from "firebase/firestore";

function BoxCenter() {
  const [data, setData] = useState(null);
  const [flagSearch, setFlagSearch] = useState(0);
  const [title, setTitle] = useState(null);
  const [wordlesArr, setWordlesArr] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearchValue = (nuevoValor) => {
    setTitle(nuevoValor);
    setFlagSearch(1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const notExist = {
      title: "Palabra o frase no encontrada",
      description: "",
    };
    const fetch = async () => {
      const data = query(collection(db, "definition"));
      getDocs(data).then((snapshots) => {
        if (snapshots.size === 0) {
          console.log("No hay productos");
        } else {
          setWordlesArr(snapshots.docs.map((doc) => ({ ...doc.data() })));
        }
      });

    };
    const fetchSearchResult = async (title) => {
      await fetch();
      const frase = await search(wordlesArr, title);
      frase ? setData(await frase)  : setData(notExist);
    };
  
    if (flagSearch) {
      fetchSearchResult(title);
    }

    data && setLoading(false);
  }, [title]);

  return (
    <Card className="boxCenter">
      {flagSearch  ? (
        <>
          {" "}
          <Card className="textTitle">
            <h3>Frase:</h3>
            {data && data.title}
          </Card>
          <Card className="textDescription">
            <h3>Explicación:</h3>
            {data && <a>{data.description + " "}</a>}
            {data?.url && (
              <a className="link" href={data.url}>
                {" "}
                - link al material -
              </a>
            )}
          </Card>
        </>
      ) : (
        <a className="textTitle">
          Hola BOT, ¡busca la frase o término de Luzu que quieres conocer!
        </a>
      )}
      <FindComponent handleSearchValue={handleSearchValue}></FindComponent>
      <NavChannels></NavChannels>
    </Card>
  );
}

export default BoxCenter;
