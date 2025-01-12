import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  // Mueve estas líneas al principio

import image1 from "../../public/H1.jpg";
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
import styles from "../modules/nosotros.module.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import Slider from "react-slick";
import SmplMdl from "../components/modals/SmplMdl";
import Veterinarios from "../components/Tarjetas/Veterinarios";

interface Card {
    id: number;
    name: string;
    image: string;
    description: string;
}

function Nosotros() {
    const [abrir, setAbrir] = useState(false);

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
            descripcion: "Descripción de Jennifer...",
        },
        {
            id: 2,
            imagen: image6,
            nombre: "Johnny",
            horario: "1:00 PM - 5:00 PM",
            descripcion: "Descripción de Johnny...",
        },
        {
            id: 3,
            imagen: image7,
            nombre: "Anne",
            horario: "5:00 PM - 8:00 PM",
            descripcion: "Descripción de Anne...",
        },
    ];

    const openModal = (item: any) => {
        setSelectedData({
            imagen: item.imagen,
            nombre: item.nombre,
            horario: item.horario,
            descripcion: item.descripcion,
        });
        setAbrir(true); // Abre el modal
    };

    const [selectedCard, setSelectedCard] = useState<Card | null>(null); // Usa el tipo Card aquí

    const cards: Card[] = [
        { id: 1, name: "Arturo Reyes Sandoval", image: image8, description: "Testimonio..." },
        { id: 2, name: "Andres Lopez Obrador", image: image9, description: "Testimonio..." },
        { id: 3, name: "Steve Jobs", image: image10, description: "Testimonio..." },
        { id: 4, name: "Furro", image: image11, description: "Testimonio..." },
        { id: 5, name: "Tigre Toño", image: image12, description: "Testimonio..." },
    ];

    const toggleModal = (card: Card) => {
        setSelectedCard(card);
    };

    const closeModal = () => {
        setAbrir(false); // Cierra el modal
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
            <div className="w-full h-96">
                <div className={`${styles.carousel} flex justify-between`}>
                    {/* Botón para retroceder */}
                    <button className={`top-2/4 text-white bg-black cursor-pointer rounded-full text-xl z-10`} onClick={prevSlide}>
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
                    sequence={['Tlatectzin', 700, '¿Quienes Somos?', 900, '', 500]}
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
    );
}

export default Nosotros;
