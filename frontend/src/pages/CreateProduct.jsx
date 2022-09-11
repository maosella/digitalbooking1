import React, { useEffect } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';
import { backendUrl, helpHttp } from '../helpers/helpHttp';
import { useState } from 'react';
import Topbar from '../utils/Topbar';
import SyncLoader from 'react-spinners/SyncLoader';
import NewIcon from '../components/createProduct/NewIcon';
import Policies from '../components/createProduct/Policies';
import PropertyInfo from '../components/createProduct/PropertyInfo';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  let api = helpHttp();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [images, setImages] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [fileName, setFileName] = useState(
    'No se ha seleccionado ninguna imagen'
  );
  const [policies, setPolicies] = useState(null);
  const [characteristics, setCharacteristics] = useState(null);
  const [productError, setProductError] = useState(false);

  const handleChangeImages = (e) => {
    const newFiles = e.target.files;
    setImages(newFiles);
    if (newFiles.length === 1) {
      setFileName(newFiles[0].name);
    } else {
      setFileName(`${newFiles[0].name} y ${newFiles.length - 1} más`);
    }
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleChangeSelect = (e, name) => {
    const { value } = e;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleCheckboxes = (e) => {
    const { name, id, checked } = e.target;
    if (name === 'policies') {
      setFormValues({
        ...formValues,
        ['policies']: formValues.policies.map((pol) =>
          +pol.policy !== +id ? pol : { policy: pol.policy, allowed: checked }
        ),
      });
    }
    if (name === 'characteristics') {
      if (checked) {
        setFormValues({
          ...formValues,
          [name]: [...(formValues?.[name] || []), +id],
        });
      }
      if (!checked) {
        setFormValues({
          ...formValues,
          [name]: formValues?.[name]?.filter((i) => i !== +id),
        });
      }
    }
  };
  const formData = new FormData();
  const handleSubmit = async (e) => {
    setIsSubmitLoading(true);
    e.preventDefault();
    const fileToUpload = Array.from(images);
    for (let i = 0; i < fileToUpload.length; i++) {
      formData.append(
        'images',
        fileToUpload[i],
        fileToUpload[i].name.split(' ').join('-')
      );
    }
    const product = {
      title: formValues.title,
      description: formValues.description,
      address: formValues.address,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
      category_id: formValues.category_id,
      city_id: formValues.city_id,
      characteristics: formValues.characteristics,
      policies: formValues.policies,
      checkOut: formValues.checkOut,
      cancellation: formValues.cancellation,
    };
    const productJson = JSON.stringify(product);
    const productBlob = new Blob([productJson], {
      type: 'application/json',
    });
    formData.append('product', productBlob);

    const response = await fetch(`${backendUrl}/products`, {
      method: 'POST',
      body: formData,
    });
    response.json();
    if (!response.ok) {
      setProductError(true);
      window.scrollTo(0, 0);
    }
    setIsSubmitLoading(false);
    navigate('/productsuccess');
  };

  let allPolicies;
  const getPolicies = async () => {
    const response = await api.get(`${backendUrl}/policies`);
    allPolicies = await response.json();
    setPolicies(allPolicies);
    const formatPolicies = allPolicies.map((pol) => ({
      policy: pol.id,
      allowed: false,
    }));
    setFormValues({
      ...formValues,
      ['policies']: formatPolicies,
    });
  };

  const getCharacteristics = async () => {
    const response = await api.get(`${backendUrl}/characteristics`);
    setCharacteristics(await response.json());
  };
  useEffect(() => {
    getPolicies();
    getCharacteristics();
  }, []);

  return (
    <div className='bg-white text-secondary font-medium pb-10 text-lg'>
      <Topbar title='Administración' />
      <div className='bg-neutral pt-10 pb-20'>
        <div className='container mx-auto px-3 '>
          {productError && (
            <div className='bg-red-300/60 w-fit mx-auto text-red-900 text-bold flex-center gap-3 px-6 py-4 rounded-lg mb-4'>
              <BiErrorCircle className='text-5xl' />
              <div>
                <p>Lamentablemente no se ha podido crear el producto.</p>
                <p>Por favor intente más tarde.</p>
              </div>
            </div>
          )}
          <h2 className='text-secondary text-3xl font-bold pb-10'>
            Crear propiedad
          </h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className='bg-white rounded-lg shadow-lg p-5'
          >
            <PropertyInfo
              formValues={formValues}
              handleChangeSelect={handleChangeSelect}
              handleChangeInputs={handleChangeInputs}
              setFormValues={setFormValues}
            />
            <div className='flex flex-col w-full'>
              <h2 className='px-2.5 font-bold text-xl mt-10 '>
                Agregar atributos
              </h2>
              <div className='p-2.5'>
                <div className='bg-neutral shadow-md rounded-md px-3 pt-3 pb-7 '>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg mx-3 p-4 mt-4 h-24 overflow-y-scroll'>
                    {characteristics?.map((char) => {
                      return (
                        <div key={char.id}>
                          <input
                            type='checkbox'
                            name='characteristics'
                            id={char.id}
                            className='accent-primary'
                            onChange={handleCheckboxes}
                          />
                          <label
                            htmlFor={char.id}
                            className='cursor-pointer ml-2'
                          >
                            <i
                              className={`text-primary px-1 fas ${char.icon_url}`}
                            />
                            &nbsp;{char.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <NewIcon getCharacteristics={getCharacteristics} />
                </div>
              </div>
            </div>

            <Policies
              policies={policies}
              handleCheckboxes={handleCheckboxes}
              formValues={formValues}
              handleChangeInputs={handleChangeInputs}
              handleChangeSelect={handleChangeSelect}
            />
            <div className='flex flex-col w-full'>
              <h2 className='px-2.5 font-bold text-xl mt-10'>
                Cargar imágenes
              </h2>
              <div className='p-2.5'>
                <div className='flex bg-neutral shadow-md rounded-md h-36 p-3'>
                  <div className='w-full px-2.5 self-center'>
                    <div className='flex gap-5 relative'>
                      <div className='px-5 w-full h-16 bg-white rounded-lg'>
                        <p
                          className={`resize-none w-full h-16 pt-4 outline-none relative pointer-events-none hidden md:block ${
                            !images && 'text-[#a9a9a9]'
                          }`}
                        >
                          {fileName}
                        </p>
                      </div>
                      <input
                        type='file'
                        className='opacity-0 absolute z-10 -left-[15%] w-[115%] h-16 cursor-pointer'
                        id='dropzone-file'
                        onChange={handleChangeImages}
                        multiple
                        accept='image/*'
                        required
                      />
                      <div className='flex-center'>
                        <BsPlusSquareFill className='bg-white rounded-md text-6xl text-primary' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center py-10'>
              <button
                className='btn-primary bg-primary w-96 disabled:bg-neutral'
                type='submit'
                disabled={isSubmitLoading}
              >
                {isSubmitLoading ? (
                  <SyncLoader color={'#ffffff'} size={10} />
                ) : (
                  'Crear'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
