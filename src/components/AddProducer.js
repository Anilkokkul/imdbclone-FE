import React from "react";
import { useProducers } from "../context/produceContext";
import { instance } from "../App";
import { actorValidation } from "../Validation/actorValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toastSuccess, errorToast } from "../services/toast";
import { useNavigate } from "react-router-dom";

function AddProducer({ setModel }) {
  const navigate = useNavigate();
  const { fetchProducer } = useProducers();
  const initialValues = {
    name: "",
    gender: "",
    dob: "",
    bio: "",
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl text-black">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <h1
              className="font-bold text-4xl sm:text-3xl xl:text-6xl
          2xl:text-5xl m-4"
            >
              {" "}
              Add a new Producer
            </h1>
            <hr className=" w-full" />
            <Formik
              initialValues={initialValues}
              validationSchema={actorValidation}
              onSubmit={(values, { resetForm }) => {
                instance
                  .post("/producer", values)
                  .then((data) => {
                    // console.log(data.data.message);
                    toastSuccess(data.data.message);
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
                setModel(false);
                resetForm();
              }}
            >
              {({ values }) => (
                <Form className=" w-full p-4">
                  <div className=" w-auto">
                    <div className="flex items-center justify-between">
                      <label htmlFor="name">Name : </label>
                      <Field
                        name="name"
                        type="text"
                        className="text-black m-2 h-10 rounded-lg p-2 min-w-[280px] "
                        placeholder="Title"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      className="text-red-700 text-center"
                      component="div"
                    />
                    <div className="flex items-center justify-between">
                      <label htmlFor="gender">Gender : </label>
                      <Field
                        name="gender"
                        type="text"
                        className="text-black m-2 w-48 h-10 rounded-lg p-2 min-w-[280px]"
                        placeholder="Gender"
                      />
                    </div>
                    <ErrorMessage
                      name="gender"
                      className="text-red-700 text-center"
                      component="div"
                    />
                    <div className="flex items-center justify-between">
                      <label htmlFor="genre">Genre : </label>
                      <Field
                        name="dob"
                        type="date"
                        className="text-black m-2 w-2/3 h-10 rounded-lg p-2 min-w-[280px]"
                        placeholder="Genre"
                      />
                    </div>
                    <ErrorMessage
                      name="dob"
                      className="text-red-700 text-center"
                      component="div"
                    />
                    <div className="flex items-center justify-between">
                      <label htmlFor="plot">Bio : </label>
                      <Field
                        name="bio"
                        type="text"
                        className="text-black m-2 w-2/3 h-10 rounded-lg p-2 min-w-[280px]"
                        placeholder="Write a Bio"
                      />
                    </div>
                    <ErrorMessage
                      name="bio"
                      className="text-red-700 text-center"
                      component="div"
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModel(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Add Producer
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default AddProducer;
