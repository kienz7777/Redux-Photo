import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { FastField, Form, Formik } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}
// npm i --save react-select
// npm install formik --save
// npm install -S yup

//FastField xài độc lập (ko bị re-render) ko phụ thuộc vào cái Field khác
//Field bị re-render khi các Field khác thay đổi
//Dùng Form của Formik sẽ tự động by event : reset, submit

function PhotoForm(props) {
  const { initialValues, isAddMode } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),

    categoryId: Yup.number()
      .required('This field is required.')
      .nullable(),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required.'),
      otherwise: Yup.string().notRequired(),
    })
  });

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {formikProps => {
        //do sth here...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return(
          <Form>

            <FastField
              name="title"
              component={InputField}

              label="Title"
              placeholder="Eg: Wow nature ..."
            />
      
            <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />
      
            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />
      
            <FormGroup>
              <Button type="submit" color={isAddMode ? 'primary' : 'success'}>
                {isSubmitting && <Spinner size="sm" />}
                {isAddMode ? 'Add to album' : 'Update your photo'}
              </Button>
            </FormGroup>
            
          </Form>
        )
      }}
    </Formik>



  );
}

export default PhotoForm;