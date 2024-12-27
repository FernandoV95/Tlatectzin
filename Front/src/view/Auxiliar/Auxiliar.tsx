import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "../../modules/Auxiliar.module.css"

const Auxiliar = () => {

  const vacunas = [
    "Rabia",
    "Moquillo",
    "Garrapatas",
    "Parasitos",
    "Pulgas",
    "Diarreas",
    "Neumonías neonatales",
    "Otras"
  ];

  const [formData, setFormData] = useState({
    alias: "",
    tipo: "Perro",
    descripcionCorta: "",
    descripcionLarga: "",
    imagen: null,
    imagenPreview: null,
    vacunasSeleccionadas: [],
    otrasVacunas: [""],
  });

  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagen: file, imagenPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const vacunasSeleccionadas = checked
        ? [...prev.vacunasSeleccionadas, value]
        : prev.vacunasSeleccionadas.filter((vacuna) => vacuna !== value);
      return { ...prev, vacunasSeleccionadas };
    });
  };
  const handleOtraVacunaChange = (index, value) => {
    const nuevasVacunas = [...formData.otrasVacunas];
    nuevasVacunas[index] = value;
    setFormData({ ...formData, otrasVacunas: nuevasVacunas });
  };

  const agregarOtraVacuna = () => {
    setFormData({ ...formData, otrasVacunas: [...formData.otrasVacunas, ""] });
  };

  return (
    <div className={`${styles.cajita}`}>

      <div className="grid grid-cols-2 ">
        {/*Formulario */}

        <div className={`${styles.formSection} w-11/12  m-auto`}>
          <h2>Agregar nueva mascota</h2>

          <form onSubmit={handleSubmit} noValidate>

            <div className=" grid grid-cols-2 justify-center items-center ">
              <div className="mb-1 w-11/12 m-auto">
                <label className="w-full text-center">Alias</label>
                <input placeholder="Nombre de la mascota" className="border-2 border-cyan-500 rounded-lg p-2 text-lg"
                  type="text" value={formData.alias} onChange={handleInputChange} />
              </div>

              <div className="mb-1 w-11/12 m-auto">
                <label className="w-full text-center">Tipo</label>
                <select className="border-2 border-cyan-500 rounded-lg p-2 text-lg"
                  value={formData.tipo} onChange={handleInputChange} >
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Roedor</option>
                  <option>Pez</option>
                  <option>Aves</option>
                  <option>Reptiles</option>
                  <option>Ganado</option>
                  <option>Equinos</option>
                  <option>Porcino</option>
                  <option>Pokemones</option>
                  <option>Animal Fantastico</option>
                </select>
              </div>
            </div>


            {/* Checkboxes de Vacunas */}
            <div className=" mt-1 mb-1 w-11/12 m-auto p-2 border-2 border-cyan-500 rounded-lg">
              <label className="w-full text-center">Vacunas</label>


              <div className="grid grid-cols-2 gap-2">
                {vacunas.map((vacuna, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="checkbox" className="size-4" value={vacuna} onChange={handleCheckboxChange} />
                    <label>{vacuna}</label>
                  </div>
                ))}
              </div>


              {/* Campo para "Otras" */}
              {formData.vacunasSeleccionadas.includes("Otras") && (
                <div className={styles.otrasVacunasGroup}>
                  <label htmlFor="otrasVacunas">Especificar otra vacuna:</label>
                  {formData.otrasVacunas.map((vacuna, index) => (
                    <div key={index} className={styles.inputWrapper}>
                      <input
                        id={`otra-vacuna-${index}`} // Agregar un id único
                        type="text"
                        value={vacuna}
                        onChange={(e) => handleOtraVacunaChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                  <button className={`${styles.subm}`} type="button"
                    onClick={agregarOtraVacuna} >
                    Agregar otra vacuna
                  </button>
                </div>
              )}
            </div>

            <div className="mb-1 w-11/12 m-auto" >
              <label className="w-full text-center">Descripción Corta:</label>
              <input
                placeholder="Danos una descripcion breve"
                className="border-2 border-cyan-500 rounded-lg p-2 text-lg"
                type="text"
                name="descripcionCorta"
                value={formData.descripcionCorta}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-1 w-11/12 m-auto">
              <label className="w-full text-center">Descripción Larga:</label>
              <textarea
                className="border-2 border-cyan-500 rounded-lg p-2 text-lg"
                placeholder="Danos una descripion mas precisa"
                name="descripcionLarga"
                rows={3}
                value={formData.descripcionLarga}
                onChange={handleInputChange}
              />
            </div>

            <div className=" text-center">
              <input type="submit" value="Enviar" className={` w-1/2 text-2xl text-black font-bold`} />
            </div>

          </form>
        </div>

        {/*Vista previa*/}
        <div>
          <div className={`${styles.formSection} w-11/12  m-auto`}>
            <h2>Vista Previa</h2>
            <div className={`${styles.card}`}>
              {formData.imagenPreview ? (
                <img
                  src={formData.imagenPreview}
                  alt="Vista previa"
                  className={`${styles.cardImage}`}
                />
              ) : (
                <div className={`${styles.placeholder}`} >No hay imagen seleccionada</div>
              )}
              <h3>{formData.alias || "Nombre de la Mascota"}</h3>
              <p><strong>Tipo:</strong> {formData.tipo}</p>
              <p><strong>Descripción Corta:</strong> {formData.descripcionCorta || "Sin descripción"}</p>

              <button onClick={toggleModal} className={`${styles.viewButton}  text-black`}>
                Ver Mascota
              </button>
            </div>
          </div>
        </div>
      </div>





    </div>
  );
}
export default Auxiliar;

