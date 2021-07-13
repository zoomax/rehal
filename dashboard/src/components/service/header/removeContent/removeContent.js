import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceSchema } from "../../../../utils/validators/auth";
import deleteImg from "../../../../assets/images/delete.svg";
import loader from "../../../../assets/images/loader.gif";
import { deleteRequest, getRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, SERVICES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { toast } from "react-toastify";
export const Container = ({ storeServices }) => {
  const user = getObjFromLocalStorage("user");
  const [services, setServices] = useState(storeServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ServiceSchema),
  });
  // get services
  useEffect(() => {
    if (storeServices.length === 0) {
      getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
        const data = res.data;
        console.log(data);
        setServices(data);
      });
    }
  }, [storeServices.length]);
  // show errors
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  }, [errors]);

  const onSubmit = (data) => {
    console.log(data);
    const { name } = data;
    setIsSubmitting(true);
    deleteRequest(`${BASE_URL}${SERVICES}delete/${name}`, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        reset();
        toast.success("Service has been deleted successfully ");
      })
      .catch((e) => {
        setIsSubmitting(false);
        // failure
        toast.error(e.response.data);
      });
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-md-9 col-9'>
            <div className='col-m-12 row'>
              <div className='col-lg-4 col-md-4 col-6'>
                <select
                  type='text'
                  name='city '
                  placeholder='select Service'
                  {...register("name")}>
                  <option value=''>Select Service....</option>
                  {services.map((service, index) => {
                    return (
                      <option value={service.id} key={index}>
                        {service.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-3'>
            <button className='none' type='submit'>
              <img src={isSubmitting ? loader : deleteImg} alt='img' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ services }) => {
  return {
    storeServices: services,
  };
};
export const RemoveContent = connect(mapStateToProps)(Container);
