const formData = async (data) => {
  let formData = new FormData();
  Object.keys(data).forEach((fieldName) => {
    if (!data[fieldName]) {
      return;
    } else {
      formData.append(fieldName, data[fieldName]);
    }
  });

  return formData;
};

export default formData;
