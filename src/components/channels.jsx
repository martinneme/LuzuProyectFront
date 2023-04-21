import { Card } from "react-bootstrap";



function NavChannels() {

  return (  
    <Card className="navChannels">
     <Card className="containerChannels">
      <Card className="iconButton"><a href="https://www.youtube.com/c/luzutv"><i className="bi bi-youtube yt"></i></a></Card>
      <Card className="iconButton"><a href="https://twitch.tv/luzu_tv"><i className="bi bi-twitch twch"></i></a></Card>
      <Card className="iconButton"><a href="https://www.instagram.com/luzutv"><i className="bi bi-instagram ig"></i></a></Card>
      <Card className="iconButton"><a href="https://wa.me/+541154740668"><i className="bi bi-whatsapp wpp"></i></a></Card>
     </Card>
    </Card>
  );
}

export default NavChannels;
