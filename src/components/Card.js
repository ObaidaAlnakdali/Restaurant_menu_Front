import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import './style.css';

import { Context } from '../context/Context';

function Card({ type, ...props }) {
  const { category, setCategory, setItems } = useContext(Context)
  const [title, setTitle] = useState(props.title)
  const [price, setPrice] = useState(props?.price)
  const [description, setDescription] = useState(props?.description)
  const [image, setImage] = useState(`http://localhost:8000/images/${props.image}`)
  const [active, setActive] = useState(props?.active)
  const [categorySelect, setCategorySelect] = useState(props?.category?._id)
  const [file, setFile] = useState("")

  const handelChangeImage = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("uploaded_file", e.target.files[0]);
    axios.post(`http://localhost:8000/api/UploadImage`, formData)
      .then(res => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(res.data?.filename);
          const body = { image: res.data?.filename, icon: res.data?.filename }
          axios.put(`http://localhost:8000/api/${type}/${props.id}`, body)
            .then(res => {
              console.log("update")
            })
            .catch((error) => {
              console.log(error)
            })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChange = (event) => {
    setCategorySelect(event.target.value);
  };

  const handleOnChange = () => {
    setActive(!active);
  };

  const deleteCard = () => {
      axios.delete(`http://localhost:8000/api/${type}/${props.id}`)
        .then(res => {
          if (type === "item") {
            setItems((current) => current.filter((item) => item._id !== props.id));
           } else {
            setCategory((current) => current.filter((category) => category._id !== props.id));
           }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const updateCard = () => {
    if (type === "item") {
      const body = {
        title: title,
        description: description,
        price: price,
        category: categorySelect,
        active: active
      }
      axios.put(`http://localhost:8000/api/item/${props.id}`, body)
        .then(res => {
          console.log("update")
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      const body = { title: title }
      axios.put(`http://localhost:8000/api/category/${props.id}`, body)
        .then(res => {
          console.log("update")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      {
        type === "category" ?
          (
            <div className="card card-category">
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#ff661d",
                  position: "absolute",
                  top: "5px",
                  right: "5px"
                }}
                onClick={() => deleteCard()}
              >
                <CloseSharpIcon />
              </IconButton>

              <Box sx={{ position: "relative", margin: "30px 0 10px" }}>
                <img src={image} />
                <IconButton
                  aria-label="delete"
                  variant="contained"
                  component="label"
                  sx={{
                    color: "#ff661d",
                    position: "absolute",
                    bottom: "0px",
                    right: "25px"
                  }} >
                  <BorderColorSharpIcon fontSize="small" />
                  <input
                    type="file"
                    onChange={handelChangeImage}
                    accept="image/*"
                    hidden
                  />
                </IconButton>
              </Box>

              <TextField
                variant="outlined"
                size="small"
                color="warning"
                required
                inputProps={{ style: { width: '100px', fontSize: 12, height: "15px" } }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={null}
                placeholder='Title'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff661d',
                    }
                  },
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}

              />
              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{
                  backgroundColor: "#ff661d",
                  margin: "8px",
                  fontSize: "12px",
                  padding: "5px 40px"
                }}
                onClick={() => updateCard()}
              >
                Update
              </Button>
            </div>
          )
          :
          (
            <div className="card card-item">
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#ff661d",
                  position: "absolute",
                  top: "5px",
                  right: "5px"
                }}
                onClick={() => deleteCard()}
              >
                <CloseSharpIcon />
              </IconButton>

              <Box sx={{ position: "relative", margin: "30px 0 10px", height: "130px" }}>
                <img src={image} />
                <IconButton
                  aria-label="delete"
                  variant="contained"
                  component="label"
                  sx={{
                    color: "#ff661d",
                    position: "absolute",
                    bottom: "5px",
                    right: "10px"
                  }} >
                  <BorderColorSharpIcon fontSize="small" />
                  <input
                    type="file"
                    onChange={handelChangeImage}
                    accept="image/*"
                    hidden
                  />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  color="warning"
                  required
                  inputProps={{ style: { fontSize: 12, height: "15px" } }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label={null}
                  placeholder='Title'
                  sx={{
                    margin: "5px 0",
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff661d',
                      }
                    },
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  color="warning"
                  required
                  inputProps={{ style: { fontSize: 12, height: "15px" } }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  label={null}
                  placeholder='Price'
                  sx={{
                    margin: "5px 0",
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff661d',
                      }
                    },
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label={null}
                  size="small"
                  color="warning"
                  inputProps={{ style: { fontSize: 12, height: "15px" } }}
                  value={categorySelect}
                  onChange={handleChange}
                  helperText="Please select your category"
                  sx={{
                    margin: "5px 0",
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff661d',
                      }
                    },
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 }
                  }}
                >
                  {category.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  //label="Title"
                  variant="outlined"
                  size="small"
                  color="warning"
                  required
                  inputProps={{ style: { fontSize: 12 } }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label={null}
                  placeholder='Description'
                  multiline
                  rows={5}
                  sx={{
                    margin: "5px 0",
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff661d',
                      }
                    },
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                />
              </Box>
              <Box>
                <span className="item-active-span">Active</span>
                <Checkbox
                  size="small"
                  checked={active}
                  onChange={handleOnChange}
                  sx={{
                    color: "#c17e5e",
                    '&.Mui-checked': {
                      color: "#ff661d",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  sx={{
                    backgroundColor: "#ff661d",
                    margin: "8px",
                    fontSize: "12px",
                    padding: "5px 25px"
                  }}
                  onClick={() => updateCard()}
                >
                  Update
                </Button>
              </Box>
            </div>
          )
      }

    </>
  );
}

export default Card;