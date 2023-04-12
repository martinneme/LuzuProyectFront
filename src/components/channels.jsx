import { Card } from "react-bootstrap";



function NavChannels() {

  return (  
    <Card className="navChannels">
     <Card className="containerChannels">
      <Card className="iconButton"><a href="https://www.youtube.com/c/luzutv"><i class="bi bi-youtube yt"></i></a></Card>
      <Card className="iconButton"><a href="https://twitch.tv/luzu_tv"><i class="bi bi-twitch twch"></i></a></Card>
      <Card className="iconButton"><a href="https://www.instagram.com/luzutv"><i class="bi bi-instagram ig"></i></a></Card>
      <Card className="iconButton"><a href="https://wa.me/1154740668"><i class="bi bi-whatsapp wpp"></i></a></Card>
     </Card>
    </Card>
  );
}

export default NavChannels;
