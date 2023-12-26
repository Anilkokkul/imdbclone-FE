import React, { useEffect, useState } from "react";
import { movieValidation } from "../Validation/movieValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { instance } from "../App";
import { toastSuccess, errorToast } from "../services/toast";
import ActorsDropdown from "./ActorsDropdown";
import ProducersDropdown from "./ProducersDropdown";
import Addactor from "./Addactor";
import AddProducer from "./AddProducer";
import { useMovies } from "../context/allMoviesContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useActors } from "../context/actorContext";
import { useProducers } from "../context/produceContext";

function EditMovie() {
  const { fetchActor } = useActors();
  const { fetchProducer } = useProducers();
  const [movieData, setMovieData] = useState({});
  const { moviesData, fetchMovies } = useMovies();
  const [actorsID, setActorsID] = useState([]);
  const [producerId, setProducerId] = useState("");
  const [actorModel, setActorModel] = useState(false);
  const [producerModel, setProducerModel] = useState(false);
  console.log(movieData);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const editMovie = moviesData.find((movie) => movie._id === id);
      const actorEdit = editMovie?.actors.map((actor) => ({
        label: actor.name,
        value: actor._id,
      }));
      const producerEdit = {
        label: editMovie?.producer.name,
        value: editMovie?.producer._id,
      };
      console.log(producerEdit);
      setMovieData(editMovie || {});
      setActorsID(actorEdit || []);
      setProducerId(producerEdit || "");
    }, 3000);
  }, [moviesData, id]);

  const initialValues = {
    title: movieData.title || "",
    yearOfRelease: movieData.yearOfRelease || "",
    genre: movieData.genre || "",
    plot: movieData.plot || "",
    actors: [],
    producer: producerId || "",
  };
  return (
    <div>
      <div className=" p-6 flex items-center justify-start flex-col w-4/5 mx-auto">
        <h1 className="text-3xl text-center mb-3">Add a Movie</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={movieValidation}
          onSubmit={(values, { resetForm }) => {
            console.log("values::", producerId);
            const aIds = actorsID.map((i) => i.value);
            instance
              .put(`/movie/${id}`, {
                ...values,
                actors: aIds,
                producer: producerId.value,
              })
              .then((data) => {
                console.log(data);
                toastSuccess(data.data.message);
                navigate("/");
                fetchMovies();
                fetchActor();
                fetchProducer();
              })
              .catch((data) => {
                const message = data.response.data.message;
                if (!message === "Failed to authenticate") {
                  errorToast(message);
                }
                errorToast("You are not logged in Please login...");
                navigate("/login");
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
                Update Details
              </button>
            </Form>
          )}
        </Formik>
        {actorModel && <Addactor setModel={setActorModel} />}
        {producerModel && <AddProducer setModel={setProducerModel} />}
      </div>
    </div>
  );
}

export default EditMovie;
