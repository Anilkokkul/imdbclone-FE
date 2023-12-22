import React, { useState } from "react";
import { movieValidation } from "../Validation/movieValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { instance } from "../App";
import { toastSuccess, errorToast } from "../services/toast";
import ActorsDropdown from "./ActorsDropdown";
import ProducersDropdown from "./ProducersDropdown";
import Addactor from "./Addactor";
import AddProducer from "./AddProducer";

function AddMovie() {
  const [actorsID, setActorsID] = useState([]);
  const [producerId, setProducerId] = useState("");
  const [actorModel, setActorModel] = useState(false);
  const [producerModel, setProducerModel] = useState(false);
  const initialValues = {
    title: "",
    yearOfRelease: "",
    genre: "",
    plot: "",
    actors: [],
    producer: "",
  };
  return (
    <div className=" p-6 flex items-center justify-start flex-col w-4/5 mx-auto">
      <h1 className="text-3xl text-center mb-3">Add a Movie</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={movieValidation}
        onSubmit={(values, { resetForm }) => {
          console.log("values::", producerId);
          const aIds = actorsID.map((i) => i.value);
          instance
            .post("/movie", {
              ...values,
              actors: aIds,
              producer: producerId.value,
            })
            .then((data) => {
              console.log(data);
              toastSuccess(data.data.message);
            })
            .catch((data) => {
              console.log(data);
              errorToast(data.response.data.message);
            });
          setActorsID([]);
          setProducerId({});
          resetForm();
        }}
      >
        {() => (
          <Form className=" w-full">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="title">Title : </label>
                <Field
                  name="title"
                  type="text"
                  className="text-black m-2 w-2/3 h-10 rounded-lg p-2"
                  placeholder="Title"
                />
              </div>
              <ErrorMessage
                name="title"
                className="text-red-700 text-center"
                component="div"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="yearOfRelease">Year of Release : </label>
                <Field
                  name="yearOfRelease"
                  type="number"
                  min="1900"
                  max="2099"
                  className="text-black m-2 w-2/3 h-10 rounded-lg p-2"
                  placeholder="Year Of Release"
                />
              </div>
              <ErrorMessage
                name="yearOfRelease"
                className="text-red-700 text-center"
                component="div"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="genre">Genre : </label>
                <Field
                  name="genre"
                  type="text"
                  className="text-black m-2 w-2/3 h-10 rounded-lg p-2"
                  placeholder="Genre"
                />
              </div>
              <ErrorMessage
                name="genre"
                className="text-red-700 text-center"
                component="div"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="plot">Plot : </label>
                <Field
                  name="plot"
                  type="text"
                  className="text-black m-2 w-2/3 h-10 rounded-lg p-2"
                  placeholder="Plot"
                />
              </div>
              <ErrorMessage
                name="plot"
                className="text-red-700 text-center"
                component="div"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="actors">Actors : </label>
                <div className=" m-2 flex justify-between items-center w-2/3">
                  <ActorsDropdown
                    name="actors"
                    actors={actorsID}
                    onChange={(selectedOption) => {
                      setActorsID(selectedOption);
                    }}
                  />
                  <div
                    onClick={() => setActorModel(!actorModel)}
                    className=" cursor-pointer bg-yellow-400 text-center text-black font-bold mx-2 p-1 px-2 w-1/3 h-10 leading-8  rounded-md"
                  >
                    Add Actor
                  </div>
                </div>
              </div>
              <ErrorMessage
                name="actors"
                className="text-red-700 text-center"
                component="div"
              />
              <div className="flex items-center justify-between">
                <label htmlFor="producer">producer : </label>
                <div className=" m-2 flex justify-between items-center w-2/3">
                  <ProducersDropdown
                    name="producer"
                    producer={producerId}
                    onChange={(selectedOption) => {
                      setProducerId(selectedOption);
                      console.log(selectedOption);
                    }}
                  />
                  <div
                    className=" cursor-pointer text-center bg-yellow-400 text-black font-bold mx-2 p-1 px-2 w-1/3 h-10 leading-8  rounded-md"
                    onClick={() => setProducerModel(!actorModel)}
                  >
                    Add Producer
                  </div>
                </div>
              </div>
              <ErrorMessage
                name="producer"
                className="text-red-700 text-center"
                component="div"
              />
            </div>
            <button
              type="submit"
              className=" bg-yellow-400 p-7 font-bold my-3 py-1 relative left-1/2 rounded-lg text-black "
            >
              Add Movie
            </button>
          </Form>
        )}
      </Formik>
      {actorModel && <Addactor setModel={setActorModel} />}
      {producerModel && <AddProducer setModel={setProducerModel} />}
    </div>
  );
}

export default AddMovie;
