import "./App.css";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

function App() {
  const [dog, setDog] = useState([]);
  const [selectedDog, setSelectedDog] = useState("");
  const [image, setImage] = useState([]);
  useEffect(() => {
    var URL = "https://dog.ceo/api/breeds/list/all";

    Axios.get(URL)
      .then((res) => {
        for (var a in res.data.message) {
          if (res.data.message[a].length != 0)
            for (var b of res.data.message[a]) dog.push(a + "/" + b);
          else dog.push(a);
          setDog((prev) => [...dog]);
        }
      })
      .then((e) => {
        setSelectedDog(dog[0]);
        loadImage(dog[0]);
      });
  }, []);

  function loadImage(selectedDog) {
    var URL = `https://dog.ceo/api/breed/${selectedDog}/images`;

    Axios.get(URL).then((res) => {
      setImage((prev) => [...res.data.message]);
      console.log(image);
    });
  }

  return (
    <Container fluid>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>DOG IMAGES</h1>
      <Row className="dropdown">
        <Col>
          <Form>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setSelectedDog(e.target.value);
                }}
              >
                {dog.map((b) => {
                  return <option key={b}>{b}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              loadImage(selectedDog);
              console.log(loadImage(selectedDog));
            }}
          >
            Get Images!
          </Button>
        </Col>
      </Row>
      <div className="image-box">
        {image.map((i) => {
          return <img src={i} />;
        })}
      </div>
    </Container>
  );
}

export default App;
