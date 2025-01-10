import image1 from "../../public/H1.jpg"
import image2 from "../../public/H2.jpg";
import image3 from "../../public/H3.jpg";
import image4 from "../../public/H4.jpg";
import image5 from "../../public/V1.jpg";
import image6 from "../../public/V2.jpg";
import image7 from "../../public/V3.jpg";
import image8 from "../../public/T1.jpeg";
import image9 from "../../public/T2.jpg";
import image10 from "../../public/T3.jpg";
import image11 from "../../public/T4.jpg";
import image12 from "../../public/T5.jpg";
import styles from "../modules/nosotros.module.css"
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import SmplMdl from "../components/modals/SmplMdl";
import Veterinarios from "../components/Tarjetas/Veterinarios";

function Nosotros() {
    const [abrir, setAbrir] = useState(false)

    const carouselData = [
        {
            id: 1,
            image: image1,
            phrase: "Cuidamos a tus amigos reales y fantásticos.",
        },
        {
            id: 2,
            image: image2,
            phrase: "Adopta y encuentra un nuevo compañero para tu vida.",
        },
        {
            id: 3,
            image: image3,
            phrase: "Ofrecemos servicios veterinarios de alta calidad.",
        },
        {
            id: 4,
            image: image4,
            phrase: "Ayuda a otros a dar en adopción a sus amigos especiales.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? carouselData.length - 1 : prev - 1
        );
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState({
        imagen: "",
        nombre: "",
        horario: "",
        descripcion: "",
    });

    const data = [
        {
            id: 1,
            imagen: image5,
            nombre: "Jennifer",
            horario: "9:00 AM - 1:00 PM",
            descripcion: "No hay mucho que explicar sobre nuestra más nueva Veterinaria la cual ha destacado mucho en su atención personalizada hacia nuestros clientes dejandolos siempre con ganas de máaaaaAAHHHHHHHHHHHHHH ODIOOOOOOOOOSSSSSSSSSSSSSSS QUERICCOOOOOOOOs,perdon continuando es tambien por alguna extraña razon especialista en armas de todo tipo por lo que si requieres cuidados con máscotas fantasticas esta veterinaria es ideal para ti aparte puede cambiar su apariencia a la de cualquiera, que más puedes pedir.",
        },
        {
            id: 2,
            imagen: image6,
            nombre: "Johnny",
            horario: "1:00 PM - 5:00 PM",
            descripcion: " Como profesional a tenido múltiples oficios desde Mecánico,Maestro,Plomero, Musico , Ingeniero y por alguna extraña razon a trabajo de  Astronauta hasta desempeñar su actual profesion de Veterinario pero siempre destaca por su gran y enorme trabajo dejando a todos muy satisfechos en más de un sentido,siendo que en todas sus consultas se escuchan aplausos muy fuertes por lo que sus clientes deben estar aplaudiendole, aparte de eso todos sus clintes salen con mucho sudor en la cara y con el pelo alborotado, un testigo de su trabajo es mi esposa la cual siempre agenda cita con el siendo que no tenemos mascota, OH NOOO! .",
        },
        {
            id: 3,
            imagen: image7,
            nombre: "Anne",
            horario: "5:00 PM - 8:00 PM",
            descripcion: "Que puedo decir de nuestra Veterinaria más experimentada y con más antiguedad la caul destaca por su atención especializada y personalizado por lo que si quieres que te hablen bonito esta es tu Veterinario ideal,aparte de eso sabe usar magia y cocinar pasteles que te encogen tu estatura o te hacen crecer y por alguna razon hace todo lo que le dices(Haber si esta referencia es de tu talla).",
        }
    ];

    const openModal = (item:any) => {
        setSelectedData({
            imagen: item.imagen,
            nombre: item.nombre,
            horario: item.horario,
            descripcion: item.descripcion,
        });

        // Abrimos el modal
        setAbrir(true);
    };


    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 1, name: "Arturo Reyes Sandoval", image: image8, description: "Exclente trabajo de parte de los jovenes que diseñaron esta paginá ya que me ha ayudado a adoptar mas porro... dijo perros para que me ayuden a controlar el ganad...dijo los alumnos, yo les dario un 10 y ya denles su título " },
        { id: 2, name: "Andres lopez obrador", image: image9, description: "No me canso Ganzo de probar.......y probar esta pagina.... siendo para mí.... un orgullo......recomendar esta pagina " },
        { id: 3, name: "Steve jobs", image: image10, description: "Me resucitaron con el EDO TENSEI solo para probar este pedazo de genialidad, podre estar revolcandome en mi tumba por lo que le estan haciendo a APPLE pero esta pagina me llena de orgullo y me devuelve la fe en la humanidad ya me puedo morir otra vez pero primero voy a adoptar un dragon para quemar MICROSOFT,DRACARYS VHAGAR.........DRACARYS a BILL GATES" },
        { id: 4, name: "Furro", image: image11, description: "Para mi esta pagina funciona como un tinder para furros, UWU 10/10 ya hice match con un Vaporeon" },
        { id: 5, name: "Tigre Toño", image: image12, description: "Excelente pagina para encontrar más acompañantes para mis aventuras y no solo eso si no que tanto sus diseñadores como los veterinarios ....ESTAN RIKISIMOS!! 10/10" },
    ];

    const toggleModal = (card: any) => {

        setSelectedCard(card);

    };

    const closeModal = () => {
        setAbrir(false);
        setModalVisible(false);
        setSelectedCard(null);
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true, // Activa las flechas
    };


    return (
        <div className={`${styles.cajita}`}>
            {/* Header con Carrusel */}
            <div className="w-full h-96 ">
                <div className={`${styles.carousel} flex justify-between`}>

                    {/* Botón para retroceder */}
                    <button className={`top-2/4 text-white bg-black cursor-pointer rounded-full text-xl z-10 `} onClick={prevSlide}>
                        {"<"}
                    </button>

                    {/* Imagen del carrusel */}
                    <img
                        src={carouselData[currentSlide].image}
                        alt={`Slide ${currentSlide + 1}`}
                        className={styles.carouselImage}
                    />

                    {/* Botón para avanzar */}
                    <button className={`top-2/4 text-white bg-black cursor-pointer rounded-full text-xl z-10`} onClick={nextSlide}>
                        {">"}
                    </button>
                </div>
            </div>


            {/* Sección "¿Quiénes somos?" */}
            <div className={`${styles.about}`}>
                <TypeAnimation
                    sequence={[
                        'Tlatectzin',
                        700,
                        '¿Quienes Somos?',
                        900,
                        '',
                        500,
                    ]}
                    style={{ fontSize: '4em', color: "wheat" }}
                    repeat={Infinity}
                />
                <p>
                    Somos una clínica veterinaria especializada en ofrecer servicios de
                    alta calidad para animales reales y mitológicos. Nuestros servicios
                    incluyen la adopción de mascotas, ayudar a quienes buscan dar en
                    adopción, y atención veterinaria especializada para mantener la salud
                    de tus amigos peludos y fantásticos.
                </p>
                {/* Sección de Cartas */}
                <h1>Veterinarios</h1>
                <div className={`${styles.cardContainer}`}>
                    {data.map((item) => (
                        <div className={`${styles.card}`} key={item.id}>
                            <img src={item.imagen} alt={item.nombre} className={`${styles.cardImage}`} />
                            <h3>{item.nombre}</h3>
                            <button className={`${styles.viewButton}`} onClick={() => openModal(item)}>
                                Ver Descripción
                            </button>
                        </div>
                    ))}
                </div>

                <SmplMdl open={abrir} setVisible={setAbrir}>
                    <Veterinarios
                        nombres={selectedData.nombre}
                        horario={selectedData.horario}
                        descripcion={selectedData.descripcion}
                        imagen={selectedData.imagen}
                    />
                </SmplMdl>


                <div className={`${styles.carouselContainer}`}>
                    <TypeAnimation
                        sequence={['Testimonios', 800, 'Clientes felices', 800, 'Mascotas Sanas', 800]}
                        style={{ fontSize: '4em', color: "wheat" }}
                        repeat={Infinity}
                    />
                    <Slider {...settings}>
                        {cards.map((card) => (
                            <div key={card.id}>
                                <img src={card.image} alt={card.name} className={styles.cardImage} />
                                <h3>{card.name}</h3>
                                <button className={styles.viewButton} onClick={() => toggleModal(card)}>Ver Testimonio</button>
                            </div>
                        ))}
                    </Slider>


                    {selectedCard && (
                        <div className={`${styles.modalOverlay}`} onClick={closeModal}>
                            <div className={`${styles.modal}`}>
                                {/* Botón de cierre */}
                                <button className={`${styles.closeButton}`} onClick={closeModal}>
                                    &times;
                                </button>

                                {/* Detalles del modal */}
                                <h2>{selectedCard.name}</h2>
                                <img src={selectedCard.image} alt={selectedCard.name} className={`${styles.modalImage}`} />
                                <p><strong>Testimonio:</strong> {selectedCard.description || "No disponible"}</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Nosotros