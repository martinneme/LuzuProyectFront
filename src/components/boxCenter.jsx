import { useEffect,useState } from "react";
import { Card } from "react-bootstrap";

function BoxCenter(props) {

  const { data } = props;
  const [flag, setFlag] = useState(false);


useEffect(() => {
  data && setFlag(true);
}, [data]);

  return (
<>   
    { flag ? ( <><Card className="definition">
        <h3>Frase:</h3>
        {data && data.title}
      </Card><Card className="textDescription">
          <h3>Explicación:</h3>
          {data && <a>{data.description + " "}</a>}
          {data?.url && (
            <a className="link" href={data.url}>
              {" "}
              - link al material -
            </a>
          )}
        </Card></>):(<Card className="textTitle"></Card>)}
         
</>
  );
}

export default BoxCenter;
