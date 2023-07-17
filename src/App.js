import { Container } from "react-bootstrap";
import ComandaList from "./components/ComandaList";
import NavBar from "./components/NavBar";
import { useState } from "react";


function App() {
  const [visibleList, setVisibleList] = useState(false)
  const showList = () => setVisibleList(!visibleList)
  return (
    <div>
      <NavBar onClick={() => showList()} />
      <Container >
        <ComandaList displayList={visibleList} />
      </Container>

    </div>
  );
}

export default App;
