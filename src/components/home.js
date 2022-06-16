import { Carousel,Container } from 'react-bootstrap';
import pexels1 from './images/pexels1.jpg';
import pexels2 from './images/pexels2.jpg';
import pexels3 from './images/pexels3.jpg';
import './home.css';
import Cart from './carrito';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import capuccino from './images/capuccino.jpg';
import espresso from './images/espresso.jpg';
import macchiato from './images/macchiato.jpg';
import americano from './images/americano.jpg';
import mocca from './images/mocca.jpg';
import frappe from './images/frappe.jpg';


const Home = () => {
  const beneficios = [
    {titulo: "Ayuda a quemar grasas", descripcion: "Su ventaja es que es una de las pocas sustancias naturales que ayuda a quemar grasa." },
    {titulo: "Fuente de antioxidantes", descripcion: "A las vitaminas y minerales que contiene una taza de café se agrega una importante carga de antioxidantes, especialmente polifenoles y ácidos hidroxicinámicos."},
    {titulo: "Protege el corazón e hígado", descripcion: "Además de combatir enfermedades crónicas y degenerativas, el café ayuda a cuidar la salud del hígado previniendo y retardando el desarrollo de enfermedades como la cirrosis y el hígado graso."},
    {titulo: "Reduce el riesgo de desarrollar ciertos tipos de cáncer", descripcion: "Tomar café diariamente de forma moderada reduce la probabilidad de desarrollar cáncer de hígado y colorrectal, uno de los tipos más frecuentes y con mayor mortalidad entre la población."},
    {titulo: "Disminuye la probabilidad de contraer enfermedades", descripcion: "Diversos estudios han demostrado que consumir café diariamente disminuye el riesgo de desarrollar enfermedades crónicas como: Diabetes tipo 2, Alzheimer, Parkinson"}
  ];

  const cardsCoffe = [
    {name: 'Capuccino', descript: 'Por lo general gran parte de esta es espumada, y suele añadírsele de forma espolvoreada algo de cacao en polvo para darle un sabor más dulce.', img: capuccino},
    {name: 'Expresso', descript: 'Uno de los tipos de café más básicos y sencillos, únicamente consta de un infusión de café la cual se realiza hirviendo agua en contacto con el grano', img: espresso},
    {name: 'Macchiato', descript: 'Uno de los más demandados por lo general, llamamos cortado o macchiato a un tipo de café espresso a la cual se le agrega una ligera cantidad de leche, que manche o tiña el café.', img: macchiato},
    {name: 'Americano', descript: 'El café americano es un tipo de café derivado del espresso el cual se caracteriza por añadir una cantidad de agua mucho mayor de lo habitual en este tipo de preparación, teniendo como resultado un producto con un sabor menos potente y algo más aguado.', img: americano},
    {name: 'Mocca', descript: 'Se trata de una variante del café con leche en el que además de leche y café se emplea obligatoriamente chocolate o cacao en forma de sirope o polvo.', img: mocca},
    {name: 'Frappé', descript: 'Una de las pocas variantes cuya conceptualización es directamente como café frío, el frappé se elabora con café instantáneo molido, hielo y crema de leche o nata.', img: frappe}
  ]
    return (
      <>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pexels1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pexels2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pexels3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container>
          <Row className='cart'>
            <Col className="mb-2">
              <Cart/>
            </Col>
          </Row>
        </Container>
        <Container className='mt-5 mb-5'>
          <h2 className='benefits'>Tipos de café</h2>
        </Container>
        <Container className='mt-5 mb-5'>
          <Row className='coffes-variants'>
          { cardsCoffe.map((value,key) => {
            return(
            <>
            <Card className='coffe-cards' text='white' style={{ width: '26rem'}}>
              <Card.Img variant="top" src={ value.img } />
              <Card.Body>
              <Card.Title>{ value.name }</Card.Title>
                <Card.Text>
                  { value.descript }
                </Card.Text>
              </Card.Body>
            </Card>
            </>
            )})
          }
          </Row>
        </Container>
        <Container className='mt-5 mb-5'>
          <h2 className='benefits'>Beneficios del café</h2>
        </Container>
        <Container className='benefits-card'>
          <Row>
          { beneficios.map((value,key) => {
              return(
                <>
                  <div key={key}>
                    <h4>{value.titulo}</h4>
                    <p>{value.descripcion}</p>
                  </div>
                </>
              )
            })
          }
          </Row>
        </Container>
      </>
    )
}

export default Home